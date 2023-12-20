import { useContext, useEffect } from "react";
import { Context } from "../context/Context";
import { fetchData } from "../utils/fetchData";
import { UserDataContent } from "../context/Context";

export const useFetchData = (url: string) => {
  const { userDataArray, setUserDataArray } = useContext(Context);

  const getUserDataArray = async () => {
    let getAllUserDataDetail: UserDataContent[] = await fetchData(url);
    setUserDataArray(getAllUserDataDetail);
  };

  useEffect(() => {
    getUserDataArray();
  }, []);

  return { userDataArray, getUserDataArray };
};
