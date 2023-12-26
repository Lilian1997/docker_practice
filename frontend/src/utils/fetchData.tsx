import axios, { AxiosResponse } from "axios";
import { UserDataState } from "../state/userDataListSlice";

export const fetchData = async (url: string): Promise<UserDataState[]> => {
  try {
    const response: AxiosResponse = await axios.get(url);
    const getUserDataArray: UserDataState[] = response.data.data;
    return getUserDataArray;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
