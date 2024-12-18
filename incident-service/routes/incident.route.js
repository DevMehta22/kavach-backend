const express = require('express')
const {reportIncident,getAllIncidents,getIncidentsByCid,getIncidentById,updateIncident,deleteIncident} = require("../controllers/incident.controller")
const {checkAuth,isCivilian,isAdmin} = require("../middlewares/auth.middleware")

const router = express.Router()
router.post('/:cid',checkAuth,isCivilian,reportIncident);
router.get('/',checkAuth,isAdmin,getAllIncidents);
router.get('/all/:cid',checkAuth,isCivilian,getIncidentsByCid);
router.get('/:id',checkAuth,isCivilian,getIncidentById);
router.put('/:id',checkAuth,isCivilian,updateIncident);
router.delete('/:id',checkAuth,isCivilian,deleteIncident);

module.exports = router;