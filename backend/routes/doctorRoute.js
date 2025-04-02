// doctorRoutes.js

import express from 'express';
import { 
    loginDoctor, 
    appointmentsDoctor, 
    appointmentCancel, 
    doctorList, 
    changeAvailablity, 
    appointmentComplete, 
    doctorDashboard, 
    doctorProfile, 
    updateDoctorProfile 
} from '../controllers/doctorController.js';

import authDoctor from '../middleware/authDoctor.js';
import doctorModel from '../models/doctorModel'; // Import the doctor model
import authMiddleware from '../middleware/authMiddleware'; // Middleware to check if the user is admin

const doctorRouter = express.Router();

// Route Definitions

// Doctor login
doctorRouter.post("/login", loginDoctor);

// Appointment management routes
doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel);
doctorRouter.get("/appointments", authDoctor, appointmentsDoctor);

// Doctor list and availability management
doctorRouter.get("/list", doctorList);
doctorRouter.post("/change-availability", authDoctor, changeAvailablity);

// Complete appointment and dashboard
doctorRouter.post("/complete-appointment", authDoctor, appointmentComplete);
doctorRouter.get("/dashboard", authDoctor, doctorDashboard);

// Profile management
doctorRouter.get("/profile", authDoctor, doctorProfile);
doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile);

// DELETE route to delete a doctor's profile (only accessible to admin)
doctorRouter.delete('/doctor/:doctorId', authMiddleware, async (req, res) => {
    try {
        // Extract the doctorId from the request parameters
        const doctorId = req.params.doctorId;

        // Check if the logged-in user is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'You do not have permission to delete this doctor profile' });
        }

        // Find and delete the doctor by their ID
        const doctor = await doctorModel.findByIdAndDelete(doctorId);

        // If no doctor is found, return an error message
        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }

        // Return success message if the doctor was deleted
        return res.status(200).json({ success: true, message: 'Doctor profile deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error, please try again later' });
    }
});

export default doctorRouter;
