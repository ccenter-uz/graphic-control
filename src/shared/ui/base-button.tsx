import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  isDisabled?: boolean;
  onClick?: () => void;
};

const BaseButton: FC<Props> = ({
  children,
  className,
  isDisabled,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${className} ${
        isDisabled ? "bg-gray-300" : "bg-gradient"
      } w-full text-white p-2.5 rounded-lg`}
    >
      {children}
    </button>
  );
};

export default BaseButton;
