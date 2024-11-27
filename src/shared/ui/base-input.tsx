import { Dispatch, FC, SetStateAction, useState } from "react";

import SvgIcon from "./svg-icon";

type Props = {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  iconSrc?: string;
  iconAlt?: string;
  inputType: string;
  inputPlaceholder: string;
  isInputError: boolean;
  inputErrorText?: string;
};

export const BaseInput: FC<Props> = ({
  inputValue,
  setInputValue,
  iconSrc,
  inputType,
  inputPlaceholder,
  isInputError,
  inputErrorText,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className={`w-full`}>
      <div
        className={`rounded-lg flex items-center  bg-[#f6f6fb] ${
          isFocused && !isInputError
            ? "border border-[#007AFF]"
            : isInputError
            ? "border border-red-500"
            : "border"
        }`}
      >
        {iconSrc ? (
          <SvgIcon
            path={iconSrc}
            width={13}
            height={14}
            color="#64748B"
            className="ml-3"
          />
        ) : (
          ""
        )}
        <input
          value={inputValue}
          type={inputType}
          placeholder={inputPlaceholder}
          className="text-sm w-full rounded-lg outline-none bg-[#f6f6fb] p-3"
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
      {isInputError ? (
        <p className="text-xs text-red-500">{inputErrorText}</p>
      ) : (
        ""
      )}
    </div>
  );
};
