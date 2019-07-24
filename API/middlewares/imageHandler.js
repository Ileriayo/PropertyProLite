// import cloud from '../utils/cloudinaryConfig';
// import multerUpload from '../utils/multerConfig';
import { dataUri } from '../utils/multerConfig';
import { uploader } from '../utils/cloudinaryConfig';
// import { uploader } from '../utils/cloudinaryConfig';

class ImageHandler {
  static async imageHandler(req, res, next) {
    try {
      if (req.file && req.file.mimetype.startsWith('image/')) {
        let file;
        if (req.file) {
          file = await dataUri(req).content;
          const result = await uploader.upload(file);
          req.body.image_url = result.url;
        }
      } else if (req.file && !req.file.mimetype.startsWith('image/')) {
        return res.status(400).json({
          status: 'error',
          error: 'Invalid Image Type',
        });
      }
      return next();
    } catch (error) {
      return error;
    }
  }
}

export default ImageHandler;
