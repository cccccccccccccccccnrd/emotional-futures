module.exports = {
  apps: [
    {
      name: 'emotional-futures',
      port: '3000',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}