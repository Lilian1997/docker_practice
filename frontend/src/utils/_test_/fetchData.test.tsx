import { fetchData } from "../fetchData";
import axios from "axios";
import nock from "nock";
import { URL } from "node:url";

describe("fetchData 測試", function () {
  axios.defaults.adapter = "http";
  const myURL = new URL("http://localhost:2407/User");
  const mockApi = nock(myURL.origin).get(myURL.pathname);
  const response = {
    data: [
      { name: "John", age: 25, location: "Taipei" },
      { name: "Amy", age: 15, location: "Tainan" },
    ],
  };

  afterEach(() => {
    nock.cleanAll();
  });

  test("狀態碼200 取得多筆正確資料", async () => {
    mockApi.reply(200, response);

    const getUserDataArray = await fetchData(myURL.href);

    expect(getUserDataArray).toEqual(response.data);
  });

  test("狀態碼 404", async () => {
    mockApi.reply(404);

    await expect(fetchData(myURL.href)).rejects.toThrow(
      "Request failed with status code 404"
    );
  });

  test("狀態碼 500", async () => {
    mockApi.reply(500, "error:500");
    let getResult: any;
    try {
      getResult = await fetchData(myURL.href);
    } catch (error) {
      const responseError = error as { response: { data: string } };
      getResult = responseError.response.data;
    }
    expect(getResult).toBe("error:500");
  });

  test("狀態碼 300", async () => {
    mockApi.reply(300);

    let getResult: any;

    try {
      getResult = await fetchData(myURL.href);
    } catch (error) {
      const responseError = error as { response: { status: number } };
      getResult = responseError.response.status;
    }

    expect(getResult).toBe(300);
  });

  test("狀態碼 503", async () => {
    mockApi.reply(503);
    await expect(fetchData(myURL.href)).rejects.toThrow();
  });
});
