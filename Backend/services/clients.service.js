const loggerService = require('./logger.service.js');
const dbService = require('./db.service.js');
const Client = require("../models/client.model.js");
const { ensureNotNullOrUndefined } = require('./helper.service.js');
var Connection = require('tedious').Connection;  
var Request = require('tedious').Request;  
var TYPES = require('tedious').TYPES;  


const insertClientAsync = async function(client){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(client, "The parameter 'client' was null or undefined!");
            if (!(client instanceof Client)){
                throw new Error(`Invalid data type of 'client' detected!`)
            }

            let query = "INSERT INTO [Client] (Name, Street, City, Country, PostalCode, UserId)" +
            "values (@Name, @Street, @City, @Country, @PostalCode, @UserId);";

            let request = new Request(query, function(err){
                if (err){
                    loggerService.logError(`The query '${query}' failed!`);
                    reject(err);
                    return;
                }
            });

            request.addParameter('Name', TYPES.VarChar, client.name);  
            request.addParameter('Street', TYPES.VarChar , client.street);  
            request.addParameter('City', TYPES.VarChar, client.city);  
            request.addParameter('PostalCode', TYPES.VarChar, client.postalCode); 
            request.addParameter('Country', TYPES.VarChar, client.country);
            request.addParameter('UserId', TYPES.BigInt, client.userId); 
            
            request.on("requestCompleted", function (rowCount, more) {
                loggerService.logInfo(`The query '${query}' was completed!`);
                connection.close();
                resolve();
            });

            connection.execSql(request);  
        }).catch((error) => {
            loggerService.logError("Some error occurred during the query execution!");
            reject(error);
        })
    });
}

const updateClientAsync = async function(clientId, client){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(clientId, "The parameter 'clientId' was null or undefined!");
            ensureNotNullOrUndefined(client, "The parameter 'client' was null or undefined!");

            if (!(client instanceof Client)){
                throw new Error(`Invalid data type of 'client' detected!`);
            }

            if (client.id != clientId){
                throw new Error('The client IDs must match!');
            }

            let query = "UPDATE [Client] SET Name = @Name, Street = @Street, Country = @Country, City = @City, PostalCode = @PostalCode WHERE Id = @ClientId;";

            let request = new Request(query, function(err){
                if (err){
                    loggerService.logError(`The query '${query}' failed!`);
                    reject(err);
                    return;
                }
            });

            request.addParameter('Name', TYPES.VarChar, client.name);  
            request.addParameter('Street', TYPES.VarChar , client.street);  
            request.addParameter('City', TYPES.VarChar, client.city);  
            request.addParameter('PostalCode', TYPES.VarChar, client.postalCode);  
            request.addParameter('Country', TYPES.VarChar, client.country);
            request.addParameter('ClientId', TYPES.BigInt, clientId); 
            
            request.on("requestCompleted", function (rowCount, more) {
                loggerService.logInfo(`The query '${query}' was completed!`);
                connection.close();
                resolve();
            });

            connection.execSql(request);  
        }).catch((error) => {
            loggerService.logError("Some error occurred during the query execution!");
            reject(error);
        })
    });
}

const deleteClientAsync = async function(clientId){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(clientId, "The parameter 'clientId' was null or undefined!");

            let query = "DELETE FROM [Client] WHERE Id = @ClientId;";

            let request = new Request(query, function(err){
                if (err){
                    loggerService.logError(`The query '${query}' failed!`);
                    reject(err);
                    return;
                }
            });

            request.addParameter('ClientId', TYPES.BigInt, clientId); 
            
            request.on("requestCompleted", function (rowCount, more) {
                loggerService.logInfo(`The query '${query}' was completed!`);
                connection.close();
                resolve();
            });

            connection.execSql(request);  
        }).catch((error) => {
            loggerService.logError("Some error occurred during the query execution!");
            reject(error);
        })
    });
}

const deleteClientsForUserAsync = async function(userId){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(userId, "The parameter 'userId' was null or undefined!");

            let query = "DELETE FROM [Client] WHERE UserId = @UserId;";

            let request = new Request(query, function(err){
                if (err){
                    loggerService.logError(`The query '${query}' failed!`);
                    reject(err);
                    return;
                }
            });

            request.addParameter('UserId', TYPES.BigInt, userId); 
            
            request.on("requestCompleted", function (rowCount, more) {
                loggerService.logInfo(`The query '${query}' was completed!`);
                connection.close();
                resolve();
            });

            connection.execSql(request);  
        }).catch((error) => {
            loggerService.logError("Some error occurred during the query execution!");
            reject(error);
        })
    });
}

