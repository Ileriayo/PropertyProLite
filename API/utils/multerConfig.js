import multer from 'multer';
import DataUri from 'datauri';
import path from 'path';

const storage = multer.memoryStorage();

const multerUploads = multer({ storage }).single('image_url');
const dUri = new DataUri();

const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

export { multerUploads, dataUri };
