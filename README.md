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
