import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    adminName : {
        type: String,
        required: true
    },
    adminEmail : {
        type: String,
        required: true
    },
    adminPassword : {
        type: String,
        required: true
    },
    adminImage : {
        type: String,
        required: true
    }
}, { timestamps: true  });


const Admin = mongoose.model('admin', adminSchema);

export default Admin;