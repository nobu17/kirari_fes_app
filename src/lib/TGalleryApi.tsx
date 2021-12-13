import CommonFireStoreApi from "./CommonStoreApi";

export type TGalleryInfo = {
  title: string;
  message: string;
  imageUrl: string;
  thumbNailUrl: string;
};

const api = new CommonFireStoreApi("/tgallery");

export const getTGalleryInfo = async (
  id: string
): Promise<Array<TGalleryInfo>> => {
  return await api.get<TGalleryInfo>(id);
};

export const postTGalleryInfo = async (
  id: string,
  data: Array<TGalleryInfo>
) => {
  return await api.post<TGalleryInfo>(id, data);
};
