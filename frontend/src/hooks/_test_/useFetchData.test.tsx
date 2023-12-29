import React from "react";
import { waitFor } from "@testing-library/react";
import { useFetchData } from "../useFetchData";
import { renderHook, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupStore } from "../../state/store";

// 這個測試要做的事
// DISPATCH有沒有去呼叫執行fetchData
// 狀態有沒有確實被修改

describe("useFetchData hook", () => {
  test("觸發 dispatch fetchUserData", async () => {
    const url = "http://localhost:2407/User";
    const store = setupStore({});
    const dispatchSpy = jest.spyOn(store, "dispatch");

    const { result } = renderHook(() => useFetchData(url), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
      initialProps: {
        store,
      },
    });
    await waitFor(() => result.current.userDataArray);
    expect(dispatchSpy).toHaveBeenCalled();
  });
});
