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
$ npm run start
```
## How to use
## Login:
On your browser, postman or any application to make HTTP request, do:
>POST http://localhost:3000/auth/login
>>{\
"username": \<your username\>,\
"password": \<your password\>\
}

You'll get an access token like the following:
>{\
	"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlYmFVbm8iLCJzdWIiOjEsImlhdCI6MTY0NzQwMjcxMSwiZXhwIjoxNjQ3NDAzMzExfQ.0hjET0LZ7XhtZH-a2uCRzcrC_Yg9wZL3oueIrRxG3eQ"\
}

## Movies services:
### Get movies:

>GET http://localhost:3000/movies
### Get a movie by id:

>GET http://localhost:3000/movies/\<movie_id>

### Rent/buy/return a movie:
- You must be logged as a `client` user:

In the header, provide your access token:
>"Authorization": "Bearer \<access_token>"

>POST http://localhost:3000/movies/\<movie_id>
>>{\
	"action": "return"\
}

- Action can be `buy`, `rent` or `return`.

### Create movie: 

- You must be logged as an `admin` user:

In the header, provide your access token:
>"Authorization": "Bearer \<access_token>"

>POST http://localhost:3000/movies/
>>{\
	"title": \<title>,\
	"description": \<description>,\
	"poster": \<poster>,\
	"stock": \<stock>,\
	"trailer_url": \<trailer_url>,\
	"sale_price": \<sale_price>,\
	"rent_price": \<rent_price>,\
	"available": \<available>,\
	"likes": \<likes>\
  "tags": \<tags>\
}

- `likes` must be a number.
- `available` must be a boolean.
- `tags` is optional. It must be a string array.
- Everything else must be a string.

### Update movie: 

- You must be logged as an `admin` user:

In the header, provide your access token:
>"Authorization": "Bearer \<access_token>"

>PATCH http://localhost:3000/movies/\<movie_id>
>>{\
	"sale_price": \<new_sale_price>,\
	"rent_price": \<new_rent_price>,\
}

### Delete movie: 

- You must be logged as an `admin` user:

In the header, provide your access token:
>"Authorization": "Bearer \<access_token>"

>DELETE http://localhost:3000/movies/\<movie_id>


## Users CRUD:
### Get all users:
>GET http://localhost:3000/users/

### Get user by ID:
>GET http://localhost:3000/users/\<user_id>

___

- For the following endpoints you must be logged as an `admin` user:
### Create user:
>POST http://localhost:3000/users/
>>{\
	"username": \<newUser>,\
	"password": \<newPassword>,\
  "role" : \<role>,\
}


### Update user: 
>PATCH http://localhost:3000/users/\<user_id>
>>{\
	"username": "NewUsername"\
}

### Delete user by id:
>DELETE http://localhost:3000/users/\<user_id>

