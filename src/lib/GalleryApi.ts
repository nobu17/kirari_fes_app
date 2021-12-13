import {
  store,
  storeCollection,
  storeDoc,
  storeGetDoc,
  storeUpdateDoc,
  storeSetDoc,
} from "./Firebase";

type ImageInfo = {
  imageUrl: string;
  thumbNailUrl: string;
  authorInfo: string;
};

type GalleryInfo = {
  id: string;
  images: ImageInfo[];
};

export const getGalleryImages = async (id: string): Promise<GalleryInfo> => {
  const docSnap = await getSnap(id);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      images: data.images,
    };
  } else {
    return {
      id: id,
      images: [],
    };
  }
};

export const getGalleryImagesList = async (
  ids: Array<string>
): Promise<Array<GalleryInfo>> => {
  const galleries: Array<GalleryInfo> = [];
  for (const id of ids) {
    const gallery = await getGalleryImages(id);
    galleries.push(gallery);
  }
  return galleries;
};

export const postGalleryImages = async (data: GalleryInfo) => {
  const doc = await getDoc(data.id);
  const snap = await storeGetDoc(doc);
  if (snap.exists()) {
    await storeUpdateDoc(doc, {
      images: data.images,
    });
  } else {
    await storeSetDoc(doc, {
      images: data.images,
    });
  }
};

const getSnap = async (id: string) => {
  return await storeGetDoc(getDoc(id));
};

const getDoc = (id: string) => {
  return storeDoc(getCollection(), id);
};

const getCollection = () => {
  return storeCollection(store, "/gallery");
};
