const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: {
        required: true,
        unique: true,
        type: Number
    },
    name: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
},
{
    versionKey: false
})

module.exports = mongoose.model("product", productSchema);