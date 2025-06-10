const loggerService = require('./logger.service.js');
const dbService = require('./db.service.js');
const { ensureNotNullOrUndefined } = require('./helper.service.js');
const NumberRangeRating = require('../models/numberrangerating.model.js');
const FloatRangeRating = require('../models/floatrangerating.model.js');
const TextValueRating = require('../models/textvaluerating.model.js');
const CommentRating = require('../models/commentrating.model.js');
const TextValueRatingExtended = require('../models/textvalueratingextended.model.js');
const CommentRatingExtended = require('../models/commentratingextended.model.js');
const FloatRangeRatingExtended = require('../models/floatrangeratingextended.model.js');
const NumberRangeRatingExtended = require('../models/numberrangeratingextended.model.js');
const DocumentRating = require('../models/documentrating.model.js');
const DocumentRatingExtended = require('../models/documentratingextended.model.js');
const TextValueInt = require('../models/textvalueint.model.js');
var Connection = require('tedious').Connection;  
var Request = require('tedious').Request; 
var TYPES = require('tedious').TYPES;  


const insertNumberRangeRatingAsync = async function(numberRangeRating){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(numberRangeRating, "The parameter 'numberRangeRating' was null or undefined!");
            if (!(numberRangeRating instanceof NumberRangeRating)){
                throw new Error(`Invalid data type of 'numberRangeRating' detected!`)
            }

            let query = "EXEC CreateNumberRangeRating @UserId, @CriterionId, @DateOfRating, @RatingValue;";

            let request = new Request(query, function(err){
                if (err){
                    loggerService.logError(`The query '${query}' failed!`);
                    reject(err);
                    return;
                }
            });

            request.addParameter('UserId', TYPES.BigInt, numberRangeRating.userId);  
            request.addParameter('CriterionId', TYPES.BigInt, numberRangeRating.ratingCriterionId);  
            request.addParameter('DateOfRating', TYPES.DateTime, numberRangeRating.dateOfRating); 
            request.addParameter('RatingValue', TYPES.BigInt, numberRangeRating.ratingValue); 
            
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

const insertFloatRangeRatingAsync = async function(floatRangeRating){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(floatRangeRating, "The parameter 'floatRangeRating' was null or undefined!");
            if (!(floatRangeRating instanceof FloatRangeRating)){
                throw new Error(`Invalid data type of 'floatRangeRating' detected!`)
            }

            let query = "EXEC CreateFloatRangeRating @UserId, @CriterionId, @DateOfRating, @RatingValue;";

            let request = new Request(query, function(err){
                if (err){
                    loggerService.logError(`The query '${query}' failed!`);
                    reject(err);
                    return;
                }
            });

            request.addParameter('UserId', TYPES.BigInt, floatRangeRating.userId);  
            request.addParameter('CriterionId', TYPES.BigInt, floatRangeRating.ratingCriterionId);  
            request.addParameter('DateOfRating', TYPES.DateTime, floatRangeRating.dateOfRating); 
            request.addParameter('RatingValue', TYPES.Float, floatRangeRating.ratingValue); 
            
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

const insertTextValueRatingAsync = async function(textValueRating){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(textValueRating, "The parameter 'textValueRating' was null or undefined!");
            if (!(textValueRating instanceof TextValueRating)){
                throw new Error(`Invalid data type of 'textValueRating' detected!`)
            }

            let query = "EXEC CreateTextValueRating @UserId, @CriterionId, @DateOfRating, @RatingValue;";

            let request = new Request(query, function(err){
                if (err){
                    loggerService.logError(`The query '${query}' failed!`);
                    reject(err);
                    return;
                }
            });

            request.addParameter('UserId', TYPES.BigInt, textValueRating.userId);  
            request.addParameter('CriterionId', TYPES.BigInt, textValueRating.ratingCriterionId);  
            request.addParameter('DateOfRating', TYPES.DateTime, textValueRating.dateOfRating); 
            request.addParameter('RatingValue', TYPES.BigInt, textValueRating.textValueInt); 
            
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

const insertCommentRatingAsync = async function(commentRating){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(commentRating, "The parameter 'commentRating' was null or undefined!");
            if (!(commentRating instanceof CommentRating)){
                throw new Error(`Invalid data type of 'commentRating' detected!`)
            }

            let query = "EXEC CreateNewCommentRating @UserId, @CriterionId, @DateOfRating, @Comment;";

            let request = new Request(query, function(err){
                if (err){
                    loggerService.logError(`The query '${query}' failed!`);
                    reject(err);
                    return;
                }
            });

            request.addParameter('UserId', TYPES.BigInt, commentRating.userId);  
            request.addParameter('CriterionId', TYPES.BigInt, commentRating.ratingCriterionId);  
            request.addParameter('DateOfRating', TYPES.DateTime, commentRating.dateOfRating); 
            request.addParameter('Comment', TYPES.VarChar, commentRating.comment); 
            
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

const insertDocumentRatingAsync = async function(documentRating){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(documentRating, "The parameter 'documentRating' was null or undefined!");
            if (!(documentRating instanceof DocumentRating)){
                throw new Error(`Invalid data type of 'documentRating' detected!`)
            }

            let query = "EXEC CreateNewDocumentRating @UserId, @CriterionId, @DateOfRating, @DocumentName, @DocumentData;";

            let request = new Request(query, function(err){
                if (err){
                    loggerService.logError(`The query '${query}' failed!`);
                    reject(err);
                    return;
                }
            });

            request.addParameter('UserId', TYPES.BigInt, documentRating.userId);  
            request.addParameter('CriterionId', TYPES.BigInt, documentRating.ratingCriterionId);  
            request.addParameter('DateOfRating', TYPES.DateTime, documentRating.dateOfRating); 
            request.addParameter('DocumentName', TYPES.VarChar, documentRating.documentName); 
            request.addParameter('DocumentData', TYPES.VarBinary, documentRating.documentData);
            
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

const deleteRatingAsync = async function(ratingId){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(ratingId, "The parameter 'ratingId' was null or undefined!");

            let query = "DELETE FROM [Rating] WHERE Id = @RatingId;";

            let request = new Request(query, function(err){
                if (err){
                    loggerService.logError(`The query '${query}' failed!`);
                    reject(err);
                    return;
                }
            });

            request.addParameter('RatingId', TYPES.BigInt, ratingId); 
            
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

const deleteRatingsForUserAsync = async function(userId){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(userId, "The parameter 'userId' was null or undefined!");

            let query = "DELETE FROM [Rating] WHERE UserId = @UserId;";

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

const deleteRatingsFoClientAsync = async function(clientId){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(clientId, "The parameter 'clientId' was null or undefined!");

            let query = "DELETE FROM [Rating] WHERE Id IN (SELECT r.Id FROM [Rating] r " + 
            "LEFT OUTER JOIN [RatingCriterion] rc " + 
            "ON r.RatingCriterionId = rc.Id " + 
            "WHERE rc.ClientId = @ClientId)";

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

const getNumberRangeRatingsByClientIdAsync = async function(clientId){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(clientId, "The parameter 'clientId' was null or undefined!");

            let query = "SELECT nr.* FROM [NumberRangeRatingsView] nr " +
            "LEFT OUTER JOIN [RatingCriterion] rc " +
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

                let rating = new NumberRangeRating(retrievedInfo["Id"], retrievedInfo["UserId"], retrievedInfo["RatingCriterionId"],
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

            let query = "SELECT fr.* FROM [FloatRangeRatingsView] fr " +
            "LEFT OUTER JOIN [RatingCriterion] rc " +
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

                let rating = new FloatRangeRating(retrievedInfo["Id"], retrievedInfo["UserId"], retrievedInfo["RatingCriterionId"],
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

            let query = "SELECT tv.* FROM [TextValueRatingsView] tv " +
            "LEFT OUTER JOIN [RatingCriterion] rc " +
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

                let rating = new TextValueRating(retrievedInfo["Id"], retrievedInfo["UserId"], retrievedInfo["RatingCriterionId"],
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

            let query = "SELECT cr.* FROM [CommentRatingsView] cr " +
            "LEFT OUTER JOIN [RatingCriterion] rc " +
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

                let rating = new CommentRating(retrievedInfo["Id"], retrievedInfo["UserId"], retrievedInfo["RatingCriterionId"],
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

            let query = "SELECT dr.* FROM [DocumentRatingsView] dr " +
            "LEFT OUTER JOIN [RatingCriterion] rc " +
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

                let rating = new DocumentRating(retrievedInfo["Id"], retrievedInfo["UserId"], retrievedInfo["RatingCriterionId"],
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

const getAllNumericRatingsByCriterionIdExtendedAsync = async function(criterionId){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(criterionId, "The parameter 'criterionId' was null or undefined!");

            let query = "EXEC GetAllNumericRatingsForCriterionExtended @CriterionId;";

            let request = new Request(query, function(err){
                if (err){
                    loggerService.logError(`The query '${query}' failed!`);
                    reject(err);
                    return;
                }
            });

            let numericRatings = [];

            request.on('row', function(columns) {     
                let retrievedInfo = {};
                columns.forEach(function(column) {  
                    retrievedInfo[column.metadata.colName] = column.value;
                });  

                let rating = new NumberRangeRatingExtended(retrievedInfo["Id"], retrievedInfo["UserId"], retrievedInfo["UserName"], retrievedInfo["RatingCriterionId"],
                    retrievedInfo["DateOfRating"], retrievedInfo["RatingValue"]);
                numericRatings.push(rating);
            }); 

            request.addParameter('CriterionId', TYPES.BigInt, criterionId);

            request.on("requestCompleted", function (rowCount, more) {
                loggerService.logInfo(`The query '${query}' was completed!`);
                connection.close();
                resolve(numericRatings);
            });

            connection.execSql(request);  
        }).catch((error) => {
            loggerService.logError("Some error occurred during the query execution!");
            reject(error);
        })
    })
}

const getAllNumericRatingsAverageByCriterionIdExtendedAsync = async function(criterionId){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(criterionId, "The parameter 'criterionId' was null or undefined!");

            let query = "EXEC GetAllNumericRatingsAverageForCriterionIdExtended @CriterionId;";

            let request = new Request(query, function(err){
                if (err){
                    loggerService.logError(`The query '${query}' failed!`);
                    reject(err);
                    return;
                }
            });

            let average = 0;

            request.on('row', function(columns) {     
                columns.forEach(function(column) {  
                    average = column.value;
                });  
            }); 

            request.addParameter('CriterionId', TYPES.BigInt, criterionId);

            request.on("requestCompleted", function (rowCount, more) {
                loggerService.logInfo(`The query '${query}' was completed!`);
                connection.close();
                resolve(average);
            });

            connection.execSql(request);  
        }).catch((error) => {
            loggerService.logError("Some error occurred during the query execution!");
            reject(error);
        })
    })
}

const getAllFloatRatingsByCriterionIdExtendedAsync = async function(criterionId){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(criterionId, "The parameter 'criterionId' was null or undefined!");

            let query = "EXEC GetAllFloatRatingsForCriterionExtended @CriterionId;";

            let request = new Request(query, function(err){
                if (err){
                    loggerService.logError(`The query '${query}' failed!`);
                    reject(err);
                    return;
                }
            });

            let floatRatings = [];

            request.on('row', function(columns) {     
                let retrievedInfo = {};
                columns.forEach(function(column) {  
                    retrievedInfo[column.metadata.colName] = column.value;
                });  

                let rating = new FloatRangeRatingExtended(retrievedInfo["Id"], retrievedInfo["UserId"], retrievedInfo["UserName"], retrievedInfo["RatingCriterionId"],
                    retrievedInfo["DateOfRating"], retrievedInfo["RatingValue"]);
                    floatRatings.push(rating);
            }); 

            request.addParameter('CriterionId', TYPES.BigInt, criterionId);
            
            request.on("requestCompleted", function (rowCount, more) {
                loggerService.logInfo(`The query '${query}' was completed!`);
                connection.close();
                resolve(floatRatings);
            });

            connection.execSql(request);  
        }).catch((error) => {
            loggerService.logError("Some error occurred during the query execution!");
            reject(error);
        })
    })
}

const getAllFloatRatingsAverageByCriterionIdExtendedAsync = async function(criterionId){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(criterionId, "The parameter 'criterionId' was null or undefined!");

            let query = "EXEC GetAllFloatRatingsAverageForCriterionIdExtended @CriterionId;";

            let request = new Request(query, function(err){
                if (err){
                    loggerService.logError(`The query '${query}' failed!`);
                    reject(err);
                    return;
                }
            });

            let average = 0;

            request.on('row', function(columns) {     
                columns.forEach(function(column) {  
                    average = column.value;
                });  
            }); 

            request.addParameter('CriterionId', TYPES.BigInt, criterionId);

            request.on("requestCompleted", function (rowCount, more) {
                loggerService.logInfo(`The query '${query}' was completed!`);
                connection.close();
                resolve(average);
            });

            connection.execSql(request);  
        }).catch((error) => {
            loggerService.logError("Some error occurred during the query execution!");
            reject(error);
        })
    })
}

