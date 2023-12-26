import InputField from "./InputField";
import CustomButton from "./CustomButton";
import Stack from "@mui/material/Stack";
import { useCalculateSum } from "../hooks/useCalculateSum";

const Counter = () => {
  const {
    total,
    inputValue,
    inputHandler,
    isNaNChecked,
    decreButtonClicked,
    increButtonClicked,
  } = useCalculateSum();

  // const total = useSelector((state: RootState) => state.counter.total);
  // const inputValue = useSelector(
  //   (state: RootState) => state.counter.inputValue
  // );
  // const dispatch = useDispatch();

  // const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //   const getInputValue = parseInt(e.target.value);
  //   dispatch(setInputValue(getInputValue));
  // };

  // const isNaNChecked = (e: FocusEvent<HTMLInputElement>) => {
  //   const inputValueIsNaN = isNaN(parseInt(e.target.value))
  //     ? 0
  //     : parseInt(e.target.value);
  //   dispatch(setInputValue(inputValueIsNaN));
  // };

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
        <CustomButton usage="decrement" onClick={decreButtonClicked} />

        <InputField
          value={inputValue}
          onChange={inputHandler}
          onBlur={isNaNChecked}
        />

        <CustomButton usage="increment" onClick={increButtonClicked} />
      </Stack>
    </>
  );
};

export default Counter;
