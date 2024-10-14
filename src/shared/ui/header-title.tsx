import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};
const HeaderTitle: FC<Props> = ({ children }) => {
  return <p className="text-sm text-[#64748B] px-5">{children}</p>;
};

export default HeaderTitle;
