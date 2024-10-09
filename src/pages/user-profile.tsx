import { useState } from "react";

import { Logout } from "@features/logout";

import BackLink from "@shared/ui/back-link";
import BaseContainer from "@shared/ui/base-cotainer";
import BaseLink from "@shared/ui/base-link";
import ConfirmModal from "@shared/ui/confirm-modal";
import Curtain from "@shared/ui/curtain";
import HeaderContainer from "@shared/ui/header-container";
import UserSingleInfo from "@shared/ui/user-single-info";

import userImg from "../../assets/images/user.svg";

const UserProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleLogoutClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <BaseContainer>
      <HeaderContainer>
        <div className="flex justify-between items-start">
          <BackLink to="/" />
          <img src={userImg} alt="user img" />
          <Logout onClick={handleLogoutClick} />
        </div>
        <p className="text-[#394e34] text-center mt-3">
          Mahammadjanov Ibrohim Doniyor o’g’li
        </p>
      </HeaderContainer>
      <div className="px-6 mt-12 grid gap-4">
        <UserSingleInfo title="ID" value="625897" />
        <UserSingleInfo title="Логин" value="625897" />
        <UserSingleInfo title="Пароль" value="625897" />
        <UserSingleInfo title="Тел номер" value="625897" />
      </div>
      {isModalOpen && (
        <ConfirmModal state={isModalOpen} setState={setIsModalOpen} />
      )}
      {isModalOpen && <Curtain />}
      <BaseLink
        title="Поддрежка"
        to="https://t.me/uztelecom_cce"
        className="ml-auto mt-auto"
      />
    </BaseContainer>
  );
};

export default UserProfile;
