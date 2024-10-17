import { FC } from "react";
import { Link } from "react-router-dom";

import { backLinkPath } from "@shared/constants/svg-paths";

import SvgIcon from "./svg-icon";

type Props = {
  to: string;
};

const BackLink: FC<Props> = ({ to }) => {
  return (
    <Link to={to}>
      <SvgIcon width={24} height={24} color="#94A3B8" path={backLinkPath} />
    </Link>
  );
};

export default BackLink;
