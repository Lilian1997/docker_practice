import Stack from "@mui/material/Stack";
import { useContext, useEffect } from "react";
import { Context, UserDataContent } from "../context/Context";
import { useFetchData } from "../hooks/useFetchData";

export const UserData: React.FC<UserDataContent> = ({
  name,
  age,
  location,
}) => {
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

export const UserDataList = () => {
  const { userDataArray } = useContext(Context);
  const fetchDataHandler = useFetchData();

  useEffect(() => {
    fetchDataHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {userDataArray.map((userData, index) => (
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
