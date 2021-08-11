const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require("aws-sdk");
const BUCKET = 'image.mileverse.com/article'
aws.config.loadFromPath('../config/s3.json')

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: BUCKET,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: function(req, file, cb){
            cb(null, `${Date.now()}_${file.originalname}`);
        },
    })
})
module.exports = upload;