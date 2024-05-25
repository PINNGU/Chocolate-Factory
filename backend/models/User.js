class User{
    
    Role = {
        CUSTOMER : "CUSTOMER",
        WORKER : "WORKER",
        MANAGER : "MANAGER",
        ADMIN : "ADMIN"
    }

    Gender = {
        MALE : "MALE",
        FEMALE : "FEMALE"
    }

    constructor(username,password,name,surname,gender,
        dateOfBirth,role,purchases,cart,chocolateFactory,points,customerType){

        this.id = uuidv4();
        this.username = username;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;

        if(role == "CUSTOMER")
            this.role = this.Role.CUSTOMER;
        else if(role == "WORKER")
            this.role = this.Role.WORKER;
        else if(role == "MANAGER")
            this.role = this.Role.MANAGER;
        else if(role == "ADMIN")
            this.role = this.Role.ADMIN;
        
        this.purchases = purchases;
        this.cart = cart;
        this.chocolateFactory = chocolateFactory;
        this.points = points;
        this.customerType = customerType;

        
    }

}

module.exports = User;