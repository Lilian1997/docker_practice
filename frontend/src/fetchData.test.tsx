import { fetchData } from "./fetchData";
import axios from "axios";
import nock from "nock";
import { URL } from "node:url";

describe("fetchData 測試", function () {
  afterEach(() => {
    nock.cleanAll();
  });

  axios.defaults.adapter = "http";
  const myURL = new URL("http://localhost:2407/User");
  const response = {
    data: [
      { name: "John", age: 25, location: "Taipei" },
      { name: "Amy", age: 15, location: "Tainan" },
    ],
  };

  test("狀態碼200 取得多筆正確資料", async () => {
    nock(myURL.origin).get(myURL.pathname).reply(200, response);

    const getAllUserData = await fetchData(myURL.href);

    expect(getAllUserData).toEqual(response.data);
  });

  test("狀態碼404", async () => {
    nock(myURL.origin).get(myURL.pathname).reply(404, "Not Found");

    const getAllUserData = await fetchData(myURL.href);

    expect(getAllUserData).toBe("Not Found");
  });

  test("狀態碼500", async () => {
    nock(myURL.origin).get(myURL.pathname).reply(500, "Server Error");

    const getAllUserData = await fetchData(myURL.href);

    expect(getAllUserData).toBe("Internal Server Error");
  });
});
