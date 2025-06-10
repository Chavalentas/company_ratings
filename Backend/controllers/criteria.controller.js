const criteriaService = require("../services/criteria.service.js");
const CommentCriterion = require("../models/commentcriterion.model.js");
const FloatRangeCriterion = require("../models/floatrangecriterion.model.js");
const NumberRangeCriterion = require("../models/numberrangecriterion.model.js");
const TextValueCriterion = require("../models/textvaluecriterion.model.js");
const { isNullOrUndefined } = require("../services/helper.service");
const DocumentCriterion = require("../models/documentcriterion.model.js");

// POST /new/numberrange
const registerNewNumberRangeCriterionAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.body.clientId)){
            res.status(400).json({message: 'The property req.body.clientId was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.criterionName)){
            res.status(400).json({message: 'The property req.body.criterionName was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.minValue)){
            res.status(400).json({message: 'The property req.body.minValue was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.maxValue)){
            res.status(400).json({message: 'The property req.body.maxValue was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.worstValue)){
            res.status(400).json({message: 'The property req.body.worstValue was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.bestValue)){
            res.status(400).json({message: 'The property req.body.bestValue was not defined or was null!'});
            return;
        }

        let criterion = new NumberRangeCriterion(0, req.body.clientId, req.body.criterionName, req.body.minValue, req.body.maxValue,
            req.body.bestValue, req.body.worstValue);
        criteriaService.insertNumberRangeCriterionAsync(criterion).then(() => {
            res.status(201).json({message : `The criterion was successfully registered!`}); 
        })
        .catch((err) => {
            res.status(500).json({message: 'The register operation failed: ' + err.message});
        })
    } catch (e){
        res.status(500).json({message : 'The register operation failed:  ' + e.message});
    }
};

// POST /new/floatrange
const registerNewFloatRangeCriterionAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.body.clientId)){
            res.status(400).json({message: 'The property req.body.clientId was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.criterionName)){
            res.status(400).json({message: 'The property req.body.criterionName was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.minValue)){
            res.status(400).json({message: 'The property req.body.minValue was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.maxValue)){
            res.status(400).json({message: 'The property req.body.maxValue was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.worstValue)){
            res.status(400).json({message: 'The property req.body.worstValue was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.bestValue)){
            res.status(400).json({message: 'The property req.body.bestValue was not defined or was null!'});
            return;
        }

        let criterion = new FloatRangeCriterion(0, req.body.clientId, req.body.criterionName, req.body.minValue, req.body.maxValue,
            req.body.bestValue, req.body.worstValue);
        criteriaService.insertFloatRangeCriterionAsync(criterion).then(() => {
            res.status(201).json({message : `The criterion was successfully registered!`}); 
        })
        .catch((err) => {
            res.status(500).json({message: 'The register operation failed: ' + err.message});
        })
    } catch (e){
        res.status(500).json({message : 'The register operation failed:  ' + e.message});
    }
};

// POST /new/comment
const registerNewCommentCriterionAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.body.clientId)){
            res.status(400).json({message: 'The property req.body.clientId was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.criterionName)){
            res.status(400).json({message: 'The property req.body.criterionName was not defined or was null!'});
            return;
        }

        let criterion = new CommentCriterion(0, req.body.clientId, req.body.criterionName);
        criteriaService.insertCommentCriterionAsync(criterion).then(() => {
            res.status(201).json({message : `The criterion was successfully registered!`}); 
        })
        .catch((err) => {
            res.status(500).json({message: 'The register operation failed: ' + err.message});
        })
    } catch (e){
        res.status(500).json({message : 'The register operation failed:  ' + e.message});
    }
};

// POST /new/document
const registerNewDocumentCriterionAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.body.clientId)){
            res.status(400).json({message: 'The property req.body.clientId was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.criterionName)){
            res.status(400).json({message: 'The property req.body.criterionName was not defined or was null!'});
            return;
        }

        let criterion = new DocumentCriterion(0, req.body.clientId, req.body.criterionName);
        criteriaService.insertDocumentCriterionAsync(criterion).then(() => {
            res.status(201).json({message : `The criterion was successfully registered!`}); 
        })
        .catch((err) => {
            res.status(500).json({message: 'The register operation failed: ' + err.message});
        })
    } catch (e){
        res.status(500).json({message : 'The register operation failed:  ' + e.message});
    }
};

// POST /new/textvalue
const registerNewTextValueCriterionAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.body.clientId)){
            res.status(400).json({message: 'The property req.body.clientId was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.criterionName)){
            res.status(400).json({message: 'The property req.body.criterionName was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.minValue)){
            res.status(400).json({message: 'The property req.body.minValue was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.maxValue)){
            res.status(400).json({message: 'The property req.body.maxValue was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.worstValue)){
            res.status(400).json({message: 'The property req.body.worstValue was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.bestValue)){
            res.status(400).json({message: 'The property req.body.bestValue was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.intToValueMappings)){
            res.status(400).json({message: 'The property req.body.intToValueTuples was not defined or was null!'});
            return;
        }

        let criterion = new TextValueCriterion(0, req.body.clientId, req.body.criterionName, req.body.minValue, req.body.maxValue,
            req.body.bestValue, req.body.worstValue, req.body.intToValueMappings);
        criteriaService.insertTextValueCriterionAsync(criterion).then(() => {
            res.status(201).json({message : `The criterion was successfully registered!`}); 
        })
        .catch((err) => {
            res.status(500).json({message: 'The register operation failed: ' + err.message});
        })
    } catch (e){
        res.status(500).json({message : 'The register operation failed:  ' + e.message});
    }
};

// DELETE /:criteriaId
const deleteCriterionAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.params.criteriaId)){
            res.status(400).json({message: 'The property req.params.criteriaId was not defined or was null!'});
            return;
        }

        criteriaService.deleteCriterionAsync(req.params.criteriaId).then(() => {
            res.status(200).json({message : `The criterion was successfully deleted!`}); 
        }).catch((error) => {
            res.status(500).json({message: 'The delete operation failed: ' + error.message});
        })
    } catch (e){
        res.status(500).json({message : 'The delete operation failed:  ' + e.message});
    }
};

// DELETE /deleteall/:clientId
const deleteAllClientCriteriaAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.params.clientId)){
            res.status(400).json({message: 'The property req.params.clientId was not defined or was null!'});
            return;
        }

        criteriaService.deleteCriteriaForClientAsync(req.params.clientId).then(() => {
            res.status(200).json({message : `The criteria were successfully deleted!`}); 
        }).catch((error) => {
            res.status(500).json({message: 'The delete operation failed: ' + error.message});
        })
    } catch (e){
        res.status(500).json({message : 'The delete operation failed:  ' + e.message});
    }
};

// DELETE /deleteall/numberrange/:clientId
const deleteAllNumberClientCriteriaAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.params.clientId)){
            res.status(400).json({message: 'The property req.params.clientId was not defined or was null!'});
            return;
        }

        criteriaService.deleteNumberRangeCriteriaForClientAsync(req.params.clientId).then(() => {
            res.status(200).json({message : `The criteria were successfully deleted!`}); 
        }).catch((error) => {
            res.status(500).json({message: 'The delete operation failed: ' + error.message});
        })
    } catch (e){
        res.status(500).json({message : 'The delete operation failed:  ' + e.message});
    }
};

// DELETE /deleteall/floatrange/:clientId
const deleteAllFloatClientCriteriaAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.params.clientId)){
            res.status(400).json({message: 'The property req.params.clientId was not defined or was null!'});
            return;
        }

        criteriaService.deleteFloatRangeCriteriaForClientAsync(req.params.clientId).then(() => {
            res.status(200).json({message : `The criteria were successfully deleted!`}); 
        }).catch((error) => {
            res.status(500).json({message: 'The delete operation failed: ' + error.message});
        })
    } catch (e){
        res.status(500).json({message : 'The delete operation failed:  ' + e.message});
    }
};

// DELETE /deleteall/comment/:clientId
const deleteAllCommentClientCriteriaAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.params.clientId)){
            res.status(400).json({message: 'The property req.params.clientId was not defined or was null!'});
            return;
        }

        criteriaService.deleteCommentCriteriaForClientAsync(req.params.clientId).then(() => {
            res.status(200).json({message : `The criteria were successfully deleted!`}); 
        }).catch((error) => {
            res.status(500).json({message: 'The delete operation failed: ' + error.message});
        })
    } catch (e){
        res.status(500).json({message : 'The delete operation failed:  ' + e.message});
    }
};