const getClientInformationAsync = async function(clientId){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(clientId, "The parameter 'clientId' was null or undefined!");

            let query = "SELECT * FROM [Client] WHERE Id = @ClientId;";

            let request = new Request(query, function(err){
                if (err){
                    loggerService.logError(`The query '${query}' failed!`);
                    reject(err);
                    return;
                }
            });

            let retrievedInfo = {};
            let client = {};

            request.on('row', function(columns) {  
                columns.forEach(function(column) {  
                    retrievedInfo[column.metadata.colName] = column.value;
                });  

                client = new Client(retrievedInfo["Id"], retrievedInfo["Name"], retrievedInfo["Street"],
                    retrievedInfo["City"], retrievedInfo["Country"], retrievedInfo["PostalCode"], retrievedInfo["UserId"]);
            }); 

            request.addParameter('ClientId', TYPES.BigInt, clientId); 
            
            request.on("requestCompleted", function (rowCount, more) {
                loggerService.logInfo(`The query '${query}' was completed!`);
                connection.close();
                resolve(client);
            });

            connection.execSql(request);  
        }).catch((error) => {
            loggerService.logError("Some error occurred during the query execution!");
            reject(error);
        })
    });
}

const getClientsByUserIdAsync = async function(userId){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(userId, "The parameter 'userId' was null or undefined!");

            let query = "SELECT * FROM [Client] WHERE UserId = @UserId;";

            let request = new Request(query, function(err){
                if (err){
                    loggerService.logError(`The query '${query}' failed!`);
                    reject(err);
                    return;
                }
            });

            let clients = [];

            request.on('row', function(columns) {     
                let retrievedInfo = {};
                columns.forEach(function(column) {  
                    retrievedInfo[column.metadata.colName] = column.value;
                });  

                let client = new Client(retrievedInfo["Id"], retrievedInfo["Name"], retrievedInfo["Street"],
                    retrievedInfo["City"], retrievedInfo["Country"], retrievedInfo["PostalCode"], retrievedInfo["UserId"]);
                clients.push(client);
            }); 

            request.addParameter('UserId', TYPES.BigInt, userId); 
            
            request.on("requestCompleted", function (rowCount, more) {
                loggerService.logInfo(`The query '${query}' was completed!`);
                connection.close();
                resolve(clients);
            });

            connection.execSql(request);  
        }).catch((error) => {
            loggerService.logError("Some error occurred during the query execution!");
            reject(error);
        })
    });
 }

const searchClientsAsync = async function(searchPattern){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(searchPattern, "The parameter 'searchPattern' was null or undefined!");

            if (typeof searchPattern !== "string"){
                reject("The parameter 'searchPattern' must be a string!");
                return;
            }

            let patternModified = searchPattern.toLowerCase().replace(' ', '');
            let likeExpression = `%${patternModified}%`;

            let query = "select * FROM [Client] "+
            "WHERE dbo.RemoveCharacter(LOWER(Name), ' ') LIKE @SearchPattern "+
            "ORDER BY dbo.RemoveCharacter(LOWER(Name), ' ') ASC;"; 

            let request = new Request(query, function(err){
                if (err){
                    loggerService.logError(`The query '${query}' failed!`);
                    reject(err);
                    return;
                }
            });

            let clients = [];

            request.on('row', function(columns) {     
                let retrievedInfo = {};
                columns.forEach(function(column) {  
                    retrievedInfo[column.metadata.colName] = column.value;
                });  

                let client = new Client(retrievedInfo["Id"], retrievedInfo["Name"], retrievedInfo["Street"],
                    retrievedInfo["City"], retrievedInfo["Country"], retrievedInfo["PostalCode"], retrievedInfo["UserId"]);
                clients.push(client);
            }); 

            request.addParameter('SearchPattern', TYPES.VarChar, likeExpression); 

            request.on("requestCompleted", function (rowCount, more) {
                loggerService.logInfo(`The query '${query}' was completed!`);
                connection.close();
                resolve(clients);
            });

            connection.execSql(request);  
        }).catch((error) => {
            loggerService.logError("Some error occurred during the query execution!");
            reject(error);
        })
    });
}


module.exports = {
    insertClientAsync,
    updateClientAsync,
    deleteClientAsync,
    deleteClientsForUserAsync,
    getClientInformationAsync,
    getClientsByUserIdAsync,
    searchClientsAsync
}