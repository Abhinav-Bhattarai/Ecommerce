import mongoose from 'mongoose';

const ProductSchema = mongoose.Schema
const Schema = new ProductSchema({
    Seller: {
        type: String,
        required: true
    },

    Price: {
        type: String,
        required: true
    },

    PostDate: {
        type: String
    },

    ItemName: {
        type: String,
        required: true
    },

    ProductImage: {
        type: String,
        data: Buffer,
        default: '',
        required: true
    },

    Description: {
        type: 'String',
        data: Buffer,
        required: true
    },

     InterestedBuyers: {
         type: [{email: String, phone: Number}],
         default: []
     },

     DisclosedBuyer: {
         type: {email: String, Phone: Number},
         default: {}
     },
     
     WishListed: {
         type: Boolean,
         default: false
     },

     Status: {
         type: Boolean,
         default: false
     },
    
     Messages: {
         type: [{username: String, msg: String, answer: String}],
         default: []
     }
})

const Model = mongoose.model('ProductModel', Schema)

export default Model