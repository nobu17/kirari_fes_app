import CommonFireStoreApi from "./CommonStoreApi";

export type StaffInfo = {
  schoolName: string;
  members: string;
  message: string;
  imageUrl: string;
  movieUrl: string;
};


const api = new CommonFireStoreApi("/staff");

export const getStaffInfo = async (id: string): Promise<Array<StaffInfo>> => {
  return await api.get<StaffInfo>(id);
};

export const postStaffInfo = async (id: string, data: Array<StaffInfo>) => {
  return await api.post<StaffInfo>(id, data);
};
