import { config, uploader } from 'cloudinary';

class CloudinaryConfig {
  static async cloudinaryConfig(req, res, next) {
    await config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    return next();
  }
}

export { CloudinaryConfig, uploader };
