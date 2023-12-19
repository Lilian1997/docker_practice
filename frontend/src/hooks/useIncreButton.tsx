import { useContext } from "react";
import { Increment } from "../utils/CalculateSum";
import { Context } from "../context/Context";

export const useIncreButton = () => {
  const { total, setTotal, inputValue, setInputValue } = useContext(Context);

  const IncreButtonClicked = () => {
    let NewTotal = Increment(total, inputValue || 0);
    setTotal(NewTotal);
    setInputValue(1);
  };

  return IncreButtonClicked;
};
