import { useContext, ChangeEvent } from "react";
import { Context } from "../context/Context";

export const useGetNewInputValue = () => {
  const { setInputValue } = useContext(Context);

  const getNewInputValue = (e: ChangeEvent<HTMLInputElement>): void => {
    const inputText = e.target.value;
    const getInputValue = inputText === "" ? "" : parseInt(inputText);
    setInputValue(getInputValue as number);
  };

  return getNewInputValue;
};

export const useIsNaNChecked = () => {
  const { setInputValue } = useContext(Context);

  const IsNaNChecked = (e: ChangeEvent<HTMLInputElement>): void => {
    const inputText = e.target.value;
    const inputValueIsNaN = inputText === "" ? 0 : parseInt(inputText);
    setInputValue(inputValueIsNaN);
  };

  return IsNaNChecked;
};
