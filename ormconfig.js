module.exports = {
  name: 'default',
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: false,
  logging: false,
  keepConnectionAlive: true,
  entities: ['build/**/*.entity.js'],
  migrations: ['build/migration/**/*.js'],
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'src/migration',
  },
};
