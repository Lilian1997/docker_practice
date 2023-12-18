import Stack from "@mui/material/Stack";
import { useContext, useEffect } from "react";
import { Context } from "./Context";
import { useFetchData } from "./useFetchData";

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
  const { allUserData } = useContext(Context);
  const fetchDataHandler = useFetchData();

  useEffect(() => {
    fetchDataHandler();
  }, []);

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
