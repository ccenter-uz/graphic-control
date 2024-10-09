import { Logout } from "@features/logout";

import BackLink from "@shared/ui/back-link";
import BaseContainer from "@shared/ui/base-cotainer";
import ConfirmModal from "@shared/ui/confirm-modal";
import HeaderContainer from "@shared/ui/header-container";
import UserSingleInfo from "@shared/ui/user-single-info";

import userImg from "../../assets/images/user.svg";

const UserProfile = () => {
  return (
    <BaseContainer>
      <HeaderContainer>
        <div className="flex justify-between items-start">
          <BackLink to="/" />
          <img src={userImg} alt="user img" />
          <Logout />
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
      <ConfirmModal />
    </BaseContainer>
  );
};

export default UserProfile;
