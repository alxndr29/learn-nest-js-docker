module.exports = {
  apps: [
    {
      name: "nest-api-evan",
      script: "dist/src/main.js",
      instances: 1,
      exec_mode: "fork",
      max_memory_restart: "100M",
      env: {
        NODE_ENV: "production",
        PORT: 3111
      }
    }
  ]
};
