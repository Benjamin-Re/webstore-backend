const express = require('express');
const router = express.Router();
const Model = require('../Model/productModel');

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

module.exports = router;