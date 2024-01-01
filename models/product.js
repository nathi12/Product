const mongoose = require('mongoose');

/**
 * creating a collections called products
 */
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['fruit', 'vegetable', 'dairy',]
    }
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;