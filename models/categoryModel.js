const { Schema, model } = require ('mongoose');


const CategorySchema = new Schema({
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
    }

}, {timestamps : true}
);

module.exports = model('Category', CategorySchema);