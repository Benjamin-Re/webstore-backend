const express = require('express');
const router = express.Router();
const User = require('../Model/userModel');
const Product = require('../Model/productModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Get all users from collection
router.get('/', (req, res)=>{
    User.find().then((data) => {
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

// Get one user from collection
router.get('/:id', authenticateToken, (req, res)=>{
    let id = req.params.id;
    User.findById(id).then((data) => {
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

// POST new user
router.post('/signup', (req, res)=>{
    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
    })
    user.save().then((user) => {
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

router.post('/login', (req, res)=>{
    const user = User.findOne({
        email: req.body.email,
        password: req.body.password
    })
    .then((user) => {
        const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET);
        const role = user.role;
        const userId = user._id;
        res.status(201).json({
            accessToken,
            role,
            userId,
            status: "succeeded",
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

// Patch user, include jwt check middleware
router.patch('/:id', authenticateToken, (req, res)=>{
    let id = req.params.id;
    let data = req.body;
    let options = { new: true }; // true to return the updated obj not original
    User.findByIdAndUpdate(id, { $push: {orders: data} }, options) // Need $push to not overwrite
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

// Patch user
router.patch('/profile/:id', (req, res)=>{
    let id = req.params.id;
    let data = req.body;
    let options = { new: true }; 
    User.findByIdAndUpdate(id, data, options) 
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
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token===null)return res.sendStatus(401);
    // authData is the credentials
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, authData) => {
        if(err) return res.sendStatus(403);
        req.authData = authData;
        next();
    })
}

module.exports = router;