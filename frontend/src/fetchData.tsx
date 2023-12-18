import axios, { AxiosError, AxiosResponse } from "axios";
import { UserData } from "./Context";

// export const fetchData = async (): Promise<UserData[]> => {
//   // const { setAllUserData } = useContext(Context);

//   let url = "http://localhost:2407/User";
//   let getAllUserData: UserData[];
//   await axios
//     .get(url)
//     .then(function (response: AxiosResponse) {
//       getAllUserData = response.data.data;
//       // setAllUserData(getAllUserData);
//       return getAllUserData;
//     })
//     .catch(function (error: AxiosError) {
//       console.log(error);

//     });

//   // return getAllUserData;
// };
export const fetchData = async (): Promise<UserData[]> => {
  try {
    const url = "http://localhost:2407/User";
    const response: AxiosResponse = await axios.get(url);

    // 注意這裡直接使用 response.data，而不是 response.data.data
    const getAllUserData: UserData[] = response.data.data;

    // 如果需要 setAllUserData，可以在這裡執行
    // const { setAllUserData } = useContext(Context);
    // setAllUserData(getAllUserData);

    return getAllUserData;
  } catch (error) {
    console.log(error);
    // 如果需要重新拋出錯誤，可以這樣做
    throw error;
  }
};
