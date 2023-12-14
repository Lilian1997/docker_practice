import "./App.css";
import InputField from "./InputField";
import Stack from "@mui/material/Stack";
import { Context } from "./Context";
import { useContext } from "react";
import CustomButton from "./CustomButton";
import { useDecreButton } from "./useDecreButton";
import { useIncreButton } from "./useIncreButton";
import { useGetNewInputValue } from "./useGetNewInputValue";
import { DataSection } from "./DataSection";

function App() {
  const { total, inputValue } = useContext(Context);
  const IncrementHandler = useIncreButton();
  const DecrementHandler = useDecreButton();
  const InputChangeHandler = useGetNewInputValue();

  return (
    <div className="App">
      <h1>Counter</h1>
      <div data-testid="total">{total}</div>

      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
      >
        <CustomButton usage="decrement" onClick={DecrementHandler} />
        <InputField value={inputValue} onChange={InputChangeHandler} />
        <CustomButton usage="increment" onClick={IncrementHandler} />
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
      <DataSection></DataSection>
    </div>
  );
}

export default App;
