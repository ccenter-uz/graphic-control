import { FC } from "react";
import { Link } from "react-router-dom";
type Props = {
  to: string;
  title: string;
  className?: string;
};

const BlueLink: FC<Props> = ({ to, title, className }) => {
  return (
    <Link to={to} className={`${className} text-[#007AFF]`}>
      {title}
    </Link>
  );
};

export default BlueLink;
