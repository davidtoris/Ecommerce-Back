const { text } = require('express');
const { Schema, model } = require ('mongoose');

const ProductSchema = new Schema({
    title: {
        type: String,
        trim: true,
        require: true,
        maxlength: 32,
        text: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000,
        text: true
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 32
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    subcategory: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Subcategory'
        }
    ],
    quantity: Number,
    sold: {
        type: String,
        default: 0
    },
    images: {
        type: Array
    },
    shipping: {
        type: String,
        enum: ["Yes", "No"]
    },
    color: {
        type: String,
        enum: ["Black", "Brown", "Silver", "White", "Blue"]
    },
    // ratings: [
    //     {
    //         star: Number,
    //         postedBy: {
    //             type: Schema.Types.ObjectId,
    //             ref: 'User'
    //         }
    //     }
    // ]

}, {timestamps : true}
);

module.exports = model('Product', ProductSchema);