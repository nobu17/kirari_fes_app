import imageCompression from "browser-image-compression";

export const getCompressImageFileAsync = async (file: File): Promise<File> => {
  const options = {
    maxSizeMB: 0.5, // 最大ファイルサイズ
    maxWidthOrHeight: 1248, // 最大画像幅もしくは高さ
    maxIteration: 35,
  };
  try {
    // 圧縮画像の生成
    return await imageCompression(file, options);
  } catch (error) {
    console.error("getCompressImageFileAsync is error", error);
    throw error;
  }
};

export const getCompressThumbNailImageFileAsync = async (file: File): Promise<File> => {
  const options = {
    maxSizeMB: 0.05, // 最大ファイルサイズ
    maxWidthOrHeight: 450, // 最大画像幅もしくは高さ
    maxIteration: 35,
  };
  try {
    // 圧縮画像の生成
    return await imageCompression(file, options);
  } catch (error) {
    console.error("getCompressThumbNailImageFileAsync is error", error);
    throw error;
  }
};

export const getDataUrlFromFile = async (file: File): Promise<string> => {
  try {
    return await imageCompression.getDataUrlFromFile(file);
  } catch (error) {
    console.error("getDataUrlFromFile is error", error);
    throw error;
  }
};
