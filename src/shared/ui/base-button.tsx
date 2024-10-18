import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

const BaseButton: FC<Props> = ({ children, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${
        className ? className : "w-full"
      } text-white p-2.5 rounded-lg bg-gradient`}
    >
      {children}
    </button>
  );
};

export default BaseButton;
