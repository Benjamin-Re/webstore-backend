const express = require('express');
const mongoose = require('mongoose');
// const port = 8000;
const products = require('./Controller/productsController');
const orders = require('./Controller/ordersController');
const users = require('./Controller/usersController');
const cors = require('cors');

// Read the env config file
require('dotenv').config();
// DB connection string
// const conn = process.env.DATABASE_URL;
const connWeb = 
"mongodb+srv://ben:Mongo-Store@webstore.srqqiyl.mongodb.net/webstore?retryWrites=true&w=majority";
// DB connection
mongoose.connect(connWeb);
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
app.listen(process.env.PORT || 8000, ()=>{
    console.log(`server running on port`);
})

