module.exports = {
  apps: [
    {
      name: "api-gateway",
      script: "dist/apps/api-gateway/src/main.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    },
    {
      name: "api-gateway-2",
      script: "dist/apps/api-gateway/src/main.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3010
      }
    },
    {
      name: "iam",
      script: "dist/apps/iam/src/main.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production'
      }
    },
    {
      name: "personas",
      script: "dist/apps/personas/src/main.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production'
      }
    },
    {
      name: "crops",
      script: "dist/apps/crops/src/main.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
