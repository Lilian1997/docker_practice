import { ChangeEvent, FocusEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import {
  decrementByAmount,
  incrementByAmount,
  setInputValue,
} from "../state/counterSlice";

export const useCalculateSum = () => {
  const total = useSelector((state: RootState) => state.counter.total);

  const inputValue = useSelector(
    (state: RootState) => state.counter.inputValue
  );

  const dispatch = useDispatch();

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    const getInputValue = inputText === "" ? "" : parseInt(inputText);
    dispatch(setInputValue(getInputValue as number));
  };

  const isNaNChecked = (e: FocusEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    const inputValueIsNaN = inputText === "" ? 0 : parseInt(inputText);
    dispatch(setInputValue(inputValueIsNaN));
  };

  const decreButtonClicked = () => {
    dispatch(decrementByAmount(inputValue));
  };

  const increButtonClicked = () => {
    dispatch(incrementByAmount(inputValue));
  };

  return {
    total,
    inputValue,
    inputHandler,
    isNaNChecked,
    decreButtonClicked,
    increButtonClicked,
  };
};
