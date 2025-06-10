const loggerService = require('./logger.service.js');
const dbService = require('./db.service.js');
const { ensureNotNullOrUndefined } = require('./helper.service.js');
const NumberRangeRating = require('../models/numberrangerating.model.js');
const FloatRangeRating = require('../models/floatrangerating.model.js');
const TextValueRating = require('../models/textvaluerating.model.js');
const CommentRating = require('../models/commentrating.model.js');
const DocumentRating = require('../models/documentrating.model.js');
var Connection = require('tedious').Connection;  
var Request = require('tedious').Request; 
var TYPES = require('tedious').TYPES;  

const getNumberRangeRatingsByClientIdAsync = async function(clientId){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(clientId, "The parameter 'clientId' was null or undefined!");

            let query = "SELECT nr.* FROM DeletedNumberRangeRatingsView nr " +
            "LEFT OUTER JOIN RatingCriterion rc " +
            "ON rc.Id = nr.RatingCriterionId " + 
    	    "WHERE rc.ClientId = @ClientId";

            let request = new Request(query, function(err){
                if (err){
                    loggerService.logError(`The query '${query}' failed!`);
                    reject(err);
                    return;
                }
            });

            let numberRangeRatings = [];

            request.on('row', function(columns) {     
                let retrievedInfo = {};
                columns.forEach(function(column) {  
                    retrievedInfo[column.metadata.colName] = column.value;
                });  

                let rating = new NumberRangeRating(retrievedInfo["Id"], -1, retrievedInfo["RatingCriterionId"],
                    retrievedInfo["DateOfRating"], retrievedInfo["RatingValue"]);
                numberRangeRatings.push(rating);
            }); 

            request.addParameter('ClientId', TYPES.BigInt, clientId); 
            
            request.on("requestCompleted", function (rowCount, more) {
                loggerService.logInfo(`The query '${query}' was completed!`);
                connection.close();
                resolve(numberRangeRatings);
            });

            connection.execSql(request);  
        }).catch((error) => {
            loggerService.logError("Some error occurred during the query execution!");
            reject(error);
        })
    });
}

const getFloatRangeRatingsByClientIdAsync = async function(clientId){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(clientId, "The parameter 'clientId' was null or undefined!");

            let query = "SELECT fr.* FROM DeletedFloatRangeRatingsView fr " +
            "LEFT OUTER JOIN RatingCriterion rc " +
            "ON rc.Id = fr.RatingCriterionId " + 
    	    "WHERE rc.ClientId = @ClientId";

            let request = new Request(query, function(err){
                if (err){
                    loggerService.logError(`The query '${query}' failed!`);
                    reject(err);
                    return;
                }
            });

            let numberRangeRatings = [];

            request.on('row', function(columns) {     
                let retrievedInfo = {};
                columns.forEach(function(column) {  
                    retrievedInfo[column.metadata.colName] = column.value;
                });  

                let rating = new FloatRangeRating(retrievedInfo["Id"], -1, retrievedInfo["RatingCriterionId"],
                    retrievedInfo["DateOfRating"], retrievedInfo["RatingValue"]);
                numberRangeRatings.push(rating);
            }); 

            request.addParameter('ClientId', TYPES.BigInt, clientId); 
            
            request.on("requestCompleted", function (rowCount, more) {
                loggerService.logInfo(`The query '${query}' was completed!`);
                connection.close();
                resolve(numberRangeRatings);
            });

            connection.execSql(request);  
        }).catch((error) => {
            loggerService.logError("Some error occurred during the query execution!");
            reject(error);
        })
    });
}

