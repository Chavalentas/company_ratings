const express = require('express');
const router = express.Router();
const ratingsController = require('../controllers/ratings.controller.js');

router.post('/new/numberrange', ratingsController.registerNewNumberRangeRatingAsync);
router.post('/new/floatrange', ratingsController.registerNewFloatRangeRatingAsync);
router.post('/new/comment', ratingsController.registerNewCommentRatingAsync);
router.post('/new/document', ratingsController.registerNewDocumentRatingAsync);
router.post('/new/textvalue', ratingsController.registerNewTextValueRatingAsync);
router.post('/bycriterion/extended/numberrange/all', ratingsController.getAllNumericRatingsByCriterionIdExtendedAsync);
router.post('/bycriterion/extended/numberrange/all/avg', ratingsController.getAllNumericRatingsAverageByCriterionIdExtendedAsync)
router.post('/bycriterion/extended/floatrange/all', ratingsController.getAllFloatRatingsByCriterionIdExtendedAsync);
router.post('/bycriterion/extended/floatrange/all/avg', ratingsController.getAllFloatRatingsAverageByCriterionIdExtendedAsync);
router.post('/bycriterion/extended/comment/all', ratingsController.getAllCommentRatingsByCriterionIdExtendedAsync);
router.post('/bycriterion/extended/document/all', ratingsController.getAllDocumentRatingsByCriterionIdExtendedAsync);
router.post('/bycriterion/extended/textvalue/all', ratingsController.getAllTextValueRatingsByCriterionIdExtendedAsync);
router.post('/bycriterion/extended/textvalue/all/mostcommon', ratingsController.getMostCommonTextRatingFromAllByCriterionIdExtendedAsync);
router.delete('/:ratingId', ratingsController.deleteRatingAsync);
router.delete('/deleteall/client/:id', ratingsController.deleteAllClientRatingsAsync);
router.delete('/deleteall/user/:id', ratingsController.deleteAllUserRatingsAsync);
router.get('/textvalue/:clientId/:includeDeleted', ratingsController.getTextValueRatingsAsync);
router.get('/comment/:clientId/:includeDeleted', ratingsController.getCommentRatingsAsync);
router.get('/document/:clientId/:includeDeleted', ratingsController.getDocumentRatingsAsync);
router.get('/numberrange/:clientId/:includeDeleted', ratingsController.getNumberRangeRatingsAsync);
router.get('/floatrange/:clientId/:includeDeleted', ratingsController.getFloatRangeRatingsAsync);

module.exports = router;