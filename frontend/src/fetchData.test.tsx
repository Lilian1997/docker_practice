import { fetchData } from "./fetchData";
import axios from "axios";
import nock from "nock";
import {URL} from 'node:url';

describe("fetchData 測試", function () {
  axios.defaults.adapter = "http";
  
  test("取得多筆正確資料", async () => {
    
    const myURL = new URL('http://localhost:2407/User');
    const response = {
      data: [
        { name: "John", age: 25, location: "Taipei" },
        { name: "Amy", age: 15, location: "Tainan" },
      ],
    };

    nock(myURL.origin).get(myURL.pathname).reply(200, response);

    const getAllUserData = await fetchData(myURL.href);

    expect(getAllUserData).toEqual(response.data);
  });
});
