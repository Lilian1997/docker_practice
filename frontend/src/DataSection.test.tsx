import React from "react";
import { render, screen } from "@testing-library/react";
import { DataSection, useFetchData } from "./DataSection";
import axios from "axios";
import nock from "nock";
import ContextProvider from "./Context";

describe("DataSection 測試", function () {
  axios.defaults.adapter = "http";

  test("成功連接", async () => {
    const scope = nock("http://localhost:2407")
      .get("/User")
      .reply(200, "test response");

    await axios.get("http://localhost:2407/User");

    scope.done();
  });

  test("收到資料", async () => {
    const response = {
      data: [{ name: "John", age: 25, location: "Taipei" }],
    };

    nock("http://localhost:2407").get("/User").reply(200, response);

    render(
      <ContextProvider>
        <DataSection />
      </ContextProvider>
    );

    await screen.findByText("John");
    await screen.findByText("25");
    await screen.findByText("Taipei");
  });

  test("useFetchData可用", async () => {
    const response = {
      data: [{ name: "John", age: 25, location: "Taipei" }],
    };

    nock("http://localhost:2407").get("/User").reply(200, response);

    useFetchData();

    await screen.findByText("John");
    await screen.findByText("25");
    await screen.findByText("Taipei");
  });
});
