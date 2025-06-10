const ratingsService = require("../services/ratings.service.js");
const helper = require("../services/helper.service.js");
const deletedRatingsService = require("../services/deletedratings.service.js");
const CommentRating = require("../models/commentrating.model.js");
const TextValueRating = require("../models/textvaluerating.model.js");
const NumberRangeRating = require("../models/numberrangerating.model.js");
const FloatRangeRating = require("../models/floatrangerating.model.js");
const { isNullOrUndefined } = require("../services/helper.service");
const DocumentRating = require("../models/documentrating.model.js");

// POST /new/numberrange
const registerNewNumberRangeRatingAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.body.userId)){
            res.status(400).json({message: 'The property req.body.userId was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.ratingCriterionId)){
            res.status(400).json({message: 'The property req.body.ratingCriterionId was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.dateOfRating)){
            res.status(400).json({message: 'The property req.body.dateOfRating was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.ratingValue)){
            res.status(400).json({message: 'The property req.body.ratingValue was not defined or was null!'});
            return;
        }

        let rating = new NumberRangeRating(0, req.body.userId, req.body.ratingCriterionId, new Date(req.body.dateOfRating), req.body.ratingValue);
        ratingsService.insertNumberRangeRatingAsync(rating).then(() => {
            res.status(201).json({message : `The rating was successfully registered!`}); 
        })
        .catch((err) => {
            res.status(500).json({message: 'The register operation failed: ' + err.message});
        })
    } catch (e){
        res.status(500).json({message : 'The register operation failed:  ' + e.message});
    }
};

// POST /new/floatrange
const registerNewFloatRangeRatingAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.body.userId)){
            res.status(400).json({message: 'The property req.body.userId was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.ratingCriterionId)){
            res.status(400).json({message: 'The property req.body.ratingCriterionId was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.dateOfRating)){
            res.status(400).json({message: 'The property req.body.dateOfRating was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.ratingValue)){
            res.status(400).json({message: 'The property req.body.ratingValue was not defined or was null!'});
            return;
        }

        let rating = new FloatRangeRating(0, req.body.userId, req.body.ratingCriterionId, new Date(req.body.dateOfRating), req.body.ratingValue);
        ratingsService.insertFloatRangeRatingAsync(rating).then(() => {
            res.status(201).json({message : `The rating was successfully registered!`}); 
        })
        .catch((err) => {
            res.status(500).json({message: 'The register operation failed: ' + err.message});
        })
    } catch (e){
        res.status(500).json({message : 'The register operation failed:  ' + e.message});
    }
};

// POST /new/comment
const registerNewCommentRatingAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.body.userId)){
            res.status(400).json({message: 'The property req.body.userId was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.ratingCriterionId)){
            res.status(400).json({message: 'The property req.body.ratingCriterionId was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.dateOfRating)){
            res.status(400).json({message: 'The property req.body.dateOfRating was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.comment)){
            res.status(400).json({message: 'The property req.body.comment was not defined or was null!'});
            return;
        }

        let rating = new CommentRating(0, req.body.userId, req.body.ratingCriterionId, new Date(req.body.dateOfRating), req.body.comment);
        ratingsService.insertCommentRatingAsync(rating).then(() => {
            res.status(201).json({message : `The rating was successfully registered!`}); 
        })
        .catch((err) => {
            res.status(500).json({message: 'The register operation failed: ' + err.message});
        })
    } catch (e){
        res.status(500).json({message : 'The register operation failed:  ' + e.message});
    }
};

// POST /new/document
const registerNewDocumentRatingAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.body.userId)){
            res.status(400).json({message: 'The property req.body.userId was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.ratingCriterionId)){
            res.status(400).json({message: 'The property req.body.ratingCriterionId was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.dateOfRating)){
            res.status(400).json({message: 'The property req.body.dateOfRating was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.documentName)){
            res.status(400).json({message: 'The property req.body.documentName was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.documentData)){
            res.status(400).json({message: 'The property req.body.documentData was not defined or was null!'});
            return;
        }

        console.log(req.body.documentData.length);
        let buffer = new Buffer.from(req.body.documentData, 'base64');
        let rating = new DocumentRating(0, req.body.userId, req.body.ratingCriterionId, new Date(req.body.dateOfRating), req.body.documentName, buffer);
        ratingsService.insertDocumentRatingAsync(rating).then(() => {
            res.status(201).json({message : `The rating was successfully registered!`}); 
        })
        .catch((err) => {
            res.status(500).json({message: 'The register operation failed: ' + err.message});
        })
    } catch (e){
        res.status(500).json({message : 'The register operation failed:  ' + e.message});
    }
};

// POST /new/textvalue
const registerNewTextValueRatingAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.body.userId)){
            res.status(400).json({message: 'The property req.body.userId was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.ratingCriterionId)){
            res.status(400).json({message: 'The property req.body.ratingCriterionId was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.dateOfRating)){
            res.status(400).json({message: 'The property req.body.dateOfRating was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.textValueInt)){
            res.status(400).json({message: 'The property req.body.textValueInt was not defined or was null!'});
            return;
        }

        let rating = new TextValueRating(0, req.body.userId, req.body.ratingCriterionId, new Date(req.body.dateOfRating), req.body.textValueInt);
        ratingsService.insertTextValueRatingAsync(rating).then(() => {
            res.status(201).json({message : `The rating was successfully registered!`}); 
        })
        .catch((err) => {
            res.status(500).json({message: 'The register operation failed: ' + err.message});
        })
    } catch (e){
        res.status(500).json({message : 'The register operation failed:  ' + e.message});
    }
};

// DELETE /:ratingId
const deleteRatingAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.params.ratingId)){
            res.status(400).json({message: 'The property req.params.ratingId was not defined or was null!'});
            return;
        }

        ratingsService.deleteRatingAsync(req.params.ratingId).then(() => {
            res.status(200).json({message : `The rating was successfully deleted!`}); 
        }).catch((error) => {
            res.status(500).json({message: 'The delete operation failed: ' + error.message});
        })
    } catch (e){
        res.status(500).json({message : 'The delete operation failed:  ' + e.message});
    }
};

// DELETE /deleteall/client/:id
const deleteAllClientRatingsAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.params.id)){
            res.status(400).json({message: 'The property req.params.id was not defined or was null!'});
            return;
        }

        ratingsService.deleteRatingsFoClientAsync(req.params.id).then(() => {
            res.status(200).json({message : `The ratings were successfully deleted!`}); 
        }).catch((error) => {
            res.status(500).json({message: 'The delete operation failed: ' + error.message});
        })
    } catch (e){
        res.status(500).json({message : 'The delete operation failed:  ' + e.message});
    }
};

// DELETE /deleteall/user/:id
const deleteAllUserRatingsAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.params.id)){
            res.status(400).json({message: 'The property req.params.id was not defined or was null!'});
            return;
        }

        ratingsService.deleteRatingsForUserAsync(req.params.id).then(() => {
            res.status(200).json({message : `The ratings were successfully deleted!`}); 
        }).catch((error) => {
            res.status(500).json({message: 'The delete operation failed: ' + error.message});
        })
    } catch (e){
        res.status(500).json({message : 'The delete operation failed:  ' + e.message});
    }
};

// GET /numberrange/:clientId/:includeDeleted
const getNumberRangeRatingsAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.params.clientId)){
            res.status(400).json({message: 'The property req.params.clientId was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.params.includeDeleted)){
            res.status(400).json({message: 'The property req.params.includeDeleted was not defined or was null!'});
            return;
        }

        if (!(req.params.includeDeleted == 1 || req.params.includeDeleted == 0)){
            res.status(400).json({message: 'The property req.params.includeDeleted must be either 0 or 1!'});
            return;
        }

        let resultRatings = [];
        let numberRatings = await ratingsService.getNumberRangeRatingsByClientIdAsync(req.params.clientId);
        resultRatings = resultRatings.concat(numberRatings);

        if (req.params.includeDeleted == 1){
            let deletedRatings =  await deletedRatingsService.getNumberRangeRatingsByClientIdAsync(req.params.clientId);
            resultRatings = resultRatings.concat(deletedRatings);
        } 

        res.status(200).json({result: resultRatings});
    } catch (e){
        res.status(500).json({message : 'The get operation failed:  ' + e.message});
    }
};

