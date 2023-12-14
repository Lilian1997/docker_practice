import Stack from "@mui/material/Stack";
import { useContext } from "react";
import { Context } from "./Context";

export const UserData = () => {
  const { userData, setUserData } = useContext(Context);

  return (
    <Stack
      spacing={{ xs: 1, sm: 2 }}
      direction="row"
      useFlexGap
      flexWrap="wrap"
    >
      <div>{userData.name}</div>
      <div>{userData.age}</div>
      <div>{userData.location}</div>
    </Stack>
  );
};

export const DataSection = () => {
  return {};
};
