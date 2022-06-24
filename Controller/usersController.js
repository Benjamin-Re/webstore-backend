const express = require('express');
const router = express.Router();
const Model = require('../Model/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Get all documents from collection
router.get('/', (req, res)=>{
    Model.find().then((data) => {
        res.status(200).json({
            status: 'suceeded',
            data,
            error: null
        })
    }).catch((error) => {
        res.status(404).json({
            status: 404,
            data,
            error: error.message
        })
    })
})

// Post document
router.post('/signup', (req, res)=>{
    const data = new Model({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password
    })
    data.save().then((data) => {
        res.status(201).json({
            status: "succeeded",
            data,
            error: null
        })
    }).catch((error) => {
        res.status(404).json({
            status: "failed",
            error,
            error: error.message
        })
    })
})

// Post document
router.post('/login', (req, res)=>{
    const user = Model.findOne({
        email: req.body.email,
        password: req.body.password
    })
    .then((user) => {
        const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET);
        res.status(201).json({
            accessToken,
            status: "succeeded",
            user,
            error: null
        })
    }).catch((error) => {
        res.status(404).json({
            status: "failed",
            error,
            error: error.message
        })
    })
})

// Patch document
router.patch('/:id', (req, res)=>{
    let id = req.params.id;
    let data = req.body;
    let options = { new: true }; // true to return the updated obj not original
    Model.findByIdAndUpdate(id, { $push: {orders: data} }, options) // Need $push to not overwrite
    .then( (data) => {
        res.status(200).json({
            status: "succeeded",
            data,
            error: null
        })
    })
    .catch((error) => {
        res.status(404).json({
            status: "failed",
            error,
            error: error.message
        })
    })
})

// middleware to check if user is logged in
// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if(token===null)return res.sendStatus(401);
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if(err) return res.sendStatus(403);
//         req.user = user;
//         next();
//     })
// }

module.exports = router;