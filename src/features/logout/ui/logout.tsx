import { FC } from "react";

import logoutImg from "../../../../assets/images/logout.svg";
export const Logout: FC = () => {
  return (
    <button>
      <img src={logoutImg} alt="back img" />
    </button>
  );
};
