import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../utils/fetchData";

interface UserDataState {
  name: string;
  age: number;
  location: string;
}

const initialState: UserDataState[] = [
  {
    name: "",
    age: 0,
    location: "",
  },
];

const userDataListSlice = createSlice({
  name: "userDataList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, () => {
        console.log("fetchUserData.pending");
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export const fetchUserData = createAsyncThunk(
  "userDataList/fetchUserData",
  async () => {
    const response = await fetchData("http://localhost:2407/User");
    return response as UserDataState[];
  }
);

export default userDataListSlice.reducer;
