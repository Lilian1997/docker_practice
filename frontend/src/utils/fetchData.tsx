import axios, { AxiosResponse } from "axios";
import { UserDataContent } from "../context/Context";

export const fetchData = async (url: string): Promise<UserDataContent[]> => {
  try {
    const response: AxiosResponse = await axios.get(url);
    const getUserDataArray: UserDataContent[] = response.data.data;
    return getUserDataArray;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
