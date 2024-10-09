import { FC } from "react";
import { Link } from "react-router-dom";

import backImg from "../../../assets/images/arrow-left.svg";

type Props = {
  to: string;
};

const BackLink: FC<Props> = ({ to }) => {
  return (
    <Link to={to}>
      <img src={backImg} alt="back img" />
    </Link>
  );
};

export default BackLink;
