 const {v4 : uuidv4} = require('uuid');

class Location
{
    constructor(longitude,latitude,address,deleted)
    {
        this.id = uuidv4();
        this.longitude = longitude;
        this.latitude = latitude;
        this.address = address;
        this.deleted = deleted;
    }
}
module.exports = Location;