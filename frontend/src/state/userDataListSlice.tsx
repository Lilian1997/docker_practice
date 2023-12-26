import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../utils/fetchData";

export interface UserDataState {
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
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        console.error("fetchUserData.rejected", action.error);
      });
  },
});

export const fetchUserData = createAsyncThunk(
  "userDataList/fetchUserData",
  async (url: string) => {
    const response = await fetchData(url);
    return response as UserDataState[];
  }
);

export default userDataListSlice.reducer;