const getTextValueRatingsByClientIdAsync = async function(clientId){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(clientId, "The parameter 'clientId' was null or undefined!");

            let query = "SELECT tv.* FROM DeletedTextValueRatingsView tv " +
            "LEFT OUTER JOIN RatingCriterion rc " +
            "ON rc.Id = tv.RatingCriterionId " + 
    	    "WHERE rc.ClientId = @ClientId";

            let request = new Request(query, function(err){
                if (err){
                    loggerService.logError(`The query '${query}' failed!`);
                    reject(err);
                    return;
                }
            });

            let textValueRatings = [];

            request.on('row', function(columns) {     
                let retrievedInfo = {};
                columns.forEach(function(column) {  
                    retrievedInfo[column.metadata.colName] = column.value;
                });  

                let rating = new TextValueRating(retrievedInfo["Id"], -1, retrievedInfo["RatingCriterionId"],
                    retrievedInfo["DateOfRating"], retrievedInfo["TextValueInt"]);
                textValueRatings.push(rating);
            }); 

            request.addParameter('ClientId', TYPES.BigInt, clientId); 
            
            request.on("requestCompleted", function (rowCount, more) {
                loggerService.logInfo(`The query '${query}' was completed!`);
                connection.close();
                resolve(textValueRatings);
            });

            connection.execSql(request);  
        }).catch((error) => {
            loggerService.logError("Some error occurred during the query execution!");
            reject(error);
        })
    });
}

const getCommentRatingsByClientIdAsync = async function(clientId){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(clientId, "The parameter 'clientId' was null or undefined!");

            let query = "SELECT cr.* FROM DeletedCommentRatingsView cr " +
            "LEFT OUTER JOIN RatingCriterion rc " +
            "ON rc.Id = cr.RatingCriterionId " + 
    	    "WHERE rc.ClientId = @ClientId";

            let request = new Request(query, function(err){
                if (err){
                    loggerService.logError(`The query '${query}' failed!`);
                    reject(err);
                    return;
                }
            });

            let commentRatings = [];

            request.on('row', function(columns) {     
                let retrievedInfo = {};
                columns.forEach(function(column) {  
                    retrievedInfo[column.metadata.colName] = column.value;
                });  

                let rating = new CommentRating(retrievedInfo["Id"], -1, retrievedInfo["RatingCriterionId"],
                    retrievedInfo["DateOfRating"], retrievedInfo["Comment"]);
                commentRatings.push(rating);
            }); 

            request.addParameter('ClientId', TYPES.BigInt, clientId); 
            
            request.on("requestCompleted", function (rowCount, more) {
                loggerService.logInfo(`The query '${query}' was completed!`);
                connection.close();
                resolve(commentRatings);
            });

            connection.execSql(request);  
        }).catch((error) => {
            loggerService.logError("Some error occurred during the query execution!");
            reject(error);
        })
    });
}

const getDocumentRatingsByClientIdAsync = async function(clientId){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(clientId, "The parameter 'clientId' was null or undefined!");

            let query = "SELECT cr.* FROM DeletedDocumentRatingsView dr " +
            "LEFT OUTER JOIN RatingCriterion rc " +
            "ON rc.Id = dr.RatingCriterionId " + 
    	    "WHERE rc.ClientId = @ClientId";

            let request = new Request(query, function(err){
                if (err){
                    loggerService.logError(`The query '${query}' failed!`);
                    reject(err);
                    return;
                }
            });

            let documentRatings = [];

            request.on('row', function(columns) {     
                let retrievedInfo = {};
                columns.forEach(function(column) {  
                    retrievedInfo[column.metadata.colName] = column.value;
                });  

                let rating = new DocumentRating(retrievedInfo["Id"], -1, retrievedInfo["RatingCriterionId"],
                    retrievedInfo["DateOfRating"], retrievedInfo["DocumentName"], retrievedInfo["DocumentData"]);
                    documentRatings.push(rating);
            }); 

            request.addParameter('ClientId', TYPES.BigInt, clientId); 
            
            request.on("requestCompleted", function (rowCount, more) {
                loggerService.logInfo(`The query '${query}' was completed!`);
                connection.close();
                resolve(documentRatings);
            });

            connection.execSql(request);  
        }).catch((error) => {
            loggerService.logError("Some error occurred during the query execution!");
            reject(error);
        })
    });
}


module.exports = {
    getNumberRangeRatingsByClientIdAsync,
    getFloatRangeRatingsByClientIdAsync,
    getTextValueRatingsByClientIdAsync,
    getCommentRatingsByClientIdAsync,
    getDocumentRatingsByClientIdAsync
}