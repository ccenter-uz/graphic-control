import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

const SecondaryButton: FC<Props> = ({ children, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${className} bg-[#64748B] py-2.5 text-white rounded-lg`}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
