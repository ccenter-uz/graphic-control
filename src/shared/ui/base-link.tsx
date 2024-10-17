import { FC } from "react";
import { Link } from "react-router-dom";

import { arrowRightPath } from "@shared/constants/svg-paths";

import SvgIcon from "./svg-icon";

type Props = {
  title: string;
  to: string;
  imgSrc?: string;
  isBlue?: boolean;
};

const BaseLink: FC<Props> = ({ to, title, imgSrc, isBlue }) => {
  return (
    <Link to={to}>
      <div className="flex items-center justify-between bg-white border rounded px-4 py-3">
        {imgSrc ? (
          <div className="p-1.5 rounded-full bg-[#F0F7FE]">
            <SvgIcon path={imgSrc} color="#94A3B8" height={16} width={16} />
          </div>
        ) : (
          ""
        )}
        <p
          className={`${isBlue ? "text-[#506DD7]" : "text-[#94A3B8]"} text-sm`}
        >
          {title}
        </p>
        <SvgIcon path={arrowRightPath} width={18} height={18} />
      </div>
    </Link>
  );
};

export default BaseLink;
