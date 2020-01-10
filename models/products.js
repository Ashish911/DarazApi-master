const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema({
    Description: {
        type:String,
        required:true
    },
    Price: {
        type:Number,
        required:true
    },
    Image: {
        type:String,
        required:true
    }
})

const Product = mongoose.model('Product', ProductsSchema)
module.exports = Product