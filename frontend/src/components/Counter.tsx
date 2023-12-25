import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import InputField from "./InputField";
import CustomButton from "./CustomButton";
import Stack from "@mui/material/Stack";
import {
  decrementByAmount,
  incrementByAmount,
  setInputValue,
} from "../state/counterSlice";
import { ChangeEvent } from "react";

const Counter = () => {
  const total = useSelector((state: RootState) => state.counter.total);
  const inputValue = useSelector(
    (state: RootState) => state.counter.inputValue
  );
  const dispatch = useDispatch();

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const getInputValue = isNaN(parseInt(e.target.value))
      ? 0
      : parseInt(e.target.value);

    dispatch(setInputValue(getInputValue));
  };

  return (
    <>
      <h1>Counter</h1>
      <div data-testid="total">{total}</div>

      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
      >
        <CustomButton
          usage="decrement"
          onClick={() => dispatch(decrementByAmount(inputValue))}
        />

        <InputField value={inputValue} onChange={inputHandler} />

        <CustomButton
          usage="increment"
          onClick={() => dispatch(incrementByAmount(inputValue))}
        />
      </Stack>
    </>
  );
};

export default Counter;
