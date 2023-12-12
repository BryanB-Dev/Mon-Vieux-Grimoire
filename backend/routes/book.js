const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const sharp = require('../middleware/sharp-config');

const bookCtrl = require('../controllers/book');

router.post('/', auth, multer, sharp, bookCtrl.createBook);
router.post('/:id/rating', auth, bookCtrl.createRating);
router.put('/:id', auth, multer, sharp, bookCtrl.modifyBook);
router.delete('/:id', auth, bookCtrl.deleteBook);
router.get('/:id', bookCtrl.getOneBook);
router.get('/', bookCtrl.getAllBooks);

module.exports = router;