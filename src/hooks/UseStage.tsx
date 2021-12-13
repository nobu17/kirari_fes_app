import React, { useEffect, useState } from "react";
import { getStageInfo, postStageInfo } from "../lib/StageApi";

type StageInfo = {
  name: string;
  kindName: string;
  title: string;
  message: string;
  movieUrl: string;
};

const initStage: StageInfo[] = [];
const defaultStage: StageInfo = {
  name: "",
  kindName: "",
  title: "",
  message: "",
  movieUrl: "",
};

export default function useStage(id: string) {
  const [stages, setStages] = useState(initStage);
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      return;
    }
    getStageInfo(id)
      .then((res) => setStages(res))
      .then(() => setLoading(false))
      .catch((err) => setError(err));
  }, []);

  const addNewStage = () => {
    setStages([...stages, defaultStage]);
  };

  const updateInfo = (info: StageInfo, index: number) => {
    let target = stages[index];
    target = {...info};
    setStages([...stages.slice(0, index), target, ...stages.slice(index + 1)]);
  };

  const exchangeInfo = (source: number, destination: number) => {
    const items = Array.from(stages);
    const [reorderedItem] = items.splice(source, 1);
    items.splice(destination, 0, reorderedItem);
    setStages(items);
  };

  const isEmptyInfo = (index: number): boolean => {
    const target = stages[index];
    if (
      target.kindName === "" &&
      target.message === "" &&
      target.movieUrl === "" &&
      target.name === "" &&
      target.title === ""
    ) {
      return true;
    }
    return false;
  };

  const deleteStage = (index: number) => {
    setStages([...stages.slice(0, index), ...stages.slice(index + 1)]);
  };

  const post = async () => {
    setLoading(true);
    try {
      await postStageInfo(id, stages);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    stages,
    addNewStage,
    updateInfo,
    exchangeInfo,
    isEmptyInfo,
    deleteStage,
    post,
    error,
    loading,
  };
}
