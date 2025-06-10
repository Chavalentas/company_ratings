const loggerService = require('./logger.service.js');
const dbService = require('./db.service.js');
const { ensureNotNullOrUndefined } = require('./helper.service.js');
const NumberRangeCriterion = require('../models/numberrangecriterion.model.js');
const FloatRangeCriterion = require('../models/floatrangecriterion.model.js');
const CommentCriterion = require('../models/commentcriterion.model.js');
const TextValueCriterion = require('../models/textvaluecriterion.model.js');
const DocumentCriterion = require('../models/documentcriterion.model.js');
var Connection = require('tedious').Connection;  
var Request = require('tedious').Request; 
var TYPES = require('tedious').TYPES;  

const insertNumberRangeCriterionAsync = async function(numberRangeCriterion){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(numberRangeCriterion, "The parameter 'numberRangeCriterion' was null or undefined!");
            if (!(numberRangeCriterion instanceof NumberRangeCriterion)){
                throw new Error(`Invalid data type of 'numberRangeCriterion' detected!`)
            }

            let query = "EXEC CreateNewNumberRangeCriterion @ClientId, @CriterionName, @MinValue, @MaxValue, @WorstValue, @BestValue;";

            let request = new Request(query, function(err){
                if (err){
                    loggerService.logError(`The query '${query}' failed!`);
                    reject(err);
                    return;
                }
            });

            request.addParameter('ClientId', TYPES.BigInt, numberRangeCriterion.clientId);  
            request.addParameter('CriterionName', TYPES.VarChar , numberRangeCriterion.criterionName);  
            request.addParameter('MinValue', TYPES.Int, numberRangeCriterion.minValue);  
            request.addParameter('MaxValue', TYPES.Int, numberRangeCriterion.maxValue); 
            request.addParameter('WorstValue', TYPES.Int, numberRangeCriterion.worstValue);  
            request.addParameter('BestValue', TYPES.Int, numberRangeCriterion.bestValue); 
            
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

const insertFloatRangeCriterionAsync = async function(floatRangeCriterion){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(floatRangeCriterion, "The parameter 'floatRangeCriterion' was null or undefined!");
            if (!(floatRangeCriterion instanceof FloatRangeCriterion)){
                throw new Error(`Invalid data type of 'floatRangeCriterion' detected!`)
            }

            let query = "EXEC CreateNewFloatRangeCriterion @ClientId, @CriterionName, @MinValue, @MaxValue, @WorstValue, @BestValue;";

            let request = new Request(query, function(err){
                if (err){
                    loggerService.logError(`The query '${query}' failed!`);
                    reject(err);
                    return;
                }
            });

            request.addParameter('ClientId', TYPES.BigInt, floatRangeCriterion.clientId);  
            request.addParameter('CriterionName', TYPES.VarChar , floatRangeCriterion.criterionName);  
            request.addParameter('MinValue', TYPES.Float, floatRangeCriterion.minValue);  
            request.addParameter('MaxValue', TYPES.Float, floatRangeCriterion.maxValue); 
            request.addParameter('WorstValue', TYPES.Float, floatRangeCriterion.worstValue);  
            request.addParameter('BestValue', TYPES.Float, floatRangeCriterion.bestValue); 
            
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

const insertCommentCriterionAsync = async function(commentCriterion){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(commentCriterion, "The parameter 'commentCriterion' was null or undefined!");
            if (!(commentCriterion instanceof CommentCriterion)){
                throw new Error(`Invalid data type of 'commentCriterion' detected!`)
            }

            let query = "EXEC CreateNewCommentCriterion @ClientId, @CriterionName;";

            let request = new Request(query, function(err){
                if (err){
                    loggerService.logError(`The query '${query}' failed!`);
                    reject(err);
                    return;
                }
            });

            request.addParameter('ClientId', TYPES.BigInt, commentCriterion.clientId);  
            request.addParameter('CriterionName', TYPES.VarChar , commentCriterion.criterionName);  
            
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

const insertDocumentCriterionAsync = async function(documentCriterion){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(documentCriterion, "The parameter 'documentCriterion' was null or undefined!");
            if (!(documentCriterion instanceof DocumentCriterion)){
                throw new Error(`Invalid data type of 'documentCriterion' detected!`)
            }

            let query = "EXEC CreateNewDocumentCriterion @ClientId, @CriterionName;";

            let request = new Request(query, function(err){
                if (err){
                    loggerService.logError(`The query '${query}' failed!`);
                    reject(err);
                    return;
                }
            });

            request.addParameter('ClientId', TYPES.BigInt, documentCriterion.clientId);  
            request.addParameter('CriterionName', TYPES.VarChar , documentCriterion.criterionName);  
            
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


const insertTextValueCriterionAsync = async function(textValueCriterion){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(textValueCriterion, "The parameter 'textValueCriterion' was null or undefined!");
            if (!(textValueCriterion instanceof TextValueCriterion)){
                throw new Error(`Invalid data type of 'textValueCriterion' detected!`)
            }

            let intToValueRows = textValueCriterion.intToValueMappings.map(({int, value}) => [int, value])
            let table = {
                columns: [
                  {name: 'ValueInt', type: TYPES.Int},
                  {name: 'ValueName', type: TYPES.VarChar},
                ],
                rows: intToValueRows
              };

            let request = new Request('CreateNewTextValueCriterion', function(err, rowCount){
                if (err){
                    loggerService.logError(`The stored procedure failed: ` + err.message);
                    reject(err);
                    return;
                } else{
                    loggerService.logInfo(`The stored procedure was completed!`);
                    connection.close();
                    resolve();                 
                }
            });

            request.addParameter('clientId', TYPES.BigInt, textValueCriterion.clientId);  
            request.addParameter('criterionName', TYPES.VarChar , textValueCriterion.criterionName);  
            request.addParameter('minValue', TYPES.Int , textValueCriterion.minValue);  
            request.addParameter('maxValue', TYPES.Int , textValueCriterion.maxValue);  
            request.addParameter('worstValue', TYPES.Int , textValueCriterion.worstValue);  
            request.addParameter('bestValue', TYPES.Int , textValueCriterion.bestValue); 
            request.addParameter('textValues', TYPES.TVP , table);  
            connection.callProcedure(request);  
        }).catch((error) => {
            loggerService.logError("Some error occurred during the query execution!");
            reject(error);
        })
    });
}

