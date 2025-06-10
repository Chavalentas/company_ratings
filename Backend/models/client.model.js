class Client{
    constructor(id, name, street, city, country, postalCode, userId){
        this.id = id;
        this.name = name;
        this.street = street;
        this.city = city;
        this.postalCode = postalCode;
        this.country = country;
        this.userId = userId;
    }
}

module.exports = Client;