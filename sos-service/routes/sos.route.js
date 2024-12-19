const express = require('express')
const {createSosRequest,getAllSos} = require('../controllers/sos.controller')
const {checkAuth,isAdmin} = require("../middlewares/auth.middleware")

const router = express.Router()

router.post('/request/:id',checkAuth,createSosRequest)
router.get('/requests',checkAuth,isAdmin,getAllSos)

module.exports = router