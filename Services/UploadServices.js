// import ImageKit from 'imagekit-react-native';

import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

export const uploadImage = async (file) => {
  try {
    const response = await imagekit.upload({
      file: file.uri,
      fileName: file.name || `file_${Date.now()}`,
      useUniqueFileName: true,
    });
    return response;
  } catch (error) {
    console.error('ImageKit upload error:', error);
    throw error;
  }
};

export default imagekit;

// export const uploadVideo = async (file) => {
//   try {
//     const response = await imagekit.upload({
//       file: file.uri,
//       fileName: file.name || `video_${Date.now()}`,
//       useUniqueFileName: true,
//     });
//     return response;
//   } catch (error) {
//     console.error('ImageKit video upload error:', error);
//     throw error;
//   }
// };