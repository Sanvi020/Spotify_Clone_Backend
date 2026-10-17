
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const ImagekitClient = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadMusicFile(file) {
    console.log("Starting ImageKit upload...");

    try {
        const convertedFile = await toFile(file, "music.mp3");

        const result = await ImagekitClient.files.upload({
            file: convertedFile,
            fileName: "music_" + Date.now() + ".mp3",
            folder: "SpotifyClone/music"
        });

        console.log("ImageKit upload completed!");

        return result;

    } catch (error) {
        console.error("ImageKit upload failed:", error);
        throw error;
    }
}

module.exports = { uploadMusicFile };