// DELETE /deleteall/document/:clientId
const deleteAllDocumentClientCriteriaAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.params.clientId)){
            res.status(400).json({message: 'The property req.params.clientId was not defined or was null!'});
            return;
        }

        criteriaService.deleteDocumentCriteriaForClientAsync(req.params.clientId).then(() => {
            res.status(200).json({message : `The criteria were successfully deleted!`}); 
        }).catch((error) => {
            res.status(500).json({message: 'The delete operation failed: ' + error.message});
        })
    } catch (e){
        res.status(500).json({message : 'The delete operation failed:  ' + e.message});
    }
};

// DELETE /deleteall/textvalue/:clientId
const deleteAllTextValueClientCriteriaAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.params.clientId)){
            res.status(400).json({message: 'The property req.params.clientId was not defined or was null!'});
            return;
        }

        criteriaService.deleteTextValueCriteriaForClientAsync(req.params.clientId).then(() => {
            res.status(200).json({message : `The criteria were successfully deleted!`}); 
        }).catch((error) => {
            res.status(500).json({message: 'The delete operation failed: ' + error.message});
        })
    } catch (e){
        res.status(500).json({message : 'The delete operation failed:  ' + e.message});
    }
};

// GET /numberrange/:clientId
const getNumberRangeCriteriaAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.params.clientId)){
            res.status(400).json({message: 'The property req.params.clientId was not defined or was null!'});
            return;
        }

        criteriaService.getNumberRangeCriteriaByClientIdAsync(req.params.clientId).then((criteria) => {
            res.status(200).json({result: criteria});
        }).catch((error) => {
            res.status(500).json({message: 'The get operation failed: ' + error.message});
        })
    } catch (e){
        res.status(500).json({message : 'The get operation failed:  ' + e.message});
    }
};

