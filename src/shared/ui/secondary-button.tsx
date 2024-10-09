import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const SecondaryButton: FC<Props> = ({ children, className }) => {
  return (
    <button
      className={`${className} bg-[#64748B] py-2.5 text-white rounded-lg`}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
