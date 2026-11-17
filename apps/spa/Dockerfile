FROM oven/bun:1.4.0 AS build
WORKDIR /repo

COPY package.json bun.lock ./
COPY apps/spa/package.json apps/spa/
COPY apps/start/package.json apps/start/
RUN bun install --frozen-lockfile --filter spa

COPY apps/spa apps/spa
RUN cd apps/spa && bun run build

FROM alpine:3.22 AS carry
RUN apk add --no-cache curl jq
WORKDIR /dist
COPY --from=build /repo/apps/spa/dist ./

ARG RAILWAY_PUBLIC_DOMAIN
ARG ASSETS_ORIGIN
ARG ASSET_RETENTION_DAYS=30
RUN set -eu; \
    origin="${ASSETS_ORIGIN:-${RAILWAY_PUBLIC_DOMAIN:+https://$RAILWAY_PUBLIC_DOMAIN}}"; \
    now=$(jq -nr 'now | todate'); \
    cutoff=$(jq -nr --argjson d "${ASSET_RETENTION_DAYS:-30}" 'now - $d * 86400 | todate'); \
    ls assets | sed 's|^|assets/|' > /tmp/current.txt; \
    echo '{}' > /tmp/previous.json; \
    : > /tmp/carry.txt; \
    : > /tmp/carried.txt; \
    if [ -z "$origin" ]; then \
      echo "[carry-assets] no ASSETS_ORIGIN or RAILWAY_PUBLIC_DOMAIN, skipping download"; \
    elif curl -fsS --max-time 10 -o /tmp/prev.json -w '%{content_type}' "$origin/assets-manifest.json" | grep -q json; then \
      jq '.files // {}' /tmp/prev.json > /tmp/previous.json; \
    else \
      echo "[carry-assets] no previous manifest at $origin"; \
    fi; \
    jq -r --rawfile cur /tmp/current.txt --arg cutoff "$cutoff" \
      '($cur | split("\n")) as $c | to_entries[] | select((.key | test("^assets/[\\w.-]+$")) and (.key | IN($c[]) | not) and .value > $cutoff) | .key' \
      /tmp/previous.json > /tmp/carry.txt; \
    while read -r f; do \
      ct=$(curl -fsS --max-time 10 -o "$f.tmp" -w '%{content_type}' "$origin/$f") || { rm -f "$f.tmp"; continue; }; \
      case "$ct" in text/html*) rm -f "$f.tmp"; continue ;; esac; \
      mv "$f.tmp" "$f"; \
      echo "$f" >> /tmp/carried.txt; \
    done < /tmp/carry.txt; \
    jq -n --arg now "$now" --slurpfile prev /tmp/previous.json --rawfile cur /tmp/current.txt --rawfile car /tmp/carried.txt \
      '{files: ([$cur | split("\n")[] | select(. != "") | {key: ., value: $now}] + [$car | split("\n")[] | select(. != "") | {key: ., value: $prev[0][.]}] | from_entries)}' \
      > assets-manifest.json; \
    echo "[carry-assets] $(wc -l < /tmp/current.txt) current, $(wc -l < /tmp/carried.txt)/$(wc -l < /tmp/carry.txt) carried from previous deploys"

FROM nginx:1.28-alpine
ENV PORT=8080
COPY apps/spa/nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=carry /dist /usr/share/nginx/html
