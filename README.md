# Simple with Express

Welcome to the 'Simple with Express' project! We present this platform as a solution to the need for a web application that can easily manage data in a MySQL database while providing secure authentication features.

Simple with Express is an all-in-one solution for developers looking for a quick and efficient way to build web applications. By utilizing cutting-edge technologies like Node.js and Express.js, this project provides a robust framework for developing server-based applications with ease.

## Key features of Simple with Express include:

1. CRUD Operations: Manage your data easily through intuitive CRUD operations. Add, read, update, and delete entities from your database quickly and efficiently.

2. Seeder: Boost your productivity with a built-in seeder that allows you to populate the database with sample data in seconds. Ideal for development and testing.

3. Authentication Feature: Protect your application with a robust authentication feature. Simple with Express provides a customizable authentication system, including user registration, login, logout, and session management.

4. Node.js Ecosystem: Built on top of the powerful Node.js ecosystem, this project provides flexibility to expand your functionality easily. Add modules, middleware, or customize as needed.

With Simple with Express, you don't need to waste valuable time building basic features from scratch. Take advantage of the prepared framework and focus on developing unique features that serve your application's needs.

So, are you ready to move forward with Simple with Express? Start your development journey now and create robust and secure web applications quickly and efficiently!



## Prerequisite
1. Using NodeJs version `v18.20`
2. Ensure you has been installed Mysql

## Installation
1. run command `npm install`
2. make sure `env` file has been set base on connection Mysql
2. run command `node server.js` to init models, then `exit`.
3. run command `node seeder.js` to create first user.

## Running
1. run command `node server.js`.


## List Endpoint

| Method | Name           | Endpoint                                    |
|--------|----------------|---------------------------------------------|
| POST   | Login          | http://localhost:3005/apis/login            |
| POST   | Create User    | http://localhost:3005/apis/users/create     |
| GET    | List Company   | http://localhost:3005/apis/companies/list   |
| POST   | Create Company | http://localhost:3005/apis/companies/insert |
| PUT    | Edit Company   | http://localhost:3005/apis/companies/{id}   |
| DELETE | Delete Company | http://localhost:3005/apis/companies/{id}   |

