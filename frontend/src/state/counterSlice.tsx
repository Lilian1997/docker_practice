import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { decrement, increment } from "../utils/calculateSum";

interface CounterState {
  total: number;
  inputValue: number;
}

const initialState: CounterState = {
  total: 0,
  inputValue: 1,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.total = increment(state.total, action.payload);
      state.inputValue = 1;
    },
    decrementByAmount: (state, action: PayloadAction<number>) => {
      state.total = decrement(state.total, action.payload);
      state.inputValue = 1;
    },
    setInputValue: (state, action: PayloadAction<number>) => {
      state.inputValue = action.payload;
    },
  },
});

export const { incrementByAmount, decrementByAmount, setInputValue } =
  counterSlice.actions;
export default counterSlice.reducer;
