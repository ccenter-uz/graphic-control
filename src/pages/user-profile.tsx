import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Logout } from "@features/logout";

import BackLink from "@shared/ui/back-link";
import BaseContainer from "@shared/ui/base-cotainer";
import ConfirmModal from "@shared/ui/confirm-modal";
import HeaderContainer from "@shared/ui/header-container";
import BaseLink from "@shared/ui/support-link";
import UserSingleInfo from "@shared/ui/user-single-info";

import userImg from "../../assets/images/user.svg";

const UserProfile = () => {
  const { t } = useTranslation();
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
          Махаммаджанов Иброхим Дониёр угли
        </p>
      </HeaderContainer>
      <div className="px-6 mt-12 grid gap-4">
        <UserSingleInfo title={t("user-profile.ID")} value="625897" />
        <UserSingleInfo title={t("user-profile.username")} value="625897" />
        <UserSingleInfo title={t("user-profile.password")} value="625897" />
        <UserSingleInfo title={t("user-profile.phone-number")} value="625897" />
      </div>
      {isModalOpen && (
        <ConfirmModal state={isModalOpen} setState={setIsModalOpen} />
      )}
      <BaseLink
        title={t("user-profile.support")}
        to="https://t.me/uztelecom_cce"
        className="ml-auto mt-auto"
      />
    </BaseContainer>
  );
};

export default UserProfile;