// GET /floatrange/:clientId/:includeDeleted
const getFloatRangeRatingsAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.params.clientId)){
            res.status(400).json({message: 'The property req.params.clientId was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.params.includeDeleted)){
            res.status(400).json({message: 'The property req.params.includeDeleted was not defined or was null!'});
            return;
        }

        if (!(req.params.includeDeleted == 1 || req.params.includeDeleted == 0)){
            res.status(400).json({message: 'The property req.params.includeDeleted must be either 0 or 1!'});
            return;
        }

        let resultRatings = [];
        let floatRatings = await ratingsService.getFloatRangeRatingsByClientIdAsync(req.params.clientId);
        resultRatings = resultRatings.concat(floatRatings);

        if (req.params.includeDeleted == 1){
            let deletedRatings =  await deletedRatingsService.getFloatRangeRatingsByClientIdAsync(req.params.clientId);
            resultRatings = resultRatings.concat(deletedRatings);
        } 

        res.status(200).json({result: resultRatings});
    } catch (e){
        res.status(500).json({message : 'The get operation failed:  ' + e.message});
    }
};

// GET /comment/:clientId/:includeDeleted
const getCommentRatingsAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.params.clientId)){
            res.status(400).json({message: 'The property req.params.clientId was not defined or was null!'});
            return;
        }
        
        if (isNullOrUndefined(req.params.includeDeleted)){
            res.status(400).json({message: 'The property req.params.includeDeleted was not defined or was null!'});
            return;
        }

        if (!(req.params.includeDeleted == 1 || req.params.includeDeleted == 0)){
            res.status(400).json({message: 'The property req.params.includeDeleted must be either 0 or 1!'});
            return;
        }

        let resultRatings = [];
        let commentRatings = await ratingsService.getCommentRatingsByClientIdAsync(req.params.clientId);
        resultRatings = resultRatings.concat(commentRatings);

        if (req.params.includeDeleted == 1){
            let deletedRatings =  await deletedRatingsService.getCommentRatingsByClientIdAsync(req.params.clientId);
            resultRatings = resultRatings.concat(deletedRatings);
        } 

        res.status(200).json({result: resultRatings});
    } catch (e){
        res.status(500).json({message : 'The get operation failed:  ' + e.message});
    }
};

