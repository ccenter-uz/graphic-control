import { FC } from "react";
import { Link } from "react-router-dom";

import SvgIcon from "./svg-icon";

type Props = {
  to: string;
};

const BackLink: FC<Props> = ({ to }) => {
  return (
    <Link to={to}>
      <SvgIcon
        width={24}
        height={24}
        color="#94A3B8"
        path="M2.82762 7.00063L7.77734 11.9504L6.36313 13.3646L-0.000876705 7.00063L6.36313 0.636719L7.77734 2.05093L2.82762 7.00063Z"
      />
    </Link>
  );
};

export default BackLink;
