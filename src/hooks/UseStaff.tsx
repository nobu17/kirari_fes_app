import React, { useEffect, useState } from "react";
import { getStaffInfo, postStaffInfo, StaffInfo } from "../lib/StaffApi";
import { uploadImageWithCompress } from "../lib/StorageApi";
import { v4 as uuidv4 } from "uuid";

const initStaffs: StaffInfo[] = [];
const defaultStaff: StaffInfo = {
  schoolName: "",
  members:"",
  message: "",
  imageUrl: "",
  movieUrl: "",
};

const baseUrl = "/staffs";

export default function useStaff(id: string) {
  const [staffs, setStaffs] = useState(initStaffs);
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      return;
    }
    getStaffInfo(id)
      .then((res) => setStaffs(res))
      .then(() => setLoading(false))
      .catch((err) => setError(err));
  }, []);

  const addNewStaff = () => {
    setStaffs([...staffs, defaultStaff]);
  };

  const updateInfo = (info: StaffInfo, index: number) => {
    let target = staffs[index];
    target = { ...info };
    setStaffs([...staffs.slice(0, index), target, ...staffs.slice(index + 1)]);
  };

  const exchangeInfo = (source: number, destination: number) => {
    const items = Array.from(staffs);
    const [reorderedItem] = items.splice(source, 1);
    items.splice(destination, 0, reorderedItem);
    setStaffs(items);
  };

  const deleteStaff = (index: number) => {
    setStaffs([...staffs.slice(0, index), ...staffs.slice(index + 1)]);
  };

  const uploadImage = async (image: File, index: number) => {
    setLoading(true);
    try {
      const name = uuidv4() + ".jpg";
      const newUrl = await uploadImageWithCompress(baseUrl, name, image);
      let target = staffs[index];
      target.imageUrl = newUrl;
      const newItem = [
        ...staffs.slice(0, index),
        target,
        ...staffs.slice(index + 1),
      ];
      setStaffs(newItem);
    } catch (err) {
      console.error("failed to upload file", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const isEmptyInfo = (index: number): boolean => {
    const target = staffs[index];
    if (
      target.schoolName === "" &&
      target.members === "" &&
      target.message === "" &&
      target.movieUrl === "" &&
      target.imageUrl === ""
    ) {
      return true;
    }
    return false;
  };

  const post = async () => {
    setLoading(true);
    try {
      await postStaffInfo(id, staffs);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    staffs,
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
