var express = require('express');
var router = express.Router({mergeParams: true});
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
const photoController = require('../controllers/photoController');

/* GET home page. */
router.get('/', photoController.get);
router.post('/', photoController.create);
router.post('/tagging', photoController.tagging);
router.put('/:id', photoController.update);
router.patch('/:id', photoController.update);
router.delete('/:id', photoController.delete);
router.get('/:id',photoController.getImage);

module.exports = router;
