const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
    stock: {
        required: true,
        type: Number
    },
    imgSrc: {
        type: String,
    }
},
{
    versionKey: false
})

module.exports = mongoose.model("product", productSchema);


/*

"name":"Pencils","price":"12.99","stock":"10","imgSrc":"products/pencils.jpg"
    */