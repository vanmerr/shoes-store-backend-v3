const multer = require('multer');
const { storage } = require('../configs/database.config');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// Multer storage configuration
const multerStorage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|mp3|mp4/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Only images, mp3, and mp4 files are allowed!'));
    }
};

const uploadSingle = multer({
    storage: multerStorage,
    fileFilter: fileFilter
}).single('file');

const uploadMultiple = multer({
    storage: multerStorage,
    fileFilter: fileFilter
}).array('files', 10); // Allow up to 10 files

const uploadSingleFile = (req, res, next) => {
    uploadSingle(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        try {
            const uniqueName = `uploads/${Date.now()}-${uuidv4()}${path.extname(req.file.originalname)}`;
            const fileRef = storage.file(uniqueName);
            await fileRef.save(req.file.buffer, {
                metadata: { contentType: req.file.mimetype },
                public: true, // Make the file publicly accessible
            });
            req.fileUrl = fileRef.publicUrl();
            next();
        } catch (error) {
            return res.status(500).json({ message: 'Error uploading file', error });
        }
    });
};

const uploadMultipleFiles = (req, res, next) => {
    uploadMultiple(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        try {
            const urls = await Promise.all(req.files.map(async (file) => {
                const uniqueName = `uploads/${Date.now()}-${uuidv4()}${path.extname(file.originalname)}`;
                const fileRef = storage.file(uniqueName);
                await fileRef.save(file.buffer, {
                    metadata: { contentType: file.mimetype },
                    public: true, // Make the file publicly accessible
                });
                return fileRef.publicUrl();
            }));

            req.fileUrls = urls;
            next();
        } catch (error) {
            return res.status(500).json({ message: 'Error uploading files', error });
        }
    });
};

module.exports = {
    uploadSingleFile,
    uploadMultipleFiles
};