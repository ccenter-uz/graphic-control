import { FC, MouseEventHandler } from "react";

import { logOutPath } from "@shared/constants/svg-paths";
import SvgIcon from "@shared/ui/svg-icon";

type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};
export const Logout: FC<Props> = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <SvgIcon path={logOutPath} color="#94A3B8" width={22} height={22} />
    </button>
  );
};
