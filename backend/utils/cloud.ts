import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import multer from 'multer';
import { Readable } from 'stream';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_API_SEC,
  secure: true,
});

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const uploadToCloudinary = (fileBuffer: any, folder = "myFiles") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        folder: folder,
      },
      (error, result: any) => {
        if (error) return reject(error);

        const downloadUrl = cloudinary.url(result.public_id, {
          resource_type: result.resource_type,
          type: "upload",
          transformation: [
            { flags: "attachment:" + (result.original_filename || "download") }
          ]
        });

        resolve(downloadUrl);
      }
    );

    const readableStream = new Readable();
    readableStream.push(fileBuffer);
    readableStream.push(null);
    readableStream.pipe(uploadStream);
  });
};
