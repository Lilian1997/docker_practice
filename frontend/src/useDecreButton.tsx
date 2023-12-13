import { useContext } from "react";
import { Decrement } from "./CalculateSum";
import { Context } from "./Context";

export const useDecreButton = () => {
  const { total, setTotal, inputValue, setInputValue } = useContext(Context);

  const DecreButtonClicked = () => {
    let NewTotal = Decrement(total, inputValue || 0);
    setTotal(NewTotal);
    setInputValue(1);
  };

  return DecreButtonClicked;
};
