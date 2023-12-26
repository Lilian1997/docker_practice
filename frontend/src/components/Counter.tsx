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
