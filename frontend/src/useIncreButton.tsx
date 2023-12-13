import { useContext } from "react";
import { Increment } from "./CalculateSum";
import { Context } from "./Context";

export const useIncreButton = () => {
  const { total, setTotal, inputValue, setInputValue } = useContext(Context);

  const IncreButtonClicked = () => {
    let NewTotal = Increment(total, inputValue || 0);
    setTotal(NewTotal);
    setInputValue(1);
  };

  return IncreButtonClicked;
};
