const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    bestSeller: {
        type: Boolean,
        default: false
    },

    quantity: {
        type: Number,
        default: 0
    },

    description: {
        type: String,
        required: true
    },

    dateCreated: {
        type: Date,
        default: Date.now()
    },
    type: {
        type: String,
        default: "product"
    }
})

module.exports = mongoose.model("product", productSchema)