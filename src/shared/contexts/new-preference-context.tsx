import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

import { ICheckbox } from "@shared/lib/types";

interface IErrorInfo {
  errorMessage?: string;
  errorStatus?: number;
}

interface NewPreferenceContextType {
  hours: string;
  setHours: Dispatch<SetStateAction<string>>;
  offDays?: string[];
  setOffDays: Dispatch<SetStateAction<string[]>>;
  daysOfMonth: ICheckbox[];
  setDaysOfMonth: Dispatch<SetStateAction<ICheckbox[]>>;
  errorInfo: IErrorInfo;
  setErrorInfo: Dispatch<SetStateAction<IErrorInfo>>;
}

interface NewPreferenceContextProviderProps {
  children: ReactNode;
}

const defaultValue: NewPreferenceContextType = {
  hours: "",
  setHours: (() => "") as Dispatch<SetStateAction<string>>,
  offDays: [],
  setOffDays: (() => "") as Dispatch<SetStateAction<string[]>>,
  daysOfMonth: [],
  setDaysOfMonth: (() => "") as Dispatch<SetStateAction<ICheckbox[]>>,
  errorInfo: {},
  setErrorInfo: (() => "") as Dispatch<SetStateAction<IErrorInfo>>,
};

export const NewPreferenceContext =
  createContext<NewPreferenceContextType | null>(defaultValue);

const NewPreferenceContextProvider: FC<NewPreferenceContextProviderProps> = ({
  children,
}) => {
  const [hours, setHours] = useState<string>("");
  const [offDays, setOffDays] = useState<string[]>([]);
  const [daysOfMonth, setDaysOfMonth] = useState<ICheckbox[]>([]);
  const [errorInfo, setErrorInfo] = useState<IErrorInfo>({});

  return (
    <NewPreferenceContext.Provider
      value={{
        hours,
        setHours,
        offDays,
        setOffDays,
        daysOfMonth,
        setDaysOfMonth,
        errorInfo,
        setErrorInfo,
      }}
    >
      {children}
    </NewPreferenceContext.Provider>
  );
};

export default NewPreferenceContextProvider;
