const io = require('socket.io-client');
const socket = io('http://localhost:3004');  

socket.on('connect', () => {
    console.log('Connected to WebSocket server');
    
    const officers = [
        { officerId: 'officer123', location: { latitude: 28.7041, longitude: 77.1025 } },
        { officerId: 'officer124', location: { latitude: 28.7042, longitude: 77.1026 } },
        { officerId: 'officer125', location: { latitude: 51.7043, longitude: 0.1027 } },
        { officerId: 'officer126', location: { latitude: 28.7044, longitude: 77.1028 } }
    ];

    officers.forEach((officer) => {
        socket.emit('register-officer', { officerId: officer.officerId, location: officer.location });
    });

    socket.emit('update-location', { 
        officerId: 'officer123',
        location: { latitude: 28.7045, longitude: 77.1029 }
    });

    socket.on('sos-alert', (data) => {
        console.log('Received SOS Alert:', data);
    });

    socket.emit('sos-request', { 
        civilianId: 'civilian123', 
        location: { latitude: 28.7040, longitude: 77.1024 }
    });
});

socket.on('error', (data) => {
    console.log('Error:', data.message);
});