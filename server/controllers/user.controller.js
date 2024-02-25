import mongoose from "mongoose";
import User from "../models/etudiant.model.js";
import Club from "../models/club.model.js";
import jwt from "jsonwebtoken";
import { addMember } from "./club.controller.js";

// Function to get user ID from JWT token
export const getUserId = async (req, res, next) => {
    try {
        const cookieHeader = req.headers.cookie;
        
        if (!cookieHeader) {
            return res.status(401).json({ success: false, message: 'User not authenticated' });
        }
        
        const token = cookieHeader.split('=')[1];
        const decoded = jwt.verify(token, process.env.SECRET);
        const id = decoded.id;
   
        return res.status(200).json({ success: true, id });
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
}

// Get all users
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.error(error);
        next(error);
    }
}


// Get a single user
export const getUser = async (req, res, next) => {
    const { id } = req.params;
    
    try {
        const user = await User.findById(id);
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        
        res.status(200).json({ success: true, user });
    } catch (error) {
        next(error);
    }
}

//join a clubexport 
export const joinClub = async (req, res, next) => {
    const { clubId } = req.params;
    const userId = req.body.userId;
    try {
        const user = await User.findById(userId);
        const club = await Club.findById(clubId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        if (!club) {
            return res.status(404).json({ success: false, message: 'Club not found' });
        }
        // Check if club.members exists before accessing it
        if (!club.members || !club.members.includes(userId)) {
            // Add user to club if not already a member
            if (!club.members) {
                club.members = [userId];
            } else {
                club.members.push(userId);
            }
            await club.save();
        } else {
            return res.status(400).json({ success: false, message: 'User already joined club' });
        }
        // Check if user.clubs exists before accessing it
        if (!user.clubs || !user.clubs.includes(clubId)) {
            // Add club to user's clubs if not already a member
            if (!user.clubs) {
                user.clubs = [clubId];
            } else {
                user.clubs.push(clubId);
            }
            await user.save();
        } else {
            return res.status(400).json({ success: false, message: 'User already joined club' });
        }
        
        // Add club to user's clubs
        user.clubs.push(clubId);
        await user.save();
        // Include user ID in the club object in the response
        club.clubMembers = club.members; // Assign club.members to club.clubMembers for consistency
        await club.save();
        res.status(200).json({ success: true, club });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}


