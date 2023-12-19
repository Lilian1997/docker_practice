import React from "react";
import { render, screen } from "@testing-library/react";
import { DataSection } from "./DataSection";
import axios from "axios";
import nock from "nock";
import ContextProvider from "./Context";
import { URL } from "node:url";

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
      <ContextProvider>
        <DataSection />
      </ContextProvider>
    );

    await screen.findByText("John");
    await screen.findByText("25");
    await screen.findByText("Taipei");
  });
});
