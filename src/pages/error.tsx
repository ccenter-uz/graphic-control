import { FC } from "react";
import { Link } from "react-router-dom";

import BaseButton from "@shared/ui/base-button";
import BaseContainer from "@shared/ui/base-cotainer";
import HeaderTitle from "@shared/ui/header-title";

import errorImg from "../../assets/images/error.png";

type Props = {
  errorNumber: number;
  errorMessage: string;
};

const Error: FC<Props> = ({ errorNumber, errorMessage }) => {
  return (
    <BaseContainer className="borderr pt-20">
      <h6 className="text-lg text-center mb-1">{errorNumber}</h6>
      <img src={errorImg} alt="error img" className="mx-auto mb-14" />
      <HeaderTitle className="text-center mb-6">{errorMessage}</HeaderTitle>
      <Link to="/">
        <BaseButton>Перейти в главное меню</BaseButton>
      </Link>
    </BaseContainer>
  );
};

export default Error;
