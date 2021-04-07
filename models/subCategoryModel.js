const { Schema, model } = require ('mongoose');


const SubcategorySchema = new Schema({
    name: {
        type: String,
        trim: true,
        require: true,
        minlength:[3, 'Too short'],
        maxlength:[32, 'Too long'],
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }

}, {timestamps : true}
);

module.exports = model('Subcategory', SubcategorySchema);