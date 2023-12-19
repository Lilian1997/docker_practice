import { useContext, ChangeEvent } from "react";
import { Context } from "../context/Context";

export const useGetNewInputValue = () => {
  const { setInputValue } = useContext(Context);

  const getNewInputValue = (e: ChangeEvent<HTMLInputElement>): void => {
    let getInputValue = isNaN(parseInt(e.target.value))
      ? 0
      : parseInt(e.target.value);

    setInputValue(getInputValue);
  };

  return getNewInputValue;
};
