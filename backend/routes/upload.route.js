import express from 'express';
import upload from '../middlewares/upload.middleware.js';

const router = express.Router();

router.post('/', upload.array('images', 10), (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        const uploadedImages = req.files.map(file => ({
            url: file.path,
            public_id: file.filename
        }));

        res.status(200).json({
            message: 'Upload successful',
            images: uploadedImages
        });
    } catch (error) {
        res.status(500).json({ message: 'Upload failed', error: error.message });
    }
});

export default router;
