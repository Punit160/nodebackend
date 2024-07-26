import {v2 as cloudinary} from 'cloudinary';
import { response } from 'express';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async(localFilepath) => {
   try {
        if(!localFilepath) return null

        cloudinary.uploader.upload(localFilepath, {
          resource_type : auto,
        })
        console.log('file upload on cloudinary', response.url);
   } catch (error) {
         fs.unlinkSync(localFilepath)
   }
}

export {uploadOnCloudinary}

