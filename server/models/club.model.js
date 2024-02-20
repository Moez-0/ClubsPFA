import mongoose from "mongoose";

const clubSchema = new mongoose.Schema({
    clubName : {
        type: String,
        required: true
    },
    clubDescription : {
        type: String,
        required: true
    },
    clubMembers : {
        type: Array,
        required: true
    },
    clubEvents : {
        type: Array,
        required: true
    },
    clubAdmin : {
        type: String,
        required: true
    }
}, { timestamps: true  });


const Club = mongoose.model('club', clubSchema);

export default Club;
