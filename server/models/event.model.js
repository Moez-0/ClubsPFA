import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    eventName : {
        type: String,
        required: true
    },
    eventDescription : {
        type: String,
        required: true
    },
    eventDate : {
        type: String,
        required: true
    },
    eventTime : {
        type: String,
        required: true
    },
    eventLocation : {
        type: String,
        required: true
    },
    eventMembers : {
        type: Array,
        required: true
    },
    eventClub : {
        type: String,
        required: true
    }
}, { timestamps: true  });


const Event = mongoose.model('event', eventSchema);

export default Event;
