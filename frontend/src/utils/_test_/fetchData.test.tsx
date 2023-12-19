import { fetchData } from "../fetchData";
import axios from "axios";
import nock from "nock";
import { URL } from "node:url";

describe("fetchData 測試", function () {
  axios.defaults.adapter = "http";
  const myURL = new URL("http://localhost:2407/User");
  const response = {
    data: [
      { name: "John", age: 25, location: "Taipei" },
      { name: "Amy", age: 15, location: "Tainan" },
    ],
  };

  test("取得多筆正確資料", async () => {
    nock(myURL.origin).get(myURL.pathname).reply(200, response);

    const getUserDataArray = await fetchData(myURL.href);

    expect(getUserDataArray).toEqual(response.data);
  });

  test("狀態碼 404", async () => {
    nock(myURL.origin).get(myURL.pathname).reply(404);
    await expect(fetchData(myURL.href)).rejects.toThrowError(
      "Request failed with status code 404"
    );
  });

  test("狀態碼 500", async () => {
    nock(myURL.origin).get(myURL.pathname).reply(500);

    await expect(fetchData(myURL.href)).rejects.toBeTruthy();
  });

  test("狀態碼 300", async () => {
    nock(myURL.origin).get(myURL.pathname).reply(300);

    await expect(fetchData(myURL.href)).rejects.toThrowError(
      "Request failed with status code 300"
    );
  });
});
