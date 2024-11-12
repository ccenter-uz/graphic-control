import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface NewPreferenceContextType {
  hours: string;
  setHours: Dispatch<SetStateAction<string>>;
  offDays?: string[];
  setOffDays: Dispatch<SetStateAction<string[]>>;
}

interface NewPreferenceContextProviderProps {
  children: ReactNode;
}

const defaultValue: NewPreferenceContextType = {
  hours: "",
  setHours: (() => "") as Dispatch<SetStateAction<string>>,
  offDays: [],
  setOffDays: (() => "") as Dispatch<SetStateAction<string[]>>,
};

export const NewPreferenceContext =
  createContext<NewPreferenceContextType | null>(defaultValue);

const NewPreferenceContextProvider: FC<NewPreferenceContextProviderProps> = ({
  children,
}) => {
  const [hours, setHours] = useState<string>("");
  const [offDays, setOffDays] = useState<string[]>([]);
  return (
    <NewPreferenceContext.Provider
      value={{ hours, setHours, offDays, setOffDays }}
    >
      {children}
    </NewPreferenceContext.Provider>
  );
};

export default NewPreferenceContextProvider;