const getAllCommentRatingsByCriterionIdExtendedAsync = async function(criterionId){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(criterionId, "The parameter 'criterionId' was null or undefined!");

            let query = "EXEC GetAllCommentRatingsForCriterionExtended @CriterionId;";

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

                let rating = new CommentRatingExtended(retrievedInfo["Id"], retrievedInfo["UserId"], retrievedInfo["UserName"], retrievedInfo["RatingCriterionId"],
                    retrievedInfo["DateOfRating"], retrievedInfo["Comment"]);
                    commentRatings.push(rating);
            }); 

            request.addParameter('CriterionId', TYPES.BigInt, criterionId);
            
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
    })
}

const getAllDocumentRatingsByCriterionIdExtendedAsync = async function(criterionId, offset, rowSize){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(criterionId, "The parameter 'criterionId' was null or undefined!");

            let query = "EXEC GetAllDocumentRatingsForCriterionExtended @CriterionId;";

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

                let rating = new DocumentRatingExtended(retrievedInfo["Id"], retrievedInfo["UserId"], retrievedInfo["UserName"], retrievedInfo["RatingCriterionId"],
                    retrievedInfo["DateOfRating"], retrievedInfo["DocumentName"], retrievedInfo["DocumentData"]);
                    documentRatings.push(rating);
            }); 

            request.addParameter('CriterionId', TYPES.BigInt, criterionId);
            
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
    })
}

