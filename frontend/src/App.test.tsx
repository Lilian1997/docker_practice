import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import nock from "nock";
import axios from "axios";
import { URL } from "node:url";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { configureStore } from "@reduxjs/toolkit";
import userDataListReducer from "./state/userDataListSlice";
import counterReducer from "./state/counterSlice";

describe("App 測試", function () {
  axios.defaults.adapter = "http";
  const myURL = new URL("http://localhost:2407/User");
  const response = {
    data: [{ name: "John", age: 25, location: "Taipei" }],
  };

  let Store: typeof store;

  beforeEach(() => {
    Store = configureStore({
      reducer: {
        counter: counterReducer,
        userDataList: userDataListReducer,
      },
    });

    nock(myURL.origin).get(myURL.pathname).reply(200, response);
  });

  test("renders learn react link", () => {
    render(
      <Provider store={Store}>
        <App />
      </Provider>
    );
    const linkElement = screen.getByText("Counter");
    expect(linkElement).toBeInTheDocument();
  });

  test("點擊按鈕數字會加減", async () => {
    render(
      <Provider store={Store}>
        <App />
      </Provider>
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
      <Provider store={Store}>
        <App />
      </Provider>
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
