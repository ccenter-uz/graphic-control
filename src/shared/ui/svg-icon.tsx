import { FC } from "react";

interface SvgIconProps {
  path: string;
  color?: string;
  width?: number;
  height?: number;
  className?: string;
}

const SvgIcon: FC<SvgIconProps> = ({
  path,
  color,
  width,
  height,
  className,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${height} ${width}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d={path} fill={color ? color : "#94A3B8"} />
    </svg>
  );
};

export default SvgIcon;
