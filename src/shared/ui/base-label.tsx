import { FC } from "react";

interface Props {
  children: React.ReactNode;
}

const BaseLabel: FC<Props> = ({ children }) => {
  return <label className="text-sm text-[#64748B]">{children}</label>;
};

export default BaseLabel;
