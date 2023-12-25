import "./assets/App.css";
import Stack from "@mui/material/Stack";
import { UserDataList } from "./components/UserDataList";
import Counter from "./components/Counter";

function App() {
  return (
    <div className="App">
      <Counter></Counter>
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
      <UserDataList></UserDataList>
    </div>
  );
}

export default App;
