import Stack from "@mui/material/Stack";
import { UserDataContent } from "../context/Context";
import { useFetchData } from "../hooks/useFetchData";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";

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
  // const { userDataArray } = useFetchData("http://localhost:2407/User");
  const dispatch = useDispatch<AppDispatch>();
  const userDataArray = useSelector((state: RootState) => state.userDataList);

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
