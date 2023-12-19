import "./assets/App.css";
import InputField from "./components/InputField";
import Stack from "@mui/material/Stack";
import { Context } from "./context/Context";
import { useContext } from "react";
import CustomButton from "./components/CustomButton";
import { useDecreButton } from "./hooks/useDecreButton";
import { useIncreButton } from "./hooks/useIncreButton";
import { useGetNewInputValue } from "./hooks/useGetNewInputValue";
import { DataSection } from "./components/DataSection";

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
