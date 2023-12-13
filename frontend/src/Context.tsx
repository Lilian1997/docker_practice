import React, { createContext, useState } from "react";

type ContextType = {
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  inputValue: number;
  setInputValue: React.Dispatch<React.SetStateAction<number>>;
};

export const Context = createContext<ContextType>({
  total: 0,
  setTotal: () => {},
  inputValue: 1,
  setInputValue: () => {},
});

type ContextProviderProps = {
  children: React.ReactNode;
};

const ContextProvider = ({ children }: ContextProviderProps) => {
  // Counter狀態
  const [total, setTotal] = useState(0);

  // Input狀態
  const [inputValue, setInputValue] = useState(1);

  return (
    <Context.Provider
      value={{
        total,
        setTotal,
        inputValue,
        setInputValue,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
