```JavaScript
/* Only create migrations */
// const { CustomNamingStrategy } = require('./src/db/customNamingStrategy');

module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123',
  database: 'books',
  synchronize: true,
  logging: false,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  // namingStrategy: new CustomNamingStrategy(),
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};
```
