import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import ContextProvider from "./Context";
import nock from "nock";
import axios from "axios";

describe("App 測試", function () {
  beforeEach(() => {
    axios.defaults.adapter = "http";

    const response = {
      data: [{ name: "John", age: 25, location: "Taipei" }],
    };

    nock("http://localhost:2407").get("/User").reply(200, response);
  });

  test("renders learn react link", () => {
    render(
      <ContextProvider>
        <App />
      </ContextProvider>
    );
    const linkElement = screen.getByText("Counter");
    expect(linkElement).toBeInTheDocument();
  });

  test("點擊按鈕數字會加減", async () => {
    render(
      <ContextProvider>
        <App />
      </ContextProvider>
    );

    const Total = screen.getByTestId("total");
    const DecreButton = screen.getByRole("button", { name: "DecreButton" });
    const IncreButton = screen.getByRole("button", { name: "IncreButton" });
    const user = userEvent.setup();

    expect(Number(Total.textContent)).toBe(0);

    await user.click(IncreButton);
    expect(Number(Total.textContent)).toBe(1);

    await user.click(DecreButton);
    await user.click(DecreButton);
    await user.click(DecreButton);
    expect(Number(Total.textContent)).toBe(-2);
  });

  test("依輸入框的值加減", async () => {
    render(
      <ContextProvider>
        <App />
      </ContextProvider>
    );

    const Total = screen.getByTestId("total");
    const DecreButton = screen.getByRole("button", { name: "DecreButton" });
    const IncreButton = screen.getByRole("button", { name: "IncreButton" });
    const contentInput = screen.getByTestId("content-input");
    const user = userEvent.setup();

    expect(Number(Total.textContent)).toBe(0);

    await user.clear(contentInput);
    await user.type(contentInput, "12");
    await user.click(IncreButton);

    expect(Number(Total.textContent)).toBe(12);

    await user.clear(contentInput);
    await user.type(contentInput, "50");
    await user.click(DecreButton);

    expect(Number(Total.textContent)).toBe(-38);

    await user.clear(contentInput);
    await user.click(DecreButton);

    expect(Number(Total.textContent)).toBe(-38);
    expect(contentInput).toHaveDisplayValue("1");

    await user.clear(contentInput);
    await user.click(IncreButton);

    expect(Number(Total.textContent)).toBe(-38);
    expect(contentInput).toHaveDisplayValue("1");
  });
});
