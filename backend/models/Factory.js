const {v4 : uuidv4} = require('uuid');

class Factory{
    constructor(name,chocolates,workingHours,status,locationId,logo,rating,deleted)
    {
        this.id = uuidv4();
        this.name=name;
        this.chocolates=chocolates;
        this.workingHours=workingHours;
        this.status=status;
        this.locationId=locationId;
        this.logo=logo;
        this.rating=rating;
        this.deleted = deleted;
    }
}

module.exports = Factory;