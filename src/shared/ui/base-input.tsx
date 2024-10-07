import { FC, useState } from "react";

type Props = {
  iconSrc?: string;
  iconAlt?: string;
  inputType: string;
  inputPlaceholder: string;
  isInputError: boolean;
  inputErrorText?: string;
};

export const BaseInput: FC<Props> = (props) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`w-full`}>
      <div
        className={`rounded-lg flex  bg-[#f6f6fb] ${
          isFocused && !props.isInputError
            ? "border border-[#007AFF]"
            : props.isInputError
            ? "border border-red-500"
            : "border"
        }`}
      >
        {props.iconSrc ? (
          <img src={props.iconSrc} alt={props.iconAlt} className="px-3" />
        ) : (
          ""
        )}
        <input
          type={props.inputType}
          placeholder={props.inputPlaceholder}
          className="text-sm w-full rounded-lg outline-none bg-[#f6f6fb] p-3"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
      {props?.isInputError ? (
        <p className="text-xs text-red-500">{props.inputErrorText}</p>
      ) : (
        ""
      )}
    </div>
  );
};
