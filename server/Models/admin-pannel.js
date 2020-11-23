import mongoose from 'mongoose';

const Schema = mongoose.Schema

const AdminPanelSchema = new Schema({

    Admin: {
        type: String,
        default: 'Abhinav Bhattarai'
    },

    total_userprofiles: {
        type: Number,
        default: 0
    },

    total_sales: {
        type: Number,
        default: 0
    },

    MonthlyConcurrentUsers: {
        type: Number,
        default: 0
    },
    
    PrimaryUsers: {
        type: [String],
        default: []
    },

    PaidAccounts: {
        type: [{email: String}],
        default: []
    }
    // first ten user's
})

const AdminModel = mongoose.model('AdminPannel', AdminPanelSchema)

export default AdminModel