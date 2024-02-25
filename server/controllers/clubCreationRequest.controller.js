import ClubCreationRequest from '../models/clubCreationRequest.model.js';
import User from '../models/etudiant.model.js';

// Get all club creation requests


export const getClubCreationRequests = async (req, res, next) => {
    try {
        const clubCreationRequests = await ClubCreationRequest.find();
        res.status(200).json({ success: true, clubCreationRequests });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

// Get a single club creation request


export const getClubCreationRequest = async (req, res, next) => {
    const { id } = req.params;
    try {
        const clubCreationRequest = await ClubCreationRequest.findById(id);
        if (!clubCreationRequest) {
            return res.status(404).json({ success: false, message: 'Club creation request not found' });
        }
        res.status(200).json({ success: true, clubCreationRequest });
    } catch (error) {
        next(error);
    }
}

// Create a club creation request


export const createClubCreationRequest = async (req, res, next) => {
   

    const { clubName, clubDescription, clubMission, clubVision, clubGoals, clubActivities, clubExectutiveMembers, clubPresident } = req.body;

    
    try {
        const newClubCreationRequest = new ClubCreationRequest({ clubName, clubDescription, clubMission, clubVision, clubGoals, clubActivities, clubExectutiveMembers : clubExectutiveMembers, clubPresident , requestStatus: 'pending'});
        await newClubCreationRequest.save();
        res.status(201).json({ success: true, message: 'Club creation request created successfully' });
    }
    catch (error) {
        next(error);
    }
}

// Accept a club creation request



// Reject a club creation request and push a notification to the user who created the request


export const rejectClubCreationRequest = async (req, res, next) => {

    const { id } = req.params;


    try {
        const clubCreationRequest = await ClubCreationRequest.findById(id);
        if (!clubCreationRequest) {
            return res.status(404).json({ success: false, message: 'Club creation request not found' });
        }
        User.findById(clubCreationRequest.clubPresident).then(user => {
      

            user.notifications.push({ message: 'Your club creation request has been rejected', type: 'error' });
            user.save();
        });
        clubCreationRequest.requestStatus = 'rejected';

        await clubCreationRequest.save();
        res.status(200).json({ success: true, message: 'Club creation request rejected successfully' });
    } catch (error) {
        next(error);
    }
}


export const acceptClubCreationRequest = async (req, res, next) => {

    const { id } = req.params;

    try {
        const clubCreationRequest = await ClubCreationRequest.findById(id);
        if (!clubCreationRequest) {
            return res.status(404).json({ success: false, message: 'Club creation request not found' });
        }
        User.findById(clubCreationRequest.clubPresident).then(user => {
            user.notifications.push({ message: 'Your club creation request has been accepted', type: 'success' });
            user.save();
        });
        clubCreationRequest.requestStatus = 'accepted';
        await clubCreationRequest.save();
        res.status(200).json({ success: true, message: 'Club creation request rejected successfully' });
    } catch (error) {
        next(error);
    }
}

