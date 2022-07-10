const express = require("express");
const router = express.Router();
const Model = require("../Model/productModel");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const productModel = require("../Model/productModel");
const path = require("path");
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/products')
  },
  filename: (req, file, cb) => {
    
    cb(null, Date.now() + path.extname(file.originalname)); // new name date + file extension 
  }
})
const upload = multer({storage: storage});

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


// Delete a product
router.delete("/:id", authenticateToken,(req, res) => {
  let id = req.params.id;
  Model.findOneAndDelete({_id: id}, {new: true})
  .then((data)=> {
    res.status(200).json({
      data,
      id,
      error: null
    })
  })
  .catch((error) => {
    res.status(404).json({
      status: "failed",
      error,
      error: error.message,
    });
  });
})


// POST new product
router.post('/new', upload.single("image"), (req, res) => {
  const newProduct = new productModel({
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock,
    imgSrc: req.file.filename,
  })
  newProduct.save().then(newProduct => {
      res.status(201).json({
        status: "succeeded",
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



// Patch product details
router.patch("/update/:id", upload.single("image"), (req, res) => {
  let id = req.params.id;
  let objForUpdate = {}
  if(req.body.name) objForUpdate.name = req.body.name;
  if(req.body.price) objForUpdate.price = req.body.price;
  if(req.body.stock) objForUpdate.stock = req.body.stock;
  if(req.file) objForUpdate.imgSrc = req.file.filename;
  
  Model.findOneAndUpdate(
    { _id: id },
    { $set:
      objForUpdate
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
      res.status(400).json({
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
