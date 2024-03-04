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
    },
    clubImage : {
        type: String,
        required: true
    },
    notifications : {
        type: Array,
        required: false
    },
    clubNews : {
        type: Array,
        required: false
    },
}, { timestamps: true  });


const Club = mongoose.model('club', clubSchema);

export default Club;
