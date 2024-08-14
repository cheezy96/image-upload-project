const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

// Initialize Express app
const app = express();

// Enable CORS
app.use(cors());

// Set storage engine for multer
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB limit
}).single('image');

// Route for file upload
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Upload failed', error: err.message });
    }
    res.status(200).json({ message: 'Image uploaded successfully', filePath: `/uploads/${req.file.filename}` });
  });
});

// Make uploads folder publicly accessible
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
