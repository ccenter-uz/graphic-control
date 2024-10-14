import { Link } from "react-router-dom";

import { Internationalization } from "@features/internationalization";

import HeaderContainer from "@shared/ui/header-container";

import userImg from "../../../../assets/images/user.svg";

export const HomeHeader = () => {
  return (
    <HeaderContainer className="flex items-center justify-between">
      <Internationalization />
      <Link to="/user">
        <img src={userImg} alt="user img" className="w-8 h-8" />
      </Link>
    </HeaderContainer>
  );
};
