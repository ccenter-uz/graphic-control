import { FC, MouseEventHandler } from "react";

import logoutImg from "../../../../assets/images/logout.svg";

type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};
export const Logout: FC<Props> = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <img src={logoutImg} alt="back img" />
    </button>
  );
};
