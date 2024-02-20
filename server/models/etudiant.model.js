import mongoose from "mongoose";

const etudiantSchema = new mongoose.Schema({
    identityCard : {
        type: String,
        required: true
    },
    grade : {
        type: String,
        required: true
    },
    userName : {
        type: String,
        required: true
    },
    phoneNumber : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    clubs : {
        type: Array,
        required: true
    },
    accountType : {
        type: String,
        required: true
    }

}, { timestamps: true  });


const User = mongoose.model('etudiant', etudiantSchema);

export default User;
