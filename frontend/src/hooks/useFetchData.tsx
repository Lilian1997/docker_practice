import { useEffect } from "react";
import { AppDispatch, RootState } from "../state/store";
import { fetchUserData } from "../state/userDataListSlice";
import { useDispatch, useSelector } from "react-redux";

export const useFetchData = (url: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const userDataArray = useSelector((state: RootState) => state.userDataList);

  const getUserDataArray = async () => {
    dispatch(fetchUserData(url));
  };

  useEffect(() => {
    getUserDataArray();
  }, []);

  return { userDataArray, getUserDataArray };
};
