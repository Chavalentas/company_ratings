const loggerService = require('./logger.service.js');
const dbService = require('./db.service.js');
const User = require("../models/user.model.js");
const { ensureNotNullOrUndefined } = require('./helper.service.js');
var Connection = require('tedious').Connection;  
var Request = require('tedious').Request;  
var TYPES = require('tedious').TYPES;  


const insertUserAsync = async function(user){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(user, "The parameter 'user' was null or undefined!");
            if (!(user instanceof User)){
                throw new Error(`Invalid data type of 'user' detected!`)
            }

            let query = "INSERT INTO [User] (UserName, Password, FirstName, LastName)" +
            "values (@UserName, @Password, @FirstName, @LastName);";

            let request = new Request(query, function(err){
                if (err){
                    loggerService.logError(`The query '${query}' failed!`);
                    reject(err);
                    return;
                }
            });

            request.addParameter('FirstName', TYPES.VarChar, user.firstName);  
            request.addParameter('LastName', TYPES.VarChar , user.lastName);  
            request.addParameter('UserName', TYPES.VarChar, user.userName);  
            request.addParameter('Password', TYPES.VarChar, user.password); 
            
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

const loginUserAsync = async function(userName){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(userName, "The parameter 'userName' was null or undefined!");
    
            let query = "SELECT Id FROM [User] WHERE UserName = @UserName;";
    
            let request = new Request(query, function(err){
                if (err){
                    loggerService.logError(`The query '${query}' failed!`);
                    reject(err);
                    return;
                }
            });

            request.addParameter('UserName', TYPES.VarChar, userName);  
            let userId = 0;
            let retrievedInfo = {}


            request.on('row', function(columns) {  
                columns.forEach(function(column) {  
                    retrievedInfo[column.metadata.colName] = column.value;
                });  

                userId = retrievedInfo["Id"];
            });  


            request.on("requestCompleted", function (rowCount, more) {
                loggerService.logInfo(`The query '${query}' was completed!`);
                connection.close();
                resolve(userId);
            });

            connection.execSql(request);
        }).catch((error) => {
            loggerService.logError("Some error occurred during the query execution!");
            reject(error);
        });
    });
}

const updateUserAsync = async function(userId, user){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(userId, "The parameter 'userId' was null or undefined!");
            ensureNotNullOrUndefined(user, "The parameter 'user' was null or undefined!");

            if (!(user instanceof User)){
                throw new Error(`Invalid data type of 'user' detected!`);
            }

            if (user.id != userId){
                throw new Error('The user IDs must match!');
            }

            let query = "UPDATE [User] SET FirstName = @FirstName, LastName = @LastName, UserName = @UserName WHERE Id = @UserId;";

            let request = new Request(query, function(err){
                if (err){
                    loggerService.logError(`The query '${query}' failed!`);
                    reject(err);
                    return;
                }
            });

            request.addParameter('FirstName', TYPES.VarChar, user.firstName);  
            request.addParameter('LastName', TYPES.VarChar , user.lastName);  
            request.addParameter('UserName', TYPES.VarChar, user.userName);  
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

const updatePasswordAsync = async function(userId, newPassword){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(userId, "The parameter 'userId' was null or undefined!");
            ensureNotNullOrUndefined(newPassword, "The parameter 'newPassword' was null or undefined!");

            let query = "UPDATE [User] SET Password = @Password WHERE Id = @UserId;";

            let request = new Request(query, function(err){
                if (err){
                    loggerService.logError(`The query '${query}' failed!`);
                    reject(err);
                    return;
                }
            });

            request.addParameter('Password', TYPES.VarChar, newPassword);   
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

const deleteUserAsync = async function(userId){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(userId, "The parameter 'userId' was null or undefined!");

            let query = "DELETE FROM [User] WHERE Id = @UserId;";

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

const getUserInformationAsync = async function(userId){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(userId, "The parameter 'userId' was null or undefined!");

            let query = "SELECT * FROM [User] WHERE Id = @UserId;";

            let request = new Request(query, function(err){
                if (err){
                    loggerService.logError(`The query '${query}' failed!`);
                    reject(err);
                    return;
                }
            });

            let retrievedInfo = {};
            let user = {};

            request.on('row', function(columns) {  
                columns.forEach(function(column) {  
                    retrievedInfo[column.metadata.colName] = column.value;
                });  

                user = new User(retrievedInfo["Id"], retrievedInfo["UserName"], retrievedInfo["Password"], retrievedInfo["FirstName"],
                    retrievedInfo["LastName"]);
            }); 

            request.addParameter('UserId', TYPES.BigInt, userId); 
            
            request.on("requestCompleted", function (rowCount, more) {
                loggerService.logInfo(`The query '${query}' was completed!`);
                connection.close();
                resolve(user);
            });

            connection.execSql(request);  
        }).catch((error) => {
            loggerService.logError("Some error occurred during the query execution!");
            reject(error);
        })
    });
}

 const getUserByUsernameAsync = async function(username){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(username, "The parameter 'username' was null or undefined!");

            let query = "SELECT * FROM [User] WHERE UserName = @UserName;";

            let request = new Request(query, function(err){
                if (err){
                    loggerService.logError(`The query '${query}' failed!`);
                    reject(err);
                    return;
                }
            });

            let users = [];

            request.on('row', function(columns) {     
                let retrievedInfo = {};
                columns.forEach(function(column) {  
                    retrievedInfo[column.metadata.colName] = column.value;
                });  

                let user = new User(retrievedInfo["Id"], retrievedInfo["UserName"], retrievedInfo["Password"], retrievedInfo["FirstName"],
                    retrievedInfo["LastName"]);
                users.push(user);
            }); 

            request.addParameter('UserName', TYPES.VarChar, username); 
            
            request.on("requestCompleted", function (rowCount, more) {
                loggerService.logInfo(`The query '${query}' was completed!`);
                connection.close();
                resolve(users);
            });

            connection.execSql(request);  
        }).catch((error) => {
            loggerService.logError("Some error occurred during the query execution!");
            reject(error);
        })
    });
 }

module.exports = {
    insertUserAsync,
    loginUserAsync,
    updateUserAsync,
    updatePasswordAsync,
    deleteUserAsync,
    getUserInformationAsync,
    getUserByUsernameAsync
}