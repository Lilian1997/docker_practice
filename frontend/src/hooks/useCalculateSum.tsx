import { useContext } from "react";
import { decrement, increment } from "../utils/calculateSum";
import { Context } from "../context/Context";

export const useDecreButton = () => {
  const { total, setTotal, inputValue, setInputValue } = useContext(Context);

  const decreButtonClicked = () => {
    let newTotal = decrement(total, inputValue || 0);
    setTotal(newTotal);
    setInputValue(1);
  };

  return decreButtonClicked;
};

export const useIncreButton = () => {
  const { total, setTotal, inputValue, setInputValue } = useContext(Context);

  const increButtonClicked = () => {
    let newTotal = increment(total, inputValue || 0);
    setTotal(newTotal);
    setInputValue(1);
  };

  return increButtonClicked;
};
