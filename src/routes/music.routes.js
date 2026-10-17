const express = require('express');
const { createMusic, createAlbum,getallmusic,getallalbums} = require('../controllers/music.controllers');
const multer = require('multer');
const {authArtist,authUser} = require('../middlewares/auth.middleware')


const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();
router.post('/upload', authArtist , upload.single('file'), createMusic);
router.post('/album', authArtist, createAlbum);

router.get('/',authUser ,getallmusic)
router.get('/albums', authUser,getallalbums);

module.exports = router;