const deleteCriterionAsync = async function(criterionId){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(criterionId, "The parameter 'criterionId' was null or undefined!");

            let query = "DELETE FROM [RatingCriterion] WHERE Id = @CriterionId;";

            let request = new Request(query, function(err){
                if (err){
                    loggerService.logError(`The query '${query}' failed!`);
                    reject(err);
                    return;
                }
            });

            request.addParameter('CriterionId', TYPES.BigInt, criterionId); 
            
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

const deleteCriteriaForClientAsync = async function(clientId){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(clientId, "The parameter 'clientId' was null or undefined!");

            let query = "DELETE FROM [RatingCriterion] WHERE ClientId = @ClientId;";

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

const deleteNumberRangeCriteriaForClientAsync = async function(clientId){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(clientId, "The parameter 'clientId' was null or undefined!");

            let query = "DELETE FROM RatingCriterion WHERE Id IN (SELECT rc.Id FROM NumberRangeCriterion nr " +
    	                "LEFT OUTER JOIN RatingCriterion rc " +
                        "ON rc.Id = nr.Id " +
                        "WHERE rc.ClientId = @ClientId);";

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

const deleteFloatRangeCriteriaForClientAsync = async function(clientId){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(clientId, "The parameter 'clientId' was null or undefined!");

            let query = "DELETE FROM RatingCriterion WHERE Id IN (SELECT rc.Id FROM FloatRangeCriterion fr " +
    	                "LEFT OUTER JOIN RatingCriterion rc " +
                        "ON rc.Id = fr.Id " +
                        "WHERE rc.ClientId = @ClientId);";

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

const deleteCommentCriteriaForClientAsync = async function(clientId){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(clientId, "The parameter 'clientId' was null or undefined!");

            let query = "DELETE FROM RatingCriterion WHERE Id IN (SELECT rc.Id FROM CommentCriterion cr " +
    	                "LEFT OUTER JOIN RatingCriterion rc " +
                        "ON rc.Id = cr.Id " +
                        "WHERE rc.ClientId = @ClientId);";

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

const deleteDocumentCriteriaForClientAsync = async function(clientId){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(clientId, "The parameter 'clientId' was null or undefined!");

            let query = "DELETE FROM RatingCriterion WHERE Id IN (SELECT rc.Id FROM DocumentCriterion dc " +
    	                "LEFT OUTER JOIN RatingCriterion rc " +
                        "ON rc.Id = dc.Id " +
                        "WHERE rc.ClientId = @ClientId);";

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

const deleteTextValueCriteriaForClientAsync = async function(clientId){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(clientId, "The parameter 'clientId' was null or undefined!");

            let query = "DELETE FROM RatingCriterion WHERE Id IN (SELECT rc.Id FROM TextValueCriterion tvr " +
    	                "LEFT OUTER JOIN RatingCriterion rc " +
                        "ON rc.Id = tvr.Id " +
                        "WHERE rc.ClientId = @ClientId);";

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

const getFloatRangeCriteriaByClientIdAsync = async function(clientId){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(clientId, "The parameter 'clientId' was null or undefined!");

            let query = "SELECT * FROM [FloatRangeCriteriaView] WHERE ClientId = @ClientId;";

            let request = new Request(query, function(err){
                if (err){
                    loggerService.logError(`The query '${query}' failed!`);
                    reject(err);
                    return;
                }
            });

            let floatRangeCriteria = [];

            request.on('row', function(columns) {     
                let retrievedInfo = {};
                columns.forEach(function(column) {  
                    retrievedInfo[column.metadata.colName] = column.value;
                });  

                let criterion = new FloatRangeCriterion(retrievedInfo["Id"], retrievedInfo["ClientId"],
                     retrievedInfo["CriterionName"], retrievedInfo["MinValue"], retrievedInfo["MaxValue"], retrievedInfo["BestValue"],
                    retrievedInfo["WorstValue"]);
                floatRangeCriteria.push(criterion);
            }); 

            request.addParameter('ClientId', TYPES.BigInt, clientId); 
            
            request.on("requestCompleted", function (rowCount, more) {
                loggerService.logInfo(`The query '${query}' was completed!`);
                connection.close();
                resolve(floatRangeCriteria);
            });

            connection.execSql(request);  
        }).catch((error) => {
            loggerService.logError("Some error occurred during the query execution!");
            reject(error);
        })
    });
 }
 
const getNumberRangeCriteriaByClientIdAsync = async function(clientId){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(clientId, "The parameter 'clientId' was null or undefined!");

            let query = "SELECT * FROM [NumberRangeCriteriaView] WHERE ClientId = @ClientId;";

            let request = new Request(query, function(err){
                if (err){
                    loggerService.logError(`The query '${query}' failed!`);
                    reject(err);
                    return;
                }
            });

            let numberRangeCriteria = [];

            request.on('row', function(columns) {     
                let retrievedInfo = {};
                columns.forEach(function(column) {  
                    retrievedInfo[column.metadata.colName] = column.value;
                });  

                let criterion = new NumberRangeCriterion(retrievedInfo["Id"], retrievedInfo["ClientId"],
                     retrievedInfo["CriterionName"], retrievedInfo["MinValue"], retrievedInfo["MaxValue"], retrievedInfo["BestValue"],
                    retrievedInfo["WorstValue"]);
                    numberRangeCriteria.push(criterion);
            }); 

            request.addParameter('ClientId', TYPES.BigInt, clientId); 
            
            request.on("requestCompleted", function (rowCount, more) {
                loggerService.logInfo(`The query '${query}' was completed!`);
                connection.close();
                resolve(numberRangeCriteria);
            });

            connection.execSql(request);  
        }).catch((error) => {
            loggerService.logError("Some error occurred during the query execution!");
            reject(error);
        })
    });
 }

 const getCommentCriteriaByClientIdAsync = async function(clientId){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(clientId, "The parameter 'clientId' was null or undefined!");

            let query = "SELECT * FROM [CommentCriteriaView] WHERE ClientId = @ClientId;";

            let request = new Request(query, function(err){
                if (err){
                    loggerService.logError(`The query '${query}' failed!`);
                    reject(err);
                    return;
                }
            });

            let commentCriteria = [];

            request.on('row', function(columns) {     
                let retrievedInfo = {};
                columns.forEach(function(column) {  
                    retrievedInfo[column.metadata.colName] = column.value;
                });  

                let criterion = new CommentCriterion(retrievedInfo["Id"], retrievedInfo["ClientId"],
                     retrievedInfo["CriterionName"]);
                commentCriteria.push(criterion);
            }); 

            request.addParameter('ClientId', TYPES.BigInt, clientId); 
            
            request.on("requestCompleted", function (rowCount, more) {
                loggerService.logInfo(`The query '${query}' was completed!`);
                connection.close();
                resolve(commentCriteria);
            });

            connection.execSql(request);  
        }).catch((error) => {
            loggerService.logError("Some error occurred during the query execution!");
            reject(error);
        })
    });
 }

 const getDocumentCriteriaByClientIdAsync = async function(clientId){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(clientId, "The parameter 'clientId' was null or undefined!");

            let query = "SELECT * FROM [DocumentCriteriaView] WHERE ClientId = @ClientId;";

            let request = new Request(query, function(err){
                if (err){
                    loggerService.logError(`The query '${query}' failed!`);
                    reject(err);
                    return;
                }
            });

            let documentCriteria = [];

            request.on('row', function(columns) {     
                let retrievedInfo = {};
                columns.forEach(function(column) {  
                    retrievedInfo[column.metadata.colName] = column.value;
                });  

                let criterion = new DocumentCriterion(retrievedInfo["Id"], retrievedInfo["ClientId"],
                     retrievedInfo["CriterionName"]);
                     documentCriteria.push(criterion);
            }); 

            request.addParameter('ClientId', TYPES.BigInt, clientId); 
            
            request.on("requestCompleted", function (rowCount, more) {
                loggerService.logInfo(`The query '${query}' was completed!`);
                connection.close();
                resolve(documentCriteria);
            });

            connection.execSql(request);  
        }).catch((error) => {
            loggerService.logError("Some error occurred during the query execution!");
            reject(error);
        })
    });
 }

 const getTextValueCriteriaByClientIdAsync = async function(clientId){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(clientId, "The parameter 'clientId' was null or undefined!");

            let query = "SELECT * FROM [TextValueCriteriaView] WHERE ClientId = @ClientId;";
            let textValueCriteria = [];

            let request = new Request(query, async function(err){
                if (err){
                    loggerService.logError(`The query '${query}' failed!`);
                    reject(err);
                    return;
                } else{
                    loggerService.logInfo(`The query '${query}' was completed!`);
                    connection.close();

                    for (let criterion of textValueCriteria){
                        let values = await getTextValuesByCriterionIdAsync(criterion["id"]);
                        criterion["intToValueMappings"] = values;
                    }

                    resolve(textValueCriteria);
                }
            });

            request.on('row', function(columns) {     
                let retrievedInfo = {};
                columns.forEach(function(column) {  
                    retrievedInfo[column.metadata.colName] = column.value;
                });  

                let criterion = new TextValueCriterion(retrievedInfo["Id"], retrievedInfo["ClientId"],
                    retrievedInfo["CriterionName"], retrievedInfo["MinValue"], retrievedInfo["MaxValue"],
                retrievedInfo["BestValue"], retrievedInfo["WorstValue"], []);
                textValueCriteria.push(criterion);
            }); 

            request.addParameter('ClientId', TYPES.BigInt, clientId); 
            connection.execSql(request);  
        }).catch((error) => {
            loggerService.logError("Some error occurred during the query execution!");
            reject(error);
        })
    });
 }

 const getTextValuesByCriterionIdAsync = async function(criterionId){
    return new Promise((resolve, reject) => {
        dbService.connectAsync().then((connection) => {
            ensureNotNullOrUndefined(criterionId, "The parameter 'criterionid' was null or undefined!");

            let query = "SELECT * FROM [TextValue] WHERE TextValueCriterionId = @CriterionId;";

            let request = new Request(query, function(err){
                if (err){
                    loggerService.logError(`The query '${query}' failed!`);
                    reject(err);
                    return;
                } else{
                    loggerService.logInfo(`The query '${query}' was completed!`);
                    connection.close();
                    resolve(textValues);
                }
            });

            let textValues = [];

            request.on('row', function(columns) {     
                let retrievedInfo = {};
                columns.forEach(function(column) {  
                    retrievedInfo[column.metadata.colName] = column.value;
                });  

                let intToValueObject = {"int": retrievedInfo["ValueInt"], "value": retrievedInfo["ValueName"]}
                textValues.push(intToValueObject);
            }); 

            request.addParameter('CriterionId', TYPES.BigInt, criterionId); 
            connection.execSql(request);  
        }).catch((error) => {
            loggerService.logError("Some error occurred during the query execution!");
            reject(error);
        })
    });
 }




module.exports = {
    insertNumberRangeCriterionAsync,
    insertFloatRangeCriterionAsync,
    insertCommentCriterionAsync,
    insertDocumentCriterionAsync,
    insertTextValueCriterionAsync,
    deleteCriterionAsync,
    deleteCriteriaForClientAsync,
    getFloatRangeCriteriaByClientIdAsync,
    getNumberRangeCriteriaByClientIdAsync,
    getCommentCriteriaByClientIdAsync,
    getDocumentCriteriaByClientIdAsync,
    getTextValueCriteriaByClientIdAsync,
    deleteNumberRangeCriteriaForClientAsync,
    deleteDocumentCriteriaForClientAsync,
    deleteFloatRangeCriteriaForClientAsync,
    deleteCommentCriteriaForClientAsync,
    deleteTextValueCriteriaForClientAsync
}