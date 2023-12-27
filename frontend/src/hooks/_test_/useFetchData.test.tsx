import React from "react";
import { render, screen } from "@testing-library/react";
// import CustomButton from "../CustomButton";
import userEvent from "@testing-library/user-event";
import { useFetchData } from "../useFetchData";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";

const decrementHandler = jest.fn();

describe("useFetchData 測試", function () {
  // const dispatch = useDispatch<AppDispatch>();
  const userDataArray = useSelector((state: RootState) => state.userDataList);

  test("初始狀態", () => {
    expect(userDataArray.length).toBe(1);
  });

  test("CustomButton 被點擊會觸發函式", async () => {
    render(<CustomButton usage="decrement" onClick={decrementHandler} />);

    const user = userEvent.setup();

    const DecreButton = screen.getByRole("button", { name: "DecreButton" });
    await user.click(DecreButton);
    expect(decrementHandler).toHaveBeenCalled();
  });
});