// GET /document/:clientId/:includeDeleted
const getDocumentRatingsAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.params.clientId)){
            res.status(400).json({message: 'The property req.params.clientId was not defined or was null!'});
            return;
        }
        
        if (isNullOrUndefined(req.params.includeDeleted)){
            res.status(400).json({message: 'The property req.params.includeDeleted was not defined or was null!'});
            return;
        }

        if (!(req.params.includeDeleted == 1 || req.params.includeDeleted == 0)){
            res.status(400).json({message: 'The property req.params.includeDeleted must be either 0 or 1!'});
            return;
        }

        let resultRatings = [];
        let documentRatings = await ratingsService.getDocumentRatingsByClientIdAsync(req.params.clientId);
        resultRatings = resultRatings.concat(documentRatings);

        if (req.params.includeDeleted == 1){
            let deletedRatings =  await deletedRatingsService.getDocumentRatingsByClientIdAsync(req.params.clientId);
            resultRatings = resultRatings.concat(deletedRatings);
        } 

        res.status(200).json({result: resultRatings});
    } catch (e){
        res.status(500).json({message : 'The get operation failed:  ' + e.message});
    }
};

// GET /textvalue/:clientId/:includeDeleted
const getTextValueRatingsAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.params.clientId)){
            res.status(400).json({message: 'The property req.params.clientId was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.params.includeDeleted)){
            res.status(400).json({message: 'The property req.params.includeDeleted was not defined or was null!'});
            return;
        }

        if (!(req.params.includeDeleted == 1 || req.params.includeDeleted == 0)){
            res.status(400).json({message: 'The property req.params.includeDeleted must be either 0 or 1!'});
            return;
        }

        let resultRatings = [];
        let textValueRatings = await ratingsService.getTextValueRatingsByClientIdAsync(req.params.clientId);
        resultRatings = resultRatings.concat(textValueRatings);

        if (req.params.includeDeleted == 1){
            let deletedRatings =  await deletedRatingsService.getTextValueRatingsByClientIdAsync(req.params.clientId);
            resultRatings = resultRatings.concat(deletedRatings);
        } 

        res.status(200).json({result: resultRatings});
    } catch (e){
        res.status(500).json({message : 'The get operation failed:  ' + e.message});
    }
};

