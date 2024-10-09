import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const HeaderContainer: FC<Props> = ({ children, className }) => {
  return (
    <div className={`px-6 py-8 rounded-b-2xl bg-[#F0F7FE] ${className}`}>
      {children}
    </div>
  );
};

export default HeaderContainer;
