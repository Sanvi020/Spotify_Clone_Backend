// This is the code for artist to upload music
const musicmodels = require('../models/music.models');
const {uploadMusicFile} = require('../services/storage.services');
const jwt = require('jsonwebtoken');
const albumModel = require('../models/albums.models')

async function createMusic(req, res) {


    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'artist') {
        return res.status(403).json({
            message: 'You dont have access to create music'
        });
    }

    const { title } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: 'Music file is required' });
    }

    const result = await uploadMusicFile(file.buffer);

    const music = await musicmodels.create({
        uri: result.url,
        title,
        artist: decoded.id
    });

    return res.status(201).json({
        message: 'Music created successfully',
        music: {
            id: music._id,
            uri: music.uri,
            title: music.title,
            artist: music.artist
        }
    });

} catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
}

}


async function createAlbum(req, res) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "artist") {
            return res.status(403).json({
                message: "You dont have the access to create album"
            });
        }

        const { title, musicIDs } = req.body;

        const album = await albumModel.create({
            title,
            artist: decoded.id,
            music: musicIDs
        });

        return res.status(201).json({
            message: "Album created successfully",
            album: {
                id: album._id,
                title: album.title,
                artist: album.artist,
                music: album.music
            }
        });
    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

async function getallmusic(req,res) {

    const music = await musicmodels.find()
        res.status(200).json({
            message : "Music fecthed succesfully",
            music: music
        })
}
async function getallalbums(req,res){
    const albums = await albumModel.find()
    res.status(201).json({
        message : "Albums Fetched succesfully",
        albums :  albums
    })
}

module.exports = {createMusic,createAlbum, getallmusic, getallalbums};