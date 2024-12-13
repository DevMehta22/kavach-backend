const express = require('express')
const {createProfile,updateProfile,getProfileById,getOfficers,deleteProfile} = require('../controllers/officer.controller')
const {checkAuth,isOfficer,isAdmin} = require('../middlewares/auth.middleware')

const router = express.Router()
router.post('/',checkAuth,isOfficer,createProfile);
router.put('/:id',checkAuth,isOfficer,updateProfile);
router.get('/',checkAuth,isAdmin,getOfficers);
router.get('/:id',checkAuth,isOfficer,getProfileById);
router.delete('/:id',checkAuth,isOfficer,deleteProfile);

module.exports = router; 