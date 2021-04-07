const Category = require("../models/categoryModel");
const slugify = require('slugify')

const createCategory = async (req, res) => {
    
    try {
        const { name } = req.body
        const category = new Category ({
            name,
            slug: slugify(name).toLowerCase()
        })
        await category.save()
        res.status(201).json({
            ok:true,
            category : category.name
        })
    } catch (error) {
        res.status(500).send({
            message:
            error.message || "Some error occurred while creating the Category."
        });
    }
}


const allCategory = async (req, res) => {
       
    try {        
        const category = await Category.find()
        res.status(201).send(category)
            
    } catch (error) {
        res.status(500).send({
            message:
            error.message || "Some error occurred while listing all Categories."
        });
    }     
}


const oneCategory = async (req, res) => {
       
    const {id} = req.params
    try {        
        const category = await Category.find({_id : id})
        .populate('category', 'name')
        res.status(201).json({
            ok:true,
            category
        })
    } catch (error) {
        res.status(500).send({
            message:
            error.message || "Some error occurred while listing all Categories."
        });
    }     
}


module.exports = {
    createCategory,
    allCategory,
    oneCategory
}