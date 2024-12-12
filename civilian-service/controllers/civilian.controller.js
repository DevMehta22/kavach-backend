const civilianSchema = require('../models/civlian.schema')

const createProfile = async (req, res) => {
    try {
        const { firstName, lastName, phone, address } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !phone || !address) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Check if phone number already exists
        const existingProfile = await civilianSchema.findOne({ phone });
        if (existingProfile) {
            return res.status(400).json({ message: 'Phone number already exists.' });
        }

        const newProfile = new civilianSchema({
            userId:req.user?.id,
            firstName,
            lastName,
            phone,
            address,
        });

        await newProfile.save();

        res.status(201).json({ message: 'Profile created successfully.', civilian: newProfile });
    } catch (error) {
        res.status(500).json({ message: 'Error creating profile.', error: error.message });
    }
};

// Get all civilians
const getCivilians = async (req, res) => {
    try {
        const civilians = await civilianSchema.find();
        res.status(200).json(civilians);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving civilians.', error: error.message });
    }
};

// Get civilian by ID
const getProfileById = async (req, res) => {
    try {
        const { id } = req.params;
        const profile = await civilianSchema.findById(id);

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found.' });
        }

        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving civilian.', error: error.message });
    }
};

// Update civilian details
const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedProfile = await civilianSchema.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true,
        });

        if (!updatedProfile) {
            return res.status(404).json({ message: 'Profile not found.' });
        }

        res.status(200).json({ message: 'Profile updated successfully.', civilian: updatedProfile });
    } catch (error) {
        res.status(500).json({ message: 'Error updating Profile.', error: error.message });
    }
};

// Delete civilian by ID
const deleteProfile = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProfile = await civilianSchema.findByIdAndDelete(id);

        if (!deletedProfile) {
            return res.status(404).json({ message: 'profile not found.' });
        }

        res.status(200).json({ message: 'profile deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting profile.', error: error.message });
    }
};

module.exports = {
    createProfile,
    getCivilians,
    getProfileById,
    updateProfile,
    deleteProfile,
}