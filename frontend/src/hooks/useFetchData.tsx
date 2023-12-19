import { useContext } from "react";
import { Context } from "../context/Context";
import { fetchData } from "../utils/fetchData";
import { UserData } from "../context/Context";

export const useFetchData = () => {
  const { setAllUserData } = useContext(Context);

  const getAllUserData = async () => {
    let getAllUserDataDetail: UserData[] = await fetchData(
      "http://localhost:2407/User"
    );
    setAllUserData(getAllUserDataDetail);
  };

  return getAllUserData;
};
