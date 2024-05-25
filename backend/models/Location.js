class Location
{
    constructor(longitude,latitude,adress)
    {
        this.id = uuidv4();
        this.longitude = longitude;
        this.latitude = latitude;
        this.adress = adress;
    }
}
module.exports = Location;