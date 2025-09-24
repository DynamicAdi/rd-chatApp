import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";
import multer from "multer";
import { Readable } from "stream";
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API,
    api_secret: process.env.CLOUD_API_SEC
})


const storage = multer.memoryStorage();
export const upload = multer({ storage });


export const uploadToCloudinary = (fileBuffer: any, folder = "myFiles") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        upload_preset: "myFiles"
      },
      (error, result: any) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );

    const readableStream = new Readable();
    readableStream.push(fileBuffer);
    readableStream.push(null);
    readableStream.pipe(uploadStream);
  });
};
