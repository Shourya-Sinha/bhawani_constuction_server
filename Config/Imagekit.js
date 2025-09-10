import ImageKit from 'imagekit';
import dotenv from 'dotenv';
import fs from"fs";

dotenv.config();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

export const uploadImage = (filePath, fileName) => {
  return new Promise((resolve, reject) => {
    try {
      const fileData = fs.readFileSync(filePath);

      imagekit.upload(
        {
          file: fileData,   // <-- pass file buffer, not path
          fileName: fileName,
        },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    } catch (err) {
      reject(err);
    }
  });
};
export default imagekit;

// export const uploadImage = async (file) => {
//   try {
//     const response = await imagekit.upload({
//       file: file.uri,
//       fileName: file.name || `file_${Date.now()}`,
//       useUniqueFileName: true,
//     });
//     return response;
//   } catch (error) {
//     console.error('ImageKit upload error:', error);
//     throw error;
//   }
// };

