const { Schema, model } = require ('mongoose');


const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true
    }, 
    role: {
        type: String,
        default: 'subscriber'
    },
    cart: {
        type: Array,
        default: [],
    },
    address: String,
    whishlist: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }

}, {timestamps : true}
);

module.exports = model('User', UserSchema);