import Club from '../models/club.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


//create club
export const createClub = async (req, res, next) => {
    const { clubName, clubDescription, clubAdmin, clubImage } = req.body;
    try {
        const club = await Club.create({
            clubName,
            clubDescription,
            clubAdmin,
            clubImage,
            members: [clubAdmin],
            notifications: [],
            clubNews: [],
            clubEvents: []

            
        });
        res.status(201).json({ success: true, club });
    } catch (error) {
        next(error);
    }
}

//get all clubs
export const getClubs = async (req, res, next) => {
    try {
        const clubs = await Club.find();
        res.status(200).json({ success: true, clubs });
    } catch (error) {
        next(error);
    }
}

//get a single club
export const getClub = async (req, res, next) => {
    const { id } = req.params;
    try {
        const club = await Club.findById(id);
        if (!club) {
            return res.status(404).json({ success: false, message: 'Club not found' });
        }
        res.status(200).json({ success: true, club });
    } catch (error) {
        next(error);
    }
}

//update club
export const updateClub = async (req, res, next) => {
    const { id } = req.params;
    try {
        const club = await Club.findByIdAndUpdate
            (id
                , req.body
                , {
                    new: true,
                    runValidators: true
                });
        if (!club) {
            return res.status(404).json({ success: false, message: 'Club not found' });
        }
        res.status(200).json({ success: true, club });
    }
    catch (error) {
        next(error);
    }
}

//delete club

export const deleteClub = async (req, res, next) => {
    const { id } = req.params;

    try {
        const club = await Club.findByIdAndDelete(id);
        if (!club) {
            return res.status(404).json({ success: false, message: 'Club not found' });
        }
        res.status(200).json({ success: true, message: 'Club deleted successfully' });
    }
    catch (error) {
        next(error);
    }
}

//get club by admin
export const getClubByAdmin = async (req, res, next) => {
    const { clubAdmin } = req.params;
    try {
        const club = await Club.find({ clubAdmin });
        if (!club) {
            return res.status(404).json({ success: false, message: 'Club not found' });
        }
        res.status(200).json({ success: true, club });
    } catch (error) {
        next(error);
    }
}

//get club by name
export const getClubByName = async (req, res, next) => {
    const { clubName } = req.params;

    try {
        const club = await Club.find({
            clubName: {
                $regex: clubName,
                $options: 'i'
            }
        });
        if (!club) {
            return res.status(404).json({ success: false, message: 'Club not found' });
        }
        res.status(200).json({ success: true, club });
    }
    catch (error) {
        next(error);
    }
}

//add member to club

export const addMember = async (req, res, next) => {
    const { id } = req.params;
    const { userId } = req.body;
    try {
        const club = await Club.findById(id);
        if (!club) {
            return res.status(404).json({ success: false, message: 'Club not found' });
        }
        club.members.push(userId);
        await club.save();
        res.status(200).json({ success: true, club });
    }
    catch (error) {
        next(error);
    }
}




export const sendNotification = async (req, res, next) => {

    const { clubId } = req.params;
    console.log(clubId);
    const { notification } = req.body;
    try {
        const club = await Club.findById(clubId);
        if (!club) {
            return res.status(404).json({ success: false, message: 'Club not found' });
        }
        club.notifications.push(notification);
        await club.save();
        res.status(200).json({ success: true, club });
    }
    catch (error) {
        next(error);
    }
}


export const addNews = async (req, res, next) => {
    const { clubId } = req.params;
    const { news } = req.body;
    try {
        const club = await Club.findById(clubId);
        if (!club) {
            return res.status(404).json({ success: false, message: 'Club not found' });
        }
        club.clubNews.push(news);
        await club.save();
        res.status(200).json({ success: true, club });
    }
    catch (error) {
        next(error);
    }
}

export const addEvent = async (req, res, next) => {
    const { clubId } = req.params;
    const { event } = req.body;
    try {
        const club = await Club.findById(clubId);
        if (!club) {
            return res.status(404).json({ success: false, message: 'Club not found' });
        }
        club.clubEvents.push(event);
        await club.save();
        res.status(200).json({ success: true, club });
    }
    catch (error) {
        next(error);
    }
}


export const getClubNews = async (req, res, next) => {
    const { clubId } = req.params;
    try {
        const club = await Club.findById(clubId);
        if (!club) {
            return res.status(404).json({ success: false, message: 'Club not found' });
        }
        res.status(200).json({ success: true, clubNews: club.clubNews });
    }
    catch (error) {
        next(error);
    }
}



