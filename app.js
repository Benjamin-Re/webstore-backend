const express = require('express');
const mongoose = require('mongoose');
const port = 8000;
const products = require('./Controller/productsController');
const orders = require('./Controller/ordersController');
const users = require('./Controller/usersController');
const cors = require('cors');

// Read the env config file
require('dotenv').config();
// DB connection string
const conn = process.env.DATABASE_URL;
// DB connection
mongoose.connect(conn);
const database = mongoose.connection;
// Verify DB connection
database.on('err', (err)=>{
    console.log(err);
})
database.once('connected', ()=> {
    console.log("connection succesful"); 
})

// Config the app
const app = express();
app.use(express.json());
// OMG it WORKS!!! You have to put it before using the route , oMG !!
app.use(
    cors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    })
    );
app.use("/products", products);
app.use("/orders", orders);
app.use("/users", users);

// Start server
app.listen(port, ()=>{
    console.log(`server running at http://localhost:${port}`);
})