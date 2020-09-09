const multer = require ("multer");

const storage = multer.diskStorage(
    {
        destination: (req,file,callback) => {
            callback(null, 'public/images/profile-pics');
        },
        filename: (req,file,callback) => {
            callback(null, file.originalname)
        }
    }
)

module.exports = multer ({storage});