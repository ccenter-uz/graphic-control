import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Logout } from "@features/logout";

import { API_MAP } from "@shared/constants/apiMap";
import { TgSupportLink } from "@shared/constants/links";
import { baseApi } from "@shared/lib/baseApi";
import { formatPhoneNumber } from "@shared/lib/helpers";
import BackLink from "@shared/ui/back-link";
import BaseContainer from "@shared/ui/base-cotainer";
import BlueLink from "@shared/ui/blue-link";
import ConfirmModal from "@shared/ui/confirm-modal";
import HeaderContainer from "@shared/ui/header-container";
import UserSingleInfo from "@shared/ui/user-single-info";

import userProfileImg from "../../../../assets/images/user-profile.svg";

interface IUserInfo {
  first_number: string;
  login: string;
  name: string;
  password: string;
  role: string;
  service_name: string;
}

export const UserProfile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [data, setData] = useState<IUserInfo>({
    first_number: "",
    login: "",
    name: "",
    password: "",
    role: "",
    service_name: "",
  });
  const token = localStorage.getItem("GCToken") as string;

  useEffect(() => {
    baseApi
      .get(API_MAP.GET_USER_INFO, {
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleLogoutClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleConfirmClick = () => {
    localStorage.removeItem("GCToken");
    navigate("/login");
  };
  return (
    <BaseContainer>
      <HeaderContainer>
        <div className="flex justify-between items-start">
          <BackLink to="/" />
          <img src={userProfileImg} alt="user img" />
          <Logout onClick={handleLogoutClick} />
        </div>
        <p className="text-[#394e34] text-center mt-3">{data.name}</p>
      </HeaderContainer>
      <div className="px-6 mt-12 grid gap-4">
        <UserSingleInfo title={t("user-profile.username")} value={data.login} />
        <UserSingleInfo
          title={t("user-profile.password")}
          value={data.password}
        />
        <UserSingleInfo
          title={t("user-profile.phone-number")}
          value={
            data.first_number.length === 13
              ? formatPhoneNumber(data.first_number)
              : data.first_number
          }
        />
        <UserSingleInfo
          title={t("user-profile.branch")}
          value={data.service_name}
        />
      </div>
      {isModalOpen && (
        <ConfirmModal
          state={isModalOpen}
          setState={setIsModalOpen}
          confirmClick={handleConfirmClick}
        />
      )}
      <BlueLink
        title={t("user-profile.support")}
        to={TgSupportLink}
        className="ml-auto mt-auto"
      />
    </BaseContainer>
  );
};
