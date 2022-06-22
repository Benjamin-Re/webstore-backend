const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products: {
        required: true,
        type: Array
    },
    total: {
        required: true,
        type: Number
    },
    customer: {
        type: String
    }
},
{
    versionKey: false
})

module.exports = mongoose.model("order", orderSchema);