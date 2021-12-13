import {
  storage,
  storeageRef,
  storageUploadBytes,
  storageGetDownloadURL,
  storageUpdateMetadata,
  storageListAll,
} from "./Firebase";
import {
  getCompressImageFileAsync,
  getCompressThumbNailImageFileAsync,
} from "./ImageUtil";

export const uploadFile = async (dir: string, name: string, file: File) => {
  try {
    let refs = storeageRef(storage, dir);

    // need to cache
    const metadata = {
      cacheControl: "public,max-age=100000",
    };
    refs = storeageRef(refs, name);
    const snapshot = await storageUploadBytes(refs, file, metadata);
    return await storageGetDownloadURL(snapshot.ref);
  } catch (err) {
    console.error("upload is fail", err);
    throw err;
  }
};

export const getFileList = async (dir: string) => {
  try {
    let refs = storeageRef(storage, dir);
    const results = await storageListAll(refs);
    return results.items;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateAllCacheMetaData = async (dir: string) => {
  try {
    const metadata = {
      cacheControl: "public,max-age=100000",
    };
    const lists = await getFileList(dir);
    const result = await storageUpdateMetadata(lists[0], metadata);
    console.log(result);
    for (const item of lists) {
      await storageUpdateMetadata(item, metadata);
    }
  } catch (err) {
    throw err;
  }
};

export const updateCacheMetaData = async (dir: string, name: string) => {
  try {
    let refs = storeageRef(storage, dir);
    refs = storeageRef(refs, name);
    const metadata = {
      cacheControl: "public,max-age=100000",
      contentType: "image/jpeg",
    };
    const result = await storageUpdateMetadata(refs, metadata);
    console.log(result);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const uploadImageWithCompress = async (
  dir: string,
  name: string,
  file: File
) => {
  const newFile = await getCompressImageFileAsync(file);
  return await uploadFile(dir, name, newFile);
};

export const uploadImageWithCompressAndThumbNail = async (
  dir: string,
  name: string,
  file: File
) => {
  const ext = ".jpg";
  const newFile = await getCompressImageFileAsync(file);
  const thumbFile = await getCompressThumbNailImageFileAsync(file);

  const thumbName = name.replace(ext, "_thumb.jpg");

  const fileUrl = await uploadFile(dir, name, newFile);
  const thumbUrl = await uploadFile(dir, thumbName, thumbFile);

  return [fileUrl, thumbUrl];
};
