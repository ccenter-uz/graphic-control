import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
type Props = {
  children: ReactNode;
  to: string;
  className?: string;
};

const BaseLink: FC<Props> = ({ children, to, className }) => {
  return (
    <Link to={to} className={`${className} text-[#007AFF] `}>
      {children}
    </Link>
  );
};

export default BaseLink;
