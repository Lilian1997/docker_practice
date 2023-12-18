import { useContext } from "react";
import { Context } from "./Context";
import { fetchData } from "./fetchData";
import { UserData } from "./Context";

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
