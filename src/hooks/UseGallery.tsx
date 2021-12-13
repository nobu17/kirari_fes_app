import React, { useEffect, useState } from "react";
import {
  getGalleryImages,
  getGalleryImagesList,
  postGalleryImages,
} from "../lib/GalleryApi";
import { uploadImageWithCompressAndThumbNail, updateAllCacheMetaData } from "../lib/StorageApi";
import { v4 as uuidv4 } from "uuid";

export type ImageInfo = {
  imageUrl: string;
  thumbNailUrl: string;
  authorInfo: string;
};

export type GalleryInfo = {
  id: string;
  images: ImageInfo[];
};

const baseUrl = "/gallery";
const initImages: Array<ImageInfo> = [];

export default function useGallery(id: string) {
  const [images, setImages] = useState(initImages);
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      return;
    }
    getGalleryImages(id)
      .then((res) => setImages(res.images))
      .then(() => setLoading(false))
      .catch((err) => setError(err));
  }, []);

  const addNewImage = () => {
    setImages([...images, { imageUrl: "", thumbNailUrl: "", authorInfo: "" }]);
  };

  const exchangeInfo = (source: number, destination: number) => {
    const items = Array.from(images);
    const [reorderedItem] = items.splice(source, 1);
    items.splice(destination, 0, reorderedItem);
    setImages(items);
  };

  const isEmptyInfo = (index: number): boolean => {
    const target = images[index];
    if (target.authorInfo === "" && target.imageUrl === "") {
      return true;
    }
    return false;
  };

  const updateAuthorInfo = (authorInfo: string, index: number) => {
    let target = images[index];
    target.authorInfo = authorInfo;
    setImages([...images.slice(0, index), target, ...images.slice(index + 1)]);
  };

  const updateImageFile = async (image: File, index: number) => {
    setLoading(true);
    try {
      const name = uuidv4() + ".jpg";
      // const newUrl = await uploadImageWithCompress(baseUrl, name, image);
      const [fUrl, thumbUrl] = await uploadImageWithCompressAndThumbNail(
        baseUrl,
        name,
        image
      );
      let target = images[index];
      target.imageUrl = fUrl;
      target.thumbNailUrl = thumbUrl;
      const newImages = [
        ...images.slice(0, index),
        target,
        ...images.slice(index + 1),
      ];
      setImages(newImages);
    } catch (err) {
      console.error("failed to upload file", err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = (index: number) => {
    setImages([...images.slice(0, index), ...images.slice(index + 1)]);
  };

  const post = async () => {
    setLoading(true);
    try {
      await postGalleryImages({ id: id, images: images });
    } catch (err) {
      console.error(err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const updateCacheMetadata = async () => {
    setLoading(true);
    try {
      await updateAllCacheMetaData(baseUrl);
    } catch (err) {
      console.error(err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return {
    images,
    exchangeInfo,
    addNewImage,
    isEmptyInfo,
    deleteImage,
    updateImageFile,
    updateAuthorInfo,
    post,
    updateCacheMetadata,
    error,
    loading,
  };
}

const initGalleries: Array<GalleryInfo> = [];

export function useGalleries(ids: Array<string>) {
  const [galleries, setGalleries] = useState(initGalleries);
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGalleryImagesList(ids)
      .then((galleries) => setGalleries(galleries))
      .then(() => setLoading(false))
      .catch((err) => setError(err));
  }, []);

  return {
    galleries,
    error,
    loading,
  };
}
