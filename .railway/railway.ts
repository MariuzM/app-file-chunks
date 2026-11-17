import { defineRailway, github, project, service } from 'railway/iac'

const repo = 'MariuzM/app-file-chunks'

export default defineRailway(() => {
  const spa = service('spa', {
    source: github(repo, { branch: 'main', checkSuites: true }),
    build: {
      builder: 'DOCKERFILE',
      dockerfilePath: 'apps/spa/Dockerfile',
      watchPatterns: ['/apps/spa/**', '/bun.lock', '/package.json', '/.dockerignore'],
    },
    healthcheck: '/',
    variables: { PORT: '8080', NO_CACHE: '1' },
  })

  const start = service('start', {
    source: github(repo, { branch: 'main', checkSuites: true }),
    build: {
      buildCommand: 'cd apps/start && bun run build',
      watchPatterns: ['/apps/start/**', '/bun.lock', '/package.json'],
    },
    start: 'cd apps/start && bun run start',
    healthcheck: '/',
    variables: { PORT: '8080' },
  })

  return project('app-file-chunks', {
    resources: [spa, start],
  })
})