// POST /bycriterion/extended/numberrange/all
const getAllNumericRatingsByCriterionIdExtendedAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.body.criterionId)){
            res.status(400).json({message: 'The property req.body.criterionId was not defined or was null!'});
            return;
        }  

        ratingsService.getAllNumericRatingsByCriterionIdExtendedAsync(req.body.criterionId).then((ratings) => {
            res.status(200).json({result : ratings}); 
        }).catch((error) => {
            res.status(500).json({message: 'The get ratings operation failed: ' + error.message});
        })
    } catch (e){
        res.status(500).json({message : 'The get ratings operation failed:  ' + e.message});
    } 
};

// POST /bycriterion/extended/numberrange/all/avg
const getAllNumericRatingsAverageByCriterionIdExtendedAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.body.criterionId)){
            res.status(400).json({message: 'The property req.body.criterionId was not defined or was null!'});
            return;
        }  

        ratingsService.getAllNumericRatingsAverageByCriterionIdExtendedAsync(req.body.criterionId).then((avg) => {
            res.status(200).json({result : avg}); 
        }).catch((error) => {
            res.status(500).json({message: 'The get average operation failed: ' + error.message});
        })
    } catch (e){
        res.status(500).json({message : 'The get average operation failed:  ' + e.message});
    } 
};

// POST /bycriterion/extended/floatrange/all
const getAllFloatRatingsByCriterionIdExtendedAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.body.criterionId)){
            res.status(400).json({message: 'The property req.body.criterionId was not defined or was null!'});
            return;
        }  

        ratingsService.getAllFloatRatingsByCriterionIdExtendedAsync(req.body.criterionId).then((ratings) => {
            res.status(200).json({result : ratings}); 
        }).catch((error) => {
            res.status(500).json({message: 'The get ratings operation failed: ' + error.message});
        })
    } catch (e){
        res.status(500).json({message : 'The get ratings operation failed:  ' + e.message});
    } 
};

// POST /bycriterion/extended/floatrange/all/avg
const getAllFloatRatingsAverageByCriterionIdExtendedAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.body.criterionId)){
            res.status(400).json({message: 'The property req.body.criterionId was not defined or was null!'});
            return;
        }  

        ratingsService.getAllFloatRatingsAverageByCriterionIdExtendedAsync(req.body.criterionId).then((avg) => {
            res.status(200).json({result : avg}); 
        }).catch((error) => {
            res.status(500).json({message: 'The get average operation failed: ' + error.message});
        })
    } catch (e){
        res.status(500).json({message : 'The get average operation failed:  ' + e.message});
    } 
};

