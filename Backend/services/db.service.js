const dbConfig = require('../config/database.config.js');
const loggerService = require('./logger.service.js');
var Connection = require('tedious').Connection;  
var Request = require('tedious').Request;  


const initializeAsync = async() => {
    return new Promise(function(resolve, reject){
        connectAsync().then((conn) => {
            conn.close();
            resolve();
        }, (err) => {
            reject(err);
        })
    });
}

const connectAsync = async() => {
    return new Promise(function(resolve, reject){
        let config = getConfig();
        let connection = new Connection(config);
        connection.connect(function(err){
            if (err !== undefined){
                loggerService.logError("Connection to the database failed!");
                reject(err);
                return;
            }
    
            loggerService.logInfo("Connection to the database was successful!");
            resolve(connection);
        });
    })
}

const getConfig = () => {
    var config = {  
        server: dbConfig.host,
        authentication: {
            type: 'default',
            options: {
                userName: dbConfig.user, 
                password: dbConfig.pwd 
            }
        },
        options: {
            encrypt: false,
            database: dbConfig.database 
        }
    }; 

    return config;
}

module.exports = {
    initializeAsync,
    connectAsync
}