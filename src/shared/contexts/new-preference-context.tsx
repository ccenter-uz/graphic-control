import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

import { ICheckbox } from "@shared/lib/types";

export interface IErrorInfo {
  errorMessage?: string;
  errorStatus?: number;
}

export interface ISubheaderInfo {
  id: number;
  title: string;
  value: string;
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
  backLinkPath: string;
  setBackLinkPath: Dispatch<SetStateAction<string>>;
  pageHeaderTitle: string;
  setPageHeaderTitle: Dispatch<SetStateAction<string>>;
  subHeaderInfoData: ISubheaderInfo[];
  setSubHeaderInfoData: Dispatch<SetStateAction<ISubheaderInfo[]>>;
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
  backLinkPath: "",
  setBackLinkPath: (() => "") as Dispatch<SetStateAction<string>>,
  pageHeaderTitle: "",
  setPageHeaderTitle: (() => "") as Dispatch<SetStateAction<string>>,
  subHeaderInfoData: [],
  setSubHeaderInfoData: (() => "") as Dispatch<
    SetStateAction<ISubheaderInfo[]>
  >,
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
  const [backLinkPath, setBackLinkPath] = useState<string>("");
  const [pageHeaderTitle, setPageHeaderTitle] = useState<string>("");

  const [subHeaderInfoData, setSubHeaderInfoData] = useState<ISubheaderInfo[]>(
    [],
  );

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
        backLinkPath,
        setBackLinkPath,
        pageHeaderTitle,
        setPageHeaderTitle,
        subHeaderInfoData,
        setSubHeaderInfoData,
      }}
    >
      {children}
    </NewPreferenceContext.Provider>
  );
};

export default NewPreferenceContextProvider;
