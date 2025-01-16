import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Logout } from "@features/logout";

import { API_MAP } from "@shared/constants/apiMap";
import { TgSupportLink } from "@shared/constants/links";
import { authApi } from "@shared/lib/baseApi";
import { formatPhoneNumber } from "@shared/lib/helpers";
import Avatar from "@shared/ui/avatar";
import BackLink from "@shared/ui/back-link";
import BaseContainer from "@shared/ui/base-cotainer";
import BlueLink from "@shared/ui/blue-link";
import ConfirmModal from "@shared/ui/confirm-modal";
import HeaderContainer from "@shared/ui/header-container";
import UserSingleInfo from "@shared/ui/user-single-info";

interface IUserInfo {
  profile_image: string;
  first_number: string;
  login: string;
  name: string;
  password: string;
  role: string;
  service_name: string;
}

const defaultUserInfo: IUserInfo = {
  profile_image: "",
  first_number: "",
  login: "",
  name: "",
  password: "",
  role: "",
  service_name: "",
};

export const UserProfile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const storedUserImage = localStorage.getItem("userImage");
  const storedUserFullName = localStorage.getItem("userFullName");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<IUserInfo>(defaultUserInfo);

  const fetchUserInfo = async () => {
    try {
      const { data: responseData } = await authApi.get(API_MAP.GET_USER_INFO, {
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${localStorage.getItem("GCToken")}` as string,
        },
      });

      setData({
        profile_image: responseData.image,
        first_number: responseData.first_number,
        login: responseData.login,
        name: responseData.name,
        password: responseData.password,
        role: responseData.role,
        service_name: responseData.service_name,
      });
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const toggleModal = () => setIsModalOpen((prev) => !prev);
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <BaseContainer>
      {/* ✅ Header Section */}
      <HeaderContainer>
        <div className="flex justify-between items-start">
          <BackLink to="/" />
          <Avatar
            fullname={storedUserFullName || data.name}
            src={storedUserImage || data.profile_image}
            size="big"
          />
          <Logout onClick={toggleModal} />
        </div>
        <p className="text-[#394e34] text-center mt-3">{data.name}</p>
      </HeaderContainer>

      {/* ✅ User Info Section */}
      <div className="px-6 mt-12 grid gap-4">
        <UserSingleInfo
          title={t("pages.user_profile.username")}
          value={data.login}
        />
        <UserSingleInfo
          title={t("pages.user_profile.password")}
          value={data.password}
        />
        <UserSingleInfo
          title={t("pages.user_profile.phone_number")}
          value={
            data.first_number.length === 13
              ? formatPhoneNumber(data.first_number)
              : data.first_number
          }
        />
        <UserSingleInfo
          title={t("pages.user_profile.cc")}
          value={data.service_name}
        />
      </div>

      {/* ✅ Confirm Modal */}
      {isModalOpen && (
        <ConfirmModal
          state={isModalOpen}
          setState={setIsModalOpen}
          confirmBtnClick={handleLogout}
        />
      )}

      <BlueLink
        title={t("pages.user_profile.support")}
        to={TgSupportLink}
        className="ml-auto mt-auto"
      />
    </BaseContainer>
  );
};
