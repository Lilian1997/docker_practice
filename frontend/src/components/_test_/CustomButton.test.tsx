import React from "react";
import { render, screen } from "@testing-library/react";
import CustomButton from "../CustomButton";
import userEvent from "@testing-library/user-event";

const decrementHandler = jest.fn();

describe("CustomButton 測試", function () {
  test("按鈕顯示在畫面上", () => {
    render(<CustomButton usage="decrement" onClick={decrementHandler} />);

    const DecreButton = screen.getByRole("button", { name: "DecreButton" });

    expect(DecreButton).toBeInTheDocument();
  });

  test("CustomButton 被點擊會觸發函式", async () => {
    render(<CustomButton usage="decrement" onClick={decrementHandler} />);

    const user = userEvent.setup();

    const DecreButton = screen.getByRole("button", { name: "DecreButton" });
    await user.click(DecreButton);
    expect(decrementHandler).toHaveBeenCalled();
  });
});
