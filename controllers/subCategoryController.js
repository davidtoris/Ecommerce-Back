const Subcategory = require("../models/subCategoryModel");
const slugify = require('slugify')

const createSubCategory = async (req, res) => {
    
    try {
        const { name, category } = req.body
        const subcategory = new Subcategory ({
            name,
            slug: slugify(name).toLowerCase(),
            category
        })
        await subcategory.save()
        res.status(201).json({
            ok:true,
            subcategory : subcategory.name,
            category : subcategory.category
        })
    } catch (error) {
        res.status(500).send({
            message:
            error.message || "Some error occurred while creating the Category."
        });
    }       
}

const allSubCategory = async (req, res) => {
       
    try {        
        const subcategory = await Subcategory.find()
        .populate('category', 'name')
        res.status(201).json({
            ok:true,
            subcategory
        })
    } catch (error) {
        res.status(500).send({
            message:
            error.message || "Some error occurred while listing all Categories."
        });
    }     
}


const oneSubCategory = async (req, res) => {
       
    const {id} = req.params
    
    // const findSubcategory = await Subcategory.findOne({_id : id})
    
    // if(!findSubcategory){
    //     res.status(400).json({
    //         ok:false,
    //         msg: `No existe el id: ${id}`
    //     })
    //     return
    // }
    
    try {        
        const subcategory = await Subcategory.find({_id : id})
        .populate('category', 'name')
        res.status(201).json({
            ok:true,
            subcategory
        })
    } catch (error) {
        res.status(500).send({
            message:
            error.message || "Some error occurred while listing all Categories."
        });
    }     
}


module.exports = {
    createSubCategory,
    allSubCategory,
    oneSubCategory
}