const express = require('express')
const router = express.Router()
const {checkAuth,isAdmin,isOfficer} = require('../middlewares/auth.middleware')
const {createCase,getAllcases,getCaseById,updateCase,deleteCase} = require('../controllers/case.controller')

router.post('/',checkAuth,isAdmin,createCase);
router.get('/',checkAuth,isAdmin,getAllcases);
router.get('/:id',checkAuth,isOfficer,getCaseById);
router.put('/:id',checkAuth,isAdmin,updateCase);
router.delete('/:id',checkAuth,isAdmin,deleteCase);

module.exports = router;  