const geolib = require('geolib');

const calculateDistance = (location1, location2) => {
    return geolib.getDistance(location1, location2) / 1000; 
};

module.exports = { calculateDistance };