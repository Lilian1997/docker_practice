import "./assets/App.css";
import InputField from "./components/InputField";
import Stack from "@mui/material/Stack";
import { Context } from "./context/Context";
import { useContext } from "react";
import CustomButton from "./components/CustomButton";
import { useDecreButton, useIncreButton } from "./hooks/useCalculateSum";
import { useGetNewInputValue } from "./hooks/useGetNewInputValue";
import { UserDataList } from "./components/UserDataList";

function App() {
  const { total, inputValue } = useContext(Context);
  const incrementHandler = useIncreButton();
  const decrementHandler = useDecreButton();
  const inputChangeHandler = useGetNewInputValue();

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
        <CustomButton usage="decrement" onClick={decrementHandler} />
        <InputField value={inputValue} onChange={inputChangeHandler} />
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

      {/* <UserDataList></UserDataList> */}
    </div>
  );
}

export default App;
