### About

The server part of the Books application, which should use the Google Books API to search and cache books for the user. 
The user can register, log in, receive a jwt token.


### Installation

```bash
npm i
```

### Running

Create your database (docker, local or remote)

Create a file in the ormconfig root directory.js with your settings, read more in [Documentation TypeOrm](https://typeorm.io/):

```JavaScript
// ormconfig.js
/* Only create migrations */
// const { CustomNamingStrategy } = require('./src/db/customNamingStrategy');

module.exports = {
  type: '',
  host: '',
  port: ,
  username: '',
  password: '',
  database: '',
  synchronize: true, // only development!
  logging: false,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  // namingStrategy: new CustomNamingStrategy(), // only create migrations
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};
```


Create private/public keys in src/config/jwt:

```bash
openssl genrsa -out private.pem 2048
```

```bash
openssl rsa -in private.pem -outform PEM -pubout -out public.pem
```


Running project

```bash
npm run start:dev
```