const getAllTextRatingsByCriterionIdExtendedAsync = async function(criterionId){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(criterionId, "The parameter 'criterionId' was null or undefined!");

            let query = "EXEC GetAllTextRatingsForCriterionExtended @CriterionId;";

            let request = new Request(query, function(err){
                if (err){
                    loggerService.logError(`The query '${query}' failed!`);
                    reject(err);
                    return;
                }
            });

            let textRatings = [];

            request.on('row', function(columns) {     
                let retrievedInfo = {};
                columns.forEach(function(column) {  
                    retrievedInfo[column.metadata.colName] = column.value;
                });  

                let rating = new TextValueRatingExtended(retrievedInfo["Id"], retrievedInfo["UserId"], retrievedInfo["UserName"], retrievedInfo["RatingCriterionId"],
                    retrievedInfo["DateOfRating"], retrievedInfo["TextValueInt"]);
                    textRatings.push(rating);
            }); 

            request.addParameter('CriterionId', TYPES.BigInt, criterionId);
            
            request.on("requestCompleted", function (rowCount, more) {
                loggerService.logInfo(`The query '${query}' was completed!`);
                connection.close();
                resolve(textRatings);
            });

            connection.execSql(request);  
        }).catch((error) => {
            loggerService.logError("Some error occurred during the query execution!");
            reject(error);
        })
    })
}

