import { FC } from "react";
import { Link } from "react-router-dom";

import arrowRight from "../../../assets/images/arrow-right.svg";

type Props = {
  title: string;
  to: string;
  imgSrc?: string;
  colorHex?: string;
};

const HomeLink: FC<Props> = ({ to, title, imgSrc, colorHex }) => {
  return (
    <Link to={to}>
      <div className="flex items-center justify-between bg-white border-b-2 rounded px-4 py-3">
        {imgSrc ? (
          <div className="bg-[#F0F7FE] rounded-full">
            <img src={imgSrc} alt="Calendar clock" className="p-1.5" />
          </div>
        ) : (
          ""
        )}
        <p className={`text-[${colorHex ? colorHex : "#94A3B8"}] text-sm`}>
          {title}
        </p>
        <img src={arrowRight} alt="Arrow right" />
      </div>
    </Link>
  );
};

export default HomeLink;
