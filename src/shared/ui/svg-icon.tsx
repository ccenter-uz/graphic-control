import { FC } from "react";

interface SvgIconProps {
  path: string;
  color?: string;
  width?: number;
  height?: number;
}

const SvgIcon: FC<SvgIconProps> = ({ path, color, width, height }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={path} fill={color} />
    </svg>
  );
};

export default SvgIcon;
