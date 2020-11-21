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
        type: String,
        default: new Date(parseInt(Date.now)).toLocaleDateString()
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
     }
})

const Model = mongoose.model('ProductModel', Schema)
// .sort({'ItemName': 1})
export default Model