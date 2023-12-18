import axios, { AxiosResponse } from "axios";
import { UserData } from "./Context";

export const fetchData = async (url: string): Promise<UserData[]> => {
  try {
    const response: AxiosResponse = await axios.get(url);
    const getAllUserData: UserData[] = response.data.data;
    return getAllUserData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
