# Bifrost Backend

A simple CRUD API that allows a user to interact with a database.

---

## General informations

This API was developped as part of a technical test. It communicate with a Mongoose database to add, get, update and remove products from a supply. Each product has a brand, name, price and quantity property.
This project was made to work with another project: [Bifrost Frontend](https://github.com/rinps/bifrost-frontend).

---

## Technologies

- Javascript / Node.js
- MongoDB

This project also uses express and express-formidable to manage the server. cors must also be installed, since this API must communicate with an external website. Lastly, environmental variables are used, so the dotenv package must also be installed.

---

## Installation

Download the repository on your computer. You must have npm installed to manage the packages.
Go to the project repertory and enter the following commands:

```
npm init -y
npm install express express-formidable cors dotenv mongoose
```

Create a `.env` file at the project root, you must put two environment variables inside this file:

- `PORT`: The port the server must use. Do not create this variable if you want to deploy the API with Heroku
- `DATABASE_URI`: The Mongoose database adress

---

## Launch

The server can be launched simply by entering `npm start` when you're at the root of the project.
If you want to implement new things to this API, you might want to have the server update automatically when modifying a file. In this case, use `npx nodemon index.js`, which allows the server to stop and restart when you save a change in the project.
