import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};
const HeaderTitle: FC<Props> = ({ children, className = "" }) => {
  return (
    <p
      className={`${className} max-w-[250px] text-sm text-[#64748B] px-5 text-center`}
    >
      {children}
    </p>
  );
};

export default HeaderTitle;
