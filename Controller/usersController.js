const express = require('express');
const router = express.Router();
const Model = require('../Model/userModel');

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
router.post('/', (req, res)=>{
    const data = new Model({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        orders: req.body.orders,
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

module.exports = router;