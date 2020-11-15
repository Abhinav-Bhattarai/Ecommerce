import mongoose from 'mongoose';

const Schema = mongoose.Schema

const MainSchema = new Schema({
    Username: {
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

    RecentPurchases:{
        type: [{item: String, price: Number}]
    },

    RecentSoldItems:{
        type: [{item: String, price: Number}]
    },

    ActiveStatus: {
        type: Boolean
    }
})

const Model = mongoose.model('Registration', MainSchema);

export default Model