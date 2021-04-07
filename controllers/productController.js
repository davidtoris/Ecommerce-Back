const Product = require("../models/productModel");
const slugify = require('slugify')

const createProduct = async (req, res) => {
    
    try {
        const { title, description, price, category, subcategory, quantity, sold  } = req.body
        const product = new Product ({
            title,
            slug: slugify(title).toLowerCase(),
            description, price, category, subcategory, quantity, sold
        })
        
        await product.save()
        res.status(201).json({
            ok:true,
            product
        })
    } catch (error) {
        res.status(500).send({
            message:
            error.message || "Some error occurred while creating the Product."
        });
    }
}


const allProduct = async (req, res) => {
    try {        
        const product = await Product.find()
        res.status(201).send(product)
    } catch (error) {
        res.status(500).send({
            message:
            error.message || "Some error occurred while listing all Products."
        });
    }     
}


const oneProduct = async (req, res) => {
       
    const {id} = req.params
    try {        
        const product = await Product.find({_id : id})
        .populate('category', 'name')
        res.status(201).send(product)
    } catch (error) {
        res.status(500).send({
            message:
            error.message || "Some error occurred while listing all Products."
        });
    }     
}


module.exports = {
    createProduct,
    allProduct,
    oneProduct
}