const getMostCommonTextRatingFromAllByCriterionIdExtendedAsync = async function(criterionId){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(criterionId, "The parameter 'criterionId' was null or undefined!");

            let query = "EXEC GetAllTextRatingsMostCommonValueForCriterionIdExtended @CriterionId;";

            let request = new Request(query, function(err){
                if (err){
                    loggerService.logError(`The query '${query}' failed!`);
                    reject(err);
                    return;
                }
            });

            let result = new TextValueInt("", 0);

            request.on('row', function(columns) {     
                let retrievedInfo = {};
                columns.forEach(function(column) {  
                    retrievedInfo[column.metadata.colName] = column.value;
                });  

                result = new TextValueInt(retrievedInfo["ValueText"], retrievedInfo["ValueInt"]);
            }); 

            request.addParameter('CriterionId', TYPES.BigInt, criterionId);
            
            request.on("requestCompleted", function (rowCount, more) {
                loggerService.logInfo(`The query '${query}' was completed!`);
                connection.close();
                resolve(result);
            });

            connection.execSql(request);  
        }).catch((error) => {
            loggerService.logError("Some error occurred during the query execution!");
            reject(error);
        })
    })
}

module.exports = {
    insertNumberRangeRatingAsync,
    insertFloatRangeRatingAsync,
    insertTextValueRatingAsync,
    insertCommentRatingAsync,
    insertDocumentRatingAsync,
    deleteRatingAsync,
    deleteRatingsForUserAsync,
    deleteRatingsFoClientAsync,
    getNumberRangeRatingsByClientIdAsync,
    getFloatRangeRatingsByClientIdAsync,
    getTextValueRatingsByClientIdAsync,
    getCommentRatingsByClientIdAsync,
    getDocumentRatingsByClientIdAsync,
    getAllNumericRatingsByCriterionIdExtendedAsync,
    getAllNumericRatingsAverageByCriterionIdExtendedAsync,
    getAllFloatRatingsByCriterionIdExtendedAsync,
    getAllFloatRatingsAverageByCriterionIdExtendedAsync,
    getAllCommentRatingsByCriterionIdExtendedAsync,
    getAllDocumentRatingsByCriterionIdExtendedAsync,
    getAllTextRatingsByCriterionIdExtendedAsync,
    getMostCommonTextRatingFromAllByCriterionIdExtendedAsync
}