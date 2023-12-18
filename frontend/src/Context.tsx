import React, { createContext, useState } from "react";

export type UserData = {
  name: string;
  age: number;
  location: string;
};

type ContextType = {
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  inputValue: number;
  setInputValue: React.Dispatch<React.SetStateAction<number>>;
  // userData: UserData;
  // setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  allUserData: UserData[];
  setAllUserData: React.Dispatch<React.SetStateAction<Array<UserData>>>;
};

export const Context = createContext<ContextType>({
  total: 0,
  setTotal: () => {},
  inputValue: 1,
  setInputValue: () => {},
  // userData: { name: "", age: 1, location: "" },
  // setUserData: () => {},
  allUserData: [{ name: "", age: 1, location: "" }],
  setAllUserData: () => {},
});

type ContextProviderProps = {
  children: React.ReactNode;
};

const ContextProvider = ({ children }: ContextProviderProps) => {
  // Counter狀態
  const [total, setTotal] = useState(0);

  // Input狀態
  const [inputValue, setInputValue] = useState(1);

  // User
  // const [userData, setUserData] = useState<UserData>({
  //   name: "",
  //   age: 1,
  //   location: "",
  // });

  //All Data
  const [allUserData, setAllUserData] = useState<UserData[]>([]);

  return (
    <Context.Provider
      value={{
        total,
        setTotal,
        inputValue,
        setInputValue,
        // userData,
        // setUserData,
        allUserData,
        setAllUserData,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
