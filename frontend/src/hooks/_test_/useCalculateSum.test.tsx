import React from "react";
import { renderHook, act } from "@testing-library/react";
import { useCalculateSum } from "../useCalculateSum";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementByAmount,
  decrementByAmount,
  setInputValue,
} from "../../state/counterSlice";

jest.mock("react-redux");

const mockUseSelector = useSelector as jest.Mock;
const mockUseDispatch = useDispatch as jest.Mock;

describe("useCalculateSum", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("increButtonClicked", () => {
    const total = 1;
    const inputValue = 1;

    mockUseSelector.mockReturnValueOnce(total).mockReturnValueOnce(inputValue);
    const mockDispatch = jest.fn();

    mockUseDispatch.mockReturnValue(mockDispatch);

    const { result } = renderHook(() => useCalculateSum());

    act(() => {
      result.current.increButtonClicked();
    });

    expect(mockDispatch).toHaveBeenCalledWith(incrementByAmount(inputValue));
  });

  test("decreButtonClicked()", () => {
    const total = 1;
    const inputValue = 1;

    mockUseSelector.mockReturnValueOnce(total).mockReturnValueOnce(inputValue);
    const mockDispatch = jest.fn();

    mockUseDispatch.mockReturnValue(mockDispatch);

    const { result } = renderHook(() => useCalculateSum());

    act(() => {
      result.current.decreButtonClicked();
    });

    expect(mockDispatch).toHaveBeenCalledWith(decrementByAmount(inputValue));
  });

  test("inputHandler", () => {
    const inputValue = 1;
    const mockDispatch = jest.fn();

    mockUseDispatch.mockReturnValue(mockDispatch);

    const { result } = renderHook(() => useCalculateSum());

    act(() => {
      result.current.inputHandler({
        target: { value: inputValue },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    });

    expect(mockDispatch).toHaveBeenCalledWith(setInputValue(inputValue));
  });

  test("isNaNChecked", () => {
    const inputValue = "";
    const mockDispatch = jest.fn();

    mockUseDispatch.mockReturnValue(mockDispatch);

    const { result } = renderHook(() => useCalculateSum());

    act(() => {
      result.current.isNaNChecked({
        target: { value: inputValue },
      } as React.FocusEvent<HTMLInputElement>);
    });

    expect(mockDispatch).toHaveBeenCalledWith(setInputValue(0));
  });
});
