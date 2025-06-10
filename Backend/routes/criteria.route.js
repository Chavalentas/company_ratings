const express = require('express');
const router = express.Router();
const criteriaController = require('../controllers/criteria.controller.js');

router.post('/new/numberrange', criteriaController.registerNewNumberRangeCriterionAsync);
router.post('/new/floatrange', criteriaController.registerNewFloatRangeCriterionAsync);
router.post('/new/comment', criteriaController.registerNewCommentCriterionAsync);
router.post('/new/document', criteriaController.registerNewDocumentCriterionAsync);
router.post('/new/textvalue', criteriaController.registerNewTextValueCriterionAsync);
router.delete('/:criteriaId', criteriaController.deleteCriterionAsync);
router.delete('/deleteall/:clientId', criteriaController.deleteAllClientCriteriaAsync);
router.delete('/deleteall/numberrange/:clientId', criteriaController.deleteAllNumberClientCriteriaAsync);
router.delete('/deleteall/floatrange/:clientId', criteriaController.deleteAllFloatClientCriteriaAsync);
router.delete('/deleteall/comment/:clientId', criteriaController.deleteAllCommentClientCriteriaAsync);
router.delete('/deleteall/document/:clientId', criteriaController.deleteAllDocumentClientCriteriaAsync);
router.delete('/deleteall/textvalue/:clientId', criteriaController.deleteAllTextValueClientCriteriaAsync);
router.get('/textvalue/:clientId', criteriaController.getTextValueCriteriaAsync);
router.get('/comment/:clientId', criteriaController.getCommentCriteriaAsync);
router.get('/document/:clientId', criteriaController.getDocumentCriteriaAsync);
router.get('/numberrange/:clientId', criteriaController.getNumberRangeCriteriaAsync);
router.get('/floatrange/:clientId', criteriaController.getFloatRangeCriteriaAsync);

module.exports = router;