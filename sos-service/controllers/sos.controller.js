const sosRequestSchema = require('../models/sos.schema')

const createSosRequest = async(req,res)=>{
    try{
        const {location} = req.body;
        if (!location || !Array.isArray(location.coordinates) || location.coordinates.length !== 2) {
            return res.status(400).json({ message: 'Invalid location data.' });
        }
        const sos = new sosRequestSchema({
            civilianId:req.params.id,
            location
        });
        await sos.save();
        res.status(201).json({message:"sos request triggered successfully"})
    }catch(error){
        res.status(500).json({message:"Error:",error})
    }
}

const getAllSos = async(req,res)=>{
    try{
        const sos = await sosRequestSchema.find();
        res.status(200).json(sos)

    }catch(error){
        res.status(500).json({message:"Error:",error})
    }
}

module.exports = {createSosRequest,getAllSos}