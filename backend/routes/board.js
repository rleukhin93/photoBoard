var express = require('express');
var router = express.Router();
const boardController = require('../controllers/boardController');

/* GET home page. */
router.get('/', boardController.get);
router.post('/', boardController.create);
router.put('/:id', boardController.update);
router.patch('/:id', boardController.update);
router.delete('/:id', boardController.delete);

module.exports = router;
