import { fetchData } from "./fetchData";
import axios from "axios";
import nock from "nock";

describe("fetchData 測試", function () {
  axios.defaults.adapter = "http";

  test("取得多筆正確資料", async () => {
    const response = {
      data: [
        { name: "John", age: 25, location: "Taipei" },
        { name: "Amy", age: 15, location: "Tainan" },
      ],
    };

    nock("http://localhost:2407").get("/User").reply(200, response);

    const getAllUserData = await fetchData("http://localhost:2407/User");

    expect(getAllUserData).toEqual([
      { name: "John", age: 25, location: "Taipei" },
      { name: "Amy", age: 15, location: "Tainan" },
    ]);
  });
});
