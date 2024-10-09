import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const BaseButton: FC<Props> = ({ children, className }) => {
  return (
    <button
      className={`${className} text-white p-2.5 rounded-lg w-full bg-gradient-to-r from-[#174880] to-[#3981EC]`}
    >
      {children}
    </button>
  );
};

export default BaseButton;
