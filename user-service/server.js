require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')

const app = express()
const routes = require('./routes/user.route')

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use('/auth', routes)

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('Connected to MongoDB')
    const port = process.env.PORT || 3000
    app.listen(port, (err) => {
        if (err) throw err;
        console.log(`Server is running on port ${port}`)
        })
}).catch((err) => {
    console.log(err)
    })  
