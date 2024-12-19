const socket = require('socket.io')
const {calculateDistance} = require('./geoloc.service')

const sosSocketHandler = (io)=>{
    const officers = new Map();

    io.on('connection', (socket)=>{
        console.log('Client connected:',socket.id);
    
        socket.on('register-officer',({officerId,location}) => {
            if (!officerId || !location) {
                return socket.emit('error', { message: 'Invalid registration data.' });
            }
            officers.set(officerId,{socketId:socket.id, location});
            console.log('Officer registered:',officerId);
        })

        socket.on('update-location', ({ officerId, location }) => {
            if (officers.has(officerId)) {
                officers.get(officerId).location = location;
                console.log(`Officer ${officerId} updated location.`);
            }
        });

        socket.on('sos-request', ({ civilianId, location }) => {
            console.log(`SOS request from Civilian ${civilianId}.`);

            officers.forEach((officer, officerId) => {
                const distance = calculateDistance(location, officer.location);

                if (distance <= 10) {
                    io.to(officer.socketId).emit('sos-alert', {
                        civilianId,
                        location,
                        message: 'A nearby civilian needs help!',
                    });
                    console.log(`SOS alert sent to Officer ${officerId}.`);
                }
            });
        });

        socket.on('disconnect', () => {
            officers.forEach((officer, officerId) => {
                if (officer.socketId === socket.id) {
                    officers.delete(officerId);
                    console.log(`Officer ${officerId} disconnected.`);
                }
            });
        });
    })
}

module.exports = {sosSocketHandler}