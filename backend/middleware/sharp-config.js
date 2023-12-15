const sharp = require('sharp');
const fs = require('fs');

module.exports = (req, res, next) => {

    if (!req.file) {
        return next()
    }

    const filePath = req.file.path;
    const fileExt = req.file.filename.split('.').pop();
    const fileName = req.file.filename.slice(0, -(fileExt.length + 1));

    const webpFileName = `${fileName}.webp`;

    sharp(filePath)
        .resize({ width: 160, height: 240 })
        .toFormat('webp')
        .toFile(`images\\${fileName}.webp`)
        .then(() => {
            req.file.filename = webpFileName;

            fs.unlink(`images/${fileName}.${fileExt}`, (err) => {
                if (err) {
                    console.error(err);
                }
                next();
            });
        })
        .catch((error) => {
            console.error(error);
        });
};