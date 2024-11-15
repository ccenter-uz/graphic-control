import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

import { ICheckbox } from "@shared/lib/types";

interface NewPreferenceContextType {
  hours: string;
  setHours: Dispatch<SetStateAction<string>>;
  offDays?: string[];
  setOffDays: Dispatch<SetStateAction<string[]>>;
  daysOfMonth: ICheckbox[];
  setDaysOfMonth: Dispatch<SetStateAction<ICheckbox[]>>;
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
};

export const NewPreferenceContext =
  createContext<NewPreferenceContextType | null>(defaultValue);

const NewPreferenceContextProvider: FC<NewPreferenceContextProviderProps> = ({
  children,
}) => {
  const [hours, setHours] = useState<string>("");
  const [offDays, setOffDays] = useState<string[]>([]);
  const [daysOfMonth, setDaysOfMonth] = useState<ICheckbox[]>([]);
  return (
    <NewPreferenceContext.Provider
      value={{
        hours,
        setHours,
        offDays,
        setOffDays,
        daysOfMonth,
        setDaysOfMonth,
      }}
    >
      {children}
    </NewPreferenceContext.Provider>
  );
};

export default NewPreferenceContextProvider;