// GET /floatrange/:clientId
const getFloatRangeCriteriaAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.params.clientId)){
            res.status(400).json({message: 'The property req.params.clientId was not defined or was null!'});
            return;
        }

        criteriaService.getFloatRangeCriteriaByClientIdAsync(req.params.clientId).then((criteria) => {
            res.status(200).json({result: criteria});
        }).catch((error) => {
            res.status(500).json({message: 'The get operation failed: ' + error.message});
        })
    } catch (e){
        res.status(500).json({message : 'The get operation failed:  ' + e.message});
    }
};

// GET /comment/:clientId
const getCommentCriteriaAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.params.clientId)){
            res.status(400).json({message: 'The property req.params.clientId was not defined or was null!'});
            return;
        }

        criteriaService.getCommentCriteriaByClientIdAsync(req.params.clientId).then((criteria) => {
            res.status(200).json({result: criteria});
        }).catch((error) => {
            res.status(500).json({message: 'The get operation failed: ' + error.message});
        })
    } catch (e){
        res.status(500).json({message : 'The get operation failed:  ' + e.message});
    }
};

// GET /document/:clientId
const getDocumentCriteriaAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.params.clientId)){
            res.status(400).json({message: 'The property req.params.clientId was not defined or was null!'});
            return;
        }

        criteriaService.getDocumentCriteriaByClientIdAsync(req.params.clientId).then((criteria) => {
            res.status(200).json({result: criteria});
        }).catch((error) => {
            res.status(500).json({message: 'The get operation failed: ' + error.message});
        })
    } catch (e){
        res.status(500).json({message : 'The get operation failed:  ' + e.message});
    }
};

// GET /textvalue/:clientId
const getTextValueCriteriaAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.params.clientId)){
            res.status(400).json({message: 'The property req.params.clientId was not defined or was null!'});
            return;
        }

        criteriaService.getTextValueCriteriaByClientIdAsync(req.params.clientId).then((criteria) => {
            res.status(200).json({result: criteria});
        }).catch((error) => {
            res.status(500).json({message: 'The get operation failed: ' + error.message});
        })
    } catch (e){
        res.status(500).json({message : 'The get operation failed:  ' + e.message});
    }
};

module.exports = {
    registerNewNumberRangeCriterionAsync,
    registerNewFloatRangeCriterionAsync,
    registerNewCommentCriterionAsync,
    registerNewDocumentCriterionAsync,
    registerNewTextValueCriterionAsync,
    deleteCriterionAsync,
    deleteAllClientCriteriaAsync,
    deleteAllNumberClientCriteriaAsync,
    deleteAllFloatClientCriteriaAsync,
    deleteAllCommentClientCriteriaAsync,
    deleteAllTextValueClientCriteriaAsync,
    deleteAllDocumentClientCriteriaAsync,
    getNumberRangeCriteriaAsync,
    getFloatRangeCriteriaAsync,
    getCommentCriteriaAsync,
    getDocumentCriteriaAsync,
    getTextValueCriteriaAsync
};