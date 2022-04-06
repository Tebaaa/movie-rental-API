<h1 align="center">Movie Rental API</h1>

![NPM](https://img.shields.io/badge/NPM-8.3.1-389AD5?labelColor=31C4F3&style=for-the-badge) ![NODE](https://img.shields.io/badge/NODE-16.14.0-8FC965?labelColor=5D9741&style=for-the-badge) ![POSTGRESQL](https://img.shields.io/badge/POSTGRESQL-12.9-8FC965?labelColor=5D9741&style=for-the-badge) ![NESTJS](https://img.shields.io/badge/NESTJS-8.2.1-389AD5?labelColor=31C4F3&style=for-the-badge)

## Description

API that handle movies requests. It shows a list of movies or a single movie if ID is provided. Also, if user has a `client` role, they can buy, rent or return a movie. If a user is `admin`, they can manage the movies and other users. 

## Initial configuration
Before run the project, you must provide the following environment variables:

```bash
DATABASE_USER = <database_user>
DATABASE_PASSWORD = <database_password>
DATABASE_NAME = <database_name>
DATABASE_PORT = <database_port>
DATABASE_HOST = <database_host_name>
JWT_SECRET = <jwt_secret_key>
SERVER_PORT = <server_port>
SERVER_HOST = <server_host_name>
```


## How to run

```bash
$ npm run build
$ npm run start
```
## How to use
On your browser, go to http://localhost:3000/docs and see documented endpoints.
