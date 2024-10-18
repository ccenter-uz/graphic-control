import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import BaseButton from "@shared/ui/base-button";
import BaseContainer from "@shared/ui/base-cotainer";
import HeaderContainer from "@shared/ui/header-container";
import HeaderTitle from "@shared/ui/header-title";

import doneImg from "../../assets/images/done.svg";

const Done = () => {
  const { t } = useTranslation();
  return (
    <BaseContainer>
      <HeaderContainer>
        <HeaderTitle className="text-center">{t("done.title")}</HeaderTitle>
      </HeaderContainer>
      <img src={doneImg} alt="done image" className="mx-auto my-20" />
      <Link to="/">
        <BaseButton>{t("done.button_title")}</BaseButton>
      </Link>
    </BaseContainer>
  );
};

export default Done;
