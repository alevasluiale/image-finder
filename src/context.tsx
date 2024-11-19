import React, { createContext, useContext, useState, ReactNode } from "react";
import { InputData } from "./constants.ts";

interface AppContextType {
  data: InputData;
  setData: React.Dispatch<React.SetStateAction<InputData>>;
  updateField: <K extends keyof InputData>(
    field: K,
    value: InputData[K],
  ) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<InputData>({
    name: "",
    surname: "",
    otherTopic: "",
  });
  const updateField = <K extends keyof InputData>(
    field: K,
    value: InputData[K],
  ) => {
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <AppContext.Provider value={{ data, setData, updateField }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within an AppProvider");
  }
  return context;
};
