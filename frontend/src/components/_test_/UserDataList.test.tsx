import React from "react";
import { render, screen } from "@testing-library/react";
import { UserDataList } from "../UserDataList";
import axios from "axios";
import nock from "nock";
import { URL } from "node:url";
import { Provider } from "react-redux";
import { store } from "../../state/store";

describe("DataSection 測試", function () {
  axios.defaults.adapter = "http";
  const myURL = new URL("http://localhost:2407/User");

  test("成功連接", async () => {
    const scope = nock(myURL.origin)
      .get(myURL.pathname)
      .reply(200, "test response");

    await axios.get(myURL.href);

    scope.done();
  });

  test("收到資料", async () => {
    const response = {
      data: [{ name: "John", age: 25, location: "Taipei" }],
    };

    nock(myURL.origin).get(myURL.pathname).reply(200, response);

    await render(
      <Provider store={store}>
        <UserDataList />
      </Provider>
    );

    await screen.findByText("John");
    await screen.findByText("25");
    await screen.findByText("Taipei");
  });
});
