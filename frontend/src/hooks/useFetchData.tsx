import { useContext } from "react";
import { Context } from "../context/Context";
import { fetchData } from "../utils/fetchData";
import { UserDataContent } from "../context/Context";

export const useFetchData = () => {
  const { setUserDataArray } = useContext(Context);

  const getUserDataArray = async () => {
    let getAllUserDataDetail: UserDataContent[] = await fetchData(
      "http://localhost:2407/User"
    );
    setUserDataArray(getAllUserDataDetail);
  };

  return getUserDataArray;
};
