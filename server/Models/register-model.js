import mongoose from 'mongoose';

const Schema = mongoose.Schema

const MainSchema = new Schema({
    Email: {
        type: String,
        required: true
    },

    Password: {
        type: String,
        required: true
    },

    CreationDate: {
        type: String,
        default: new Date(parseInt(Date.now())).toLocaleDateString()
    },

    Purchases:{
        type: [{item: String, price: Number, type: String}],
        default: []
    },

    WishListedItems: {
        type: [{item_name: String, item_id: String, Seller: String, Price: Number, ProductImage: String, Description: String}],
        default: []
    },

    CartedItem: {
        type:[{item_name: String, item_id: String, ProductImage: String, ProductPrice: Number}],
        default: []
    },

    ActiveStatus: {
        type: Boolean
    },
    
    Phone: {
        type: Number,
        required: true
    }
})

const Model = mongoose.model('Registration', MainSchema);

export default Model