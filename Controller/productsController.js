const express = require("express");
const router = express.Router();
const Model = require("../Model/productModel");
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Get all products from collection
router.get("/", (req, res) => {
  Model.find()
    .then((data) => {
      res.status(200).json({
        status: "suceeded",
        data,
        error: null,
      });
    })
    .catch((error) => {
      res.status(404).json({
        status: 404,
        data,
        error: error.message,
      });
    });
});

// Patch product, reduce stock by quantity purchased
router.patch("/:id", authenticateToken,(req, res) => {
  let id = req.params.id;
  let data = req.body;
  let reduceBy = data.quantity;
  Model.findOneAndUpdate(
    { id: id },
    {
      $inc: {
        stock: reduceBy
      }
    },
    { new: true }
  )
    .then((data) => {
      res.status(200).json({
        status: "succeeded",
        data,
        error: null,
      });
    })
    .catch((error) => {
      res.status(404).json({
        status: "failed",
        error,
        error: error.message,
      });
    });
});

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
