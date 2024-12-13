import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  widthNotFull?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
};

const BaseButton: FC<Props> = ({
  children,
  widthNotFull,
  isDisabled,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${widthNotFull ? "w-1/3" : "w-full"} ${
        isDisabled ? "bg-gray-300" : "bg-gradient"
      } text-white p-2.5 rounded-lg`}
    >
      {children}
    </button>
  );
};

export default BaseButton;
