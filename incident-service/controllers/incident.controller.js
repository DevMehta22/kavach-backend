const Incident = require('../models/incident.schema');

const reportIncident = async (req, res) => {
    try {
        const { type, description, location, attachments } = req.body;

        if (!type || !description || !location || !location.coordinates) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const newIncident = new Incident({
            civilianId:req.params.cid,
            type,
            description,
            location: {
                type: 'Point',
                coordinates: location.coordinates, // [longitude, latitude]
            },
            attachments,
        });

        await newIncident.save();

        res.status(201).json({ message: 'Incident reported successfully.', incident: newIncident });
    } catch (error) {
        res.status(500).json({ message: 'Error creating incident.', error: error.message });
    }
};

const getAllIncidents = async (req, res) => {
    try {
        const incidents = await Incident.find().populate('civilianId', 'firstName lastName phone');
        res.status(200).json({ incidents });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching incidents.', error: error.message });
    }
};

const getIncidentById = async (req, res) => {
    try {
        const { id } = req.params;

        const incident = await Incident.findById(id)

        if (!incident) {
            return res.status(404).json({ message: 'Incident not found.' });
        }

        res.status(200).json({ incident });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching incident.', error: error.message });
    }
};

const getIncidentsByCid = async(req,res)=>{
    try{
        const {cid} = req.params;
        const incidents = await Incident.find({civilianId:cid});
        res.status(200).json({incidents});
    }catch(error){
        res.status(500).json({ message: 'Error fetching incidents.', error: error.message });
    }
}

const updateIncident = async (req, res) => {
    try {
        const { id } = req.params;
        

        const updatedIncident = await Incident.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedIncident) {
            return res.status(404).json({ message: 'Incident not found.' });
        }

        res.status(200).json({ message: 'Incident updated successfully.', incident: updatedIncident });
    } catch (error) {
        res.status(500).json({ message: 'Error updating incident.', error: error.message });
    }
};

const deleteIncident = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedIncident = await Incident.findByIdAndDelete(id);

        if (!deletedIncident) {
            return res.status(404).json({ message: 'Incident not found.' });
        }

        res.status(200).json({ message: 'Incident deleted successfully.', incident: deletedIncident });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting incident.', error: error.message });
    }
};

module.exports = {
    reportIncident,
    getAllIncidents,
    getIncidentsByCid,
    getIncidentById,
    updateIncident,
    deleteIncident,
};