// POST /bycriterion/extended/comment/all
const getAllCommentRatingsByCriterionIdExtendedAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.body.criterionId)){
            res.status(400).json({message: 'The property req.body.criterionId was not defined or was null!'});
            return;
        }  

        ratingsService.getAllCommentRatingsByCriterionIdExtendedAsync(req.body.criterionId).then((ratings) => {
            res.status(200).json({result : ratings}); 
        }).catch((error) => {
            res.status(500).json({message: 'The get ratings operation failed: ' + error.message});
        })
    } catch (e){
        res.status(500).json({message : 'The get ratings operation failed:  ' + e.message});
    } 
};

// POST /bycriterion/extended/document/all
const getAllDocumentRatingsByCriterionIdExtendedAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.body.criterionId)){
            res.status(400).json({message: 'The property req.body.criterionId was not defined or was null!'});
            return;
        }  

        ratingsService.getAllDocumentRatingsByCriterionIdExtendedAsync(req.body.criterionId).then((ratings) => {
            for (let i = 0; i < ratings.length; i++){
                ratings[i].documentData = ratings[i].documentData.toString("base64");
            }
            
            res.status(200).json({result : ratings}); 
        }).catch((error) => {
            res.status(500).json({message: 'The get ratings operation failed: ' + error.message});
        })
    } catch (e){
        res.status(500).json({message : 'The get ratings operation failed:  ' + e.message});
    } 
};

// POST /bycriterion/extended/textvalue/all
const getAllTextValueRatingsByCriterionIdExtendedAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.body.criterionId)){
            res.status(400).json({message: 'The property req.body.criterionId was not defined or was null!'});
            return;
        }  

        ratingsService.getAllTextRatingsByCriterionIdExtendedAsync(req.body.criterionId).then((ratings) => {
            res.status(200).json({result : ratings}); 
        }).catch((error) => {
            res.status(500).json({message: 'The get ratings operation failed: ' + error.message});
        })
    } catch (e){
        res.status(500).json({message : 'The get ratings operation failed:  ' + e.message});
    } 
};

// POST /bycriterion/extended/textvalue/all/mostcommon
const getMostCommonTextRatingFromAllByCriterionIdExtendedAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.body.criterionId)){
            res.status(400).json({message: 'The property req.body.criterionId was not defined or was null!'});
            return;
        }  

        ratingsService.getMostCommonTextRatingFromAllByCriterionIdExtendedAsync(req.body.criterionId).then((mostCommon) => {
            res.status(200).json({valueText: mostCommon["valueText"], valueInt: mostCommon["valueInt"]}); 
        }).catch((error) => {
            res.status(500).json({message: 'The get most common operation failed: ' + error.message});
        })
    } catch (e){
        res.status(500).json({message : 'The get most common operation failed:  ' + e.message});
    } 
};


module.exports = {
    registerNewNumberRangeRatingAsync,
    registerNewFloatRangeRatingAsync,
    registerNewCommentRatingAsync,
    registerNewTextValueRatingAsync,
    registerNewDocumentRatingAsync,
    deleteRatingAsync,
    deleteAllClientRatingsAsync,
    deleteAllUserRatingsAsync,
    getNumberRangeRatingsAsync,
    getFloatRangeRatingsAsync,
    getTextValueRatingsAsync,
    getCommentRatingsAsync,
    getDocumentRatingsAsync,
    getAllTextValueRatingsByCriterionIdExtendedAsync,
    getAllCommentRatingsByCriterionIdExtendedAsync,
    getAllDocumentRatingsByCriterionIdExtendedAsync,
    getAllFloatRatingsByCriterionIdExtendedAsync,
    getAllFloatRatingsAverageByCriterionIdExtendedAsync,
    getAllNumericRatingsByCriterionIdExtendedAsync,
    getAllNumericRatingsAverageByCriterionIdExtendedAsync,
    getMostCommonTextRatingFromAllByCriterionIdExtendedAsync
};