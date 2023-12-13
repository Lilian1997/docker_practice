import { render, screen } from "@testing-library/react";
import InputField from "./InputField";
import userEvent from "@testing-library/user-event";

const inputHandler = jest.fn();

describe("InputField 測試", function () {
  test("InputField render", () => {
    render(<InputField value={1} onChange={inputHandler} />);
    const Input = screen.getByRole("textbox");
    expect(Input).toBeInTheDocument();
  });

  test("input可以打字", async () => {
    const user = userEvent.setup();

    render(<InputField value={1} onChange={inputHandler} />);

    const contentInput = screen.getByTestId("content-input");

    await user.clear(contentInput);
    await user.keyboard("22");

    expect(inputHandler).toHaveBeenCalled();
    expect(inputHandler).toHaveBeenCalledTimes(3);
  });
});
