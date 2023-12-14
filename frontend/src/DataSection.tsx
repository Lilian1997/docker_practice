import Stack from "@mui/material/Stack";
import { useContext, useEffect } from "react";
import { Context } from "./Context";
import axios, { AxiosError, AxiosResponse } from "axios";

type UserDataProps = {
  name: string;
  age: number;
  location: string;
};

export const UserData: React.FC<UserDataProps> = ({ name, age, location }) => {
  return (
    <Stack
      spacing={{ xs: 1, sm: 2 }}
      direction="row"
      useFlexGap
      flexWrap="wrap"
    >
      <div>{name}</div>
      <div>{age}</div>
      <div>{location}</div>
    </Stack>
  );
};

export const DataSection = () => {
  const { allUserData, setAllUserData } = useContext(Context);

  const fetchData = async () => {
    let url = "http://localhost:2407/User";

    await axios
      .get(url)
      .then(function (response: AxiosResponse) {
        let getAllUserData = response.data.data;
        setAllUserData(getAllUserData);
      })
      .catch(function (error: AxiosError) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <>
      {allUserData.map((userData, index) => (
        <UserData
          key={index}
          name={userData.name}
          age={userData.age}
          location={userData.location}
        ></UserData>
      ))}
    </>
  );
};
