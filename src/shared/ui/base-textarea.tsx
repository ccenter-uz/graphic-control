import { ChangeEvent, FC } from "react";

interface Props {
  value: string;
  message?: string;
  isFocused?: boolean;
  setIsFocused?: React.Dispatch<React.SetStateAction<boolean>>;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}
const BaseTextarea: FC<Props> = ({
  value,
  message,
  isFocused,
  setIsFocused,
  onChange,
}) => {
  return (
    <textarea
      value={value}
      className={`w-full border min-h-[50px] rounded-md text-sm p-1 outline-none ${
        isFocused && !message
          ? "border border-[#007AFF]"
          : message
          ? "border border-[#C43D46]"
          : "border"
      }`}
      rows={6}
      onChange={onChange}
      onFocus={() => setIsFocused?.(true)}
      onBlur={() => setIsFocused?.(false)}
    />
  );
};

export default BaseTextarea;
