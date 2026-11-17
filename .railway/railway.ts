import { defineRailway, github, project, service } from 'railway/iac'

const repo = 'MariuzM/app-file-chunks'

export default defineRailway(() => {
  const spa = service('spa', {
    source: github(repo, { branch: 'main' }),
    build: 'cd apps/spa && bun run build',
    start: 'cd apps/spa && bun run start',
    healthcheck: '/',
  })

  const start = service('start', {
    source: github(repo, { branch: 'main' }),
    build: 'cd apps/start && bun run build',
    start: 'cd apps/start && bun run start',
    healthcheck: '/',
  })

  return project('app-file-chunks', {
    resources: [spa, start],
  })
})
