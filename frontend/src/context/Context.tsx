import React, { createContext, useState } from "react";

export type UserDataContent = {
  name: string;
  age: number;
  location: string;
};

type ContextType = {
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  inputValue: number;
  setInputValue: React.Dispatch<React.SetStateAction<number>>;
  userDataArray: UserDataContent[];
  setUserDataArray: React.Dispatch<
    React.SetStateAction<Array<UserDataContent>>
  >;
};

export const Context = createContext<ContextType>({
  total: 0,
  setTotal: () => {},
  inputValue: 1,
  setInputValue: () => {},
  userDataArray: [{ name: "", age: 1, location: "" }],
  setUserDataArray: () => {},
});

type ContextProviderProps = {
  children: React.ReactNode;
};

const ContextProvider = ({ children }: ContextProviderProps) => {
  // Counter狀態
  const [total, setTotal] = useState(0);

  // Input狀態
  const [inputValue, setInputValue] = useState(1);

  //All Data
  const [userDataArray, setUserDataArray] = useState<UserDataContent[]>([]);

  return (
    <Context.Provider
      value={{
        total,
        setTotal,
        inputValue,
        setInputValue,
        userDataArray,
        setUserDataArray,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
