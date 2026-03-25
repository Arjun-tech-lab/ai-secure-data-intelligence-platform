const express = require('express');
const router = express.Router();

const {
  analyzeInput,
  analyzeFile
} = require('../controllers/analyzeController');

const upload = require('../config/multer');

router.post('/analyze', analyzeInput);
router.post('/analyze-file', upload.single('file'), analyzeFile);

module.exports = router;