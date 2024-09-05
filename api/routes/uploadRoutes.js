import express from 'express';
import multer from 'multer';
import { converterDOCXToJson } from '../utils/docxConverser.js'; // Adjust path as needed
import { converterPDFToJson } from '../utils/pdfConverser.js'; // Adjust path as needed

const router = express.Router();

// Configure multer to use memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to handle file upload and conversion to JSON
router.post('/convert', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const { mimetype, buffer } = req.file;

  try {
    let jsonContent;

    if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      jsonContent = await converterDOCXToJson(buffer);
    } else if (mimetype === 'application/pdf') {
      jsonContent = await converterPDFToJson(buffer);
    } else {
      return res.status(400).json({ message: 'Unsupported file type' });
    }

    res.json({ json: jsonContent });
  } catch (error) {
    res.status(500).json({ message: 'Error processing file', error: error.message });
  }
});

export default router;
