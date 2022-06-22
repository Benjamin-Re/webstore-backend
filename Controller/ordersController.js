const express = require('express');
const router = express.Router();
const Model = require('../Model/orderModel');

// Post document
router.post('/', (req, res)=>{
    const data = new Model({
        products: req.body.products,
        total: req.body.total,
        customer: req.body.customer
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

module.exports = router;