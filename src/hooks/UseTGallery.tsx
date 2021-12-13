import React, { useEffect, useState } from "react";
import {
  getTGalleryInfo,
  postTGalleryInfo,
  TGalleryInfo,
} from "../lib/TGalleryApi";
import { uploadImageWithCompress } from "../lib/StorageApi";
import { v4 as uuidv4 } from "uuid";

const initTGallery: TGalleryInfo[] = [];
const defaultTGallery: TGalleryInfo = {
  title: "",
  message: "",
  imageUrl: "",
  thumbNailUrl: "",
};

const baseUrl = "/staffs";

export default function useTGallery(id: string) {
  const [tGallery, setTGallery] = useState(initTGallery);
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      return;
    }
    getTGalleryInfo(id)
      .then((res) => setTGallery(res))
      .then(() => setLoading(false))
      .catch((err) => setError(err));
  }, []);

  const addNewStaff = () => {
    setTGallery([...tGallery, defaultTGallery]);
  };

  const updateInfo = (info: TGalleryInfo, index: number) => {
    let target = tGallery[index];
    target = { ...info };
    setTGallery([
      ...tGallery.slice(0, index),
      target,
      ...tGallery.slice(index + 1),
    ]);
  };

  const exchangeInfo = (source: number, destination: number) => {
    const items = Array.from(tGallery);
    const [reorderedItem] = items.splice(source, 1);
    items.splice(destination, 0, reorderedItem);
    setTGallery(items);
  };

  const deleteStaff = (index: number) => {
    setTGallery([...tGallery.slice(0, index), ...tGallery.slice(index + 1)]);
  };

  const uploadImage = async (image: File, index: number) => {
    setLoading(true);
    try {
      const name = uuidv4() + ".jpg";
      const newUrl = await uploadImageWithCompress(baseUrl, name, image);
      let target = tGallery[index];
      target.imageUrl = newUrl;
      const newItem = [
        ...tGallery.slice(0, index),
        target,
        ...tGallery.slice(index + 1),
      ];
      setTGallery(newItem);
    } catch (err) {
      console.error("failed to upload file", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const isEmptyInfo = (index: number): boolean => {
    const target = tGallery[index];
    if (
      target.title === "" &&
      target.message === "" &&
      target.imageUrl === ""
    ) {
      return true;
    }
    return false;
  };

  const post = async () => {
    setLoading(true);
    try {
      await postTGalleryInfo(id, tGallery);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    tGallery,
    addNewStaff,
    updateInfo,
    exchangeInfo,
    isEmptyInfo,
    uploadImage,
    deleteStaff,
    post,
    error,
    loading,
  };
}
