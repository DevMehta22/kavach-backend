const express = require('express')
const {createProfile,updateProfile,getCivilians,getProfileById,deleteProfile} = require('../controllers/civilian.controller')
const {checkAuth,isCivilian,isAdmin} = require('../middlewares/auth.middleware')

const router = express.Router()
router.post('/',checkAuth,isCivilian,createProfile);
router.put('/:id',checkAuth,isCivilian,updateProfile);
router.get('/',checkAuth,isAdmin,getCivilians);
router.get('/:id',checkAuth,isCivilian,getProfileById);
router.delete('/:id',checkAuth,isCivilian,deleteProfile);

module.exports = router; 