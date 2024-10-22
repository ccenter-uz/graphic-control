import { FC } from "react";

import { explanationPath } from "@shared/constants/svg-paths";

import SvgIcon from "./svg-icon";

type Props = {
  className?: string;
  onClick?: () => void;
  color?: string;
};

const ExplanationBtn: FC<Props> = ({ className, onClick, color }) => {
  return (
    <button className={`${className}`} onClick={onClick}>
      <SvgIcon path={explanationPath} width={14} height={14} color={color} />
    </button>
  );
};

export default ExplanationBtn;
