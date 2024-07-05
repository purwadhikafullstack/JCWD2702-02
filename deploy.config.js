module.exports = {
  apps: [
    {
      name: 'jcwd270202.purwadhikabootcamp.com',
      script: 'npm',
      args: 'run serve',
      env: {
        PORT: 2723,
        NODE_ENV: 'production',
      },
      cwd: '/var/www/html/jcwd270202.purwadhikabootcamp.com/apps/web',
    },
    {
      name: 'jcwd270202api.purwadhikabootcamp.com',
      script: 'npm',
      args: 'run serve',
      env: {
        PORT: 2724,
        NODE_ENV: 'production',
      },
      cwd: '/var/www/html/jcwd270202.purwadhikabootcamp.com/apps/api',
    },
  ],
};
