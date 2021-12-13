import CommonFireStoreApi from "./CommonStoreApi";

type StageInfo = {
  name: string;
  kindName: string;
  title: string;
  message: string;
  movieUrl: string;
};

const api = new CommonFireStoreApi("/stages");

export const getStageInfo = async (id: string): Promise<Array<StageInfo>> => {
  return await api.get<StageInfo>(id);
};

export const postStageInfo = async (id: string, data: Array<StageInfo>) => {
  return await api.post<StageInfo>(id, data);
};
