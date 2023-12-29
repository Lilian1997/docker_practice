import { configureStore, combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import userDataListReducer from "./userDataListSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    userDataList: userDataListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const rootReducer = combineReducers({
  counter: counterReducer,
  userDataList: userDataListReducer,
});

export const setupStore = (preloadedState: any) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};
