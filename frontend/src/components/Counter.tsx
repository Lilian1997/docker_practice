import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import InputField from "./InputField";
import CustomButton from "./CustomButton";
import Stack from "@mui/material/Stack";
import { useDecreButton, useIncreButton } from "../hooks/useCalculateSum";
import { useGetNewInputValue } from "../hooks/useGetNewInputValue";
import { decrement, incrementByAmount } from "../state/counterSlice";

const Counter = () => {
  const total = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  const incrementHandler = useIncreButton();
  const decrementHandler = useDecreButton();
  const inputChangeHandler = useGetNewInputValue();

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
        <CustomButton usage="decrement" onClick={() => dispatch(decrement())} />
        <CustomButton
          usage="decrement"
          onClick={() => dispatch(incrementByAmount(10))}
        />
        {/* <InputField value={inputValue} onChange={inputChangeHandler} /> */}
        <CustomButton usage="increment" onClick={incrementHandler} />
      </Stack>
      <br />
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
      >
        <div>姓名</div>
        <div>年齡</div>
        <div>居住地</div>
      </Stack>
    </>
  );
};

export default Counter;
