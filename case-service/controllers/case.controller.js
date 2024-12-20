const CaseSchema = require('../models/case.schema')

const createCase = async(req,res)=>{
    try{
        const {incidentId,title,description,assignedOfficers,priority} = req.body;
        if(!incidentId || !title || !description || !assignedOfficers){
            return res.status(400).json({message:"Please fill all the required fields"});
        }
        const isCase = await CaseSchema.find(incidentId);
        if(isCase){
            return res.status(400).json({message:"Case already exists"});
            }
    
        const caseData = new CaseSchema({
            incidentId,
            title,
            description,
            assignedOfficers,
            priority
        })
        await caseData.save();
        res.status(201).json({message:"Case created successfully"});
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

const getCaseById = async(req,res)=>{
    try{
        const id = req.params.id;
        const caseData = await CaseSchema.findById(id);
        if(!caseData){
            return res.status(404).json({message:"Case not found"});
        }
            res.status(200).json(caseData);
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

const getAllcases = async(req,res)=>{
    try{
        const query = {};
        const {status,priority} = req.query;
        if(status){
            query.status = status;
            }
        if(priority){
            query.priority = priority;
            }

        const caseData = await CaseSchema.find(query);
        if(!caseData){
            return res.status(404).json({message:"No cases found"});
            }
        res.status(200).json(caseData);
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

const updateCase = async(req,res)=>{
    try{
        const id = req.params.id;
        const data = req.body;
        const caseData = await CaseSchema.findByIdAndUpdate(id,data,{new:true});
        if(!caseData){
            return res.status(404).json({message:"Case not found"});
            }
        res.status(200).json(caseData);

    }catch(error){
        res.status(500).json({message:error.message})
        }
}

const deleteCase = async(req,res)=>{
    try{
        const id = req.params.id;
        const caseData = await CaseSchema.findByIdAndDelete(id);
        if(!caseData){
            return res.status(404).json({message:"Case not found"});
            }
            res.status(200).json({message:"Case deleted successfully"});
        }catch(error){
            res.status(500).json({message:error.message})
        }
}

module.exports = {createCase,getAllcases,getCaseById,updateCase,deleteCase};
