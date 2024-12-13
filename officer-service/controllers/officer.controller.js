const officerSchema = require("../models/officer.schema")

const createProfile = async (req, res) => {
    try {
        const { firstName, lastName, badgeNumber, rank, department, phone, address, status } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !badgeNumber || !rank || !address || !phone || !department) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Check if badge number or email already exists
        const existingOfficer = await officerSchema.findOne({ 
            $or: [{ badgeNumber }] 
        });
        if (existingOfficer) {
            return res.status(400).json({ message: 'Badge number already exists.' });
        }

        const newOfficer = new officerSchema({
            userId:req.user.id,
            firstName,
            lastName,
            badgeNumber,
            rank,
            department,
            phone,
            address,
            status: status || 'active',
        });

        await newOfficer.save();
        res.status(201).json({ message: 'Officer profile created successfully.', officer: newOfficer });
    } catch (error) {
        res.status(500).json({ message: 'Error creating officer profile.', error: error.message });
    }
};

const getOfficers = async (req, res) => {
    try {
        const officers = await officerSchema.find(); // Fetch all officers
        res.status(200).json({ message: 'Officer profiles fetched successfully.', officers });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching officer profiles.', error: error.message });
    }
};

const getProfileById = async (req, res) => {
    try {
        const { id } = req.params;

        const officer = await officerSchema.findById(id);
        if (!officer) {
            return res.status(404).json({ message: 'Officer not found.' });
        }

        res.status(200).json({ message: 'Officer profile fetched successfully.', officer });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching officer profile.', error: error.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedOfficer = await officerSchema.findByIdAndUpdate(id, updateData, { new: true,runValidators:true });
        if (!updatedOfficer) {
            return res.status(404).json({ message: 'Officer not found.' });
        }

        res.status(200).json({ message: 'Officer profile updated successfully.', officer: updatedOfficer });
    } catch (error) {
        res.status(500).json({ message: 'Error updating officer profile.', error: error.message });
    }
};

const deleteProfile = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedOfficer = await officerSchema.findByIdAndDelete(id);
        if (!deletedOfficer) {
            return res.status(404).json({ message: 'Officer not found.' });
        }

        res.status(200).json({ message: 'Officer profile deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting officer profile.', error: error.message });
    }
};

module.exports = {
    createProfile,
    getOfficers,
    getProfileById,
    updateProfile,
    deleteProfile,
};