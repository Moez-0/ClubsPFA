import mongoose from "mongoose";

const clubCreationRequestSchema = new mongoose.Schema({
    clubName: {
        type: String,
        required: true
    },
    clubDescription: {
        type: String,
        required: true
    },
    clubMission: {
        type: String,
        required: true
    },
    clubVision: {
        type: String,
        required: true
    },
    clubActivities: {
        type: String,
        required: true
    },
    clubGoals: {
        type: String,
        required: true
    },
    clubExectutiveMembers: {
        type: String,
        required: true
    },
    clubPresident: {
        type: String,
        required: true
    },
    requestStatus: {
        type: String,
        default: 'pending'
    }


}, { timestamps: true });

const ClubCreationRequest = mongoose.model('clubCreationRequest', clubCreationRequestSchema);

export default ClubCreationRequest;