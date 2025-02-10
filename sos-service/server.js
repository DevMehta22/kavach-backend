require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const http = require('http');
const { sosSocketHandler } = require('./services/socket.service');
const sosroutes = require('./routes/sos.route')

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use('/api', sosroutes);


mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
    const port = process.env.PORT || 3004;

    const server = http.Server(app);
    const io = require('socket.io')(server);
    sosSocketHandler(io);
    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((err) => {
    console.log(err);
});