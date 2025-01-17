import { FC } from "react";
import { useTranslation } from "react-i18next";

import BaseButton from "./base-button";
import { Loader } from "./loader";
import SecondaryButton from "./secondary-button";

type Props = {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  confirmBtnClick: () => void;
  modalText?: string;
  confirmBtnTitle?: string;
  loading?: boolean;
};
const ConfirmModal: FC<Props> = ({
  state,
  setState,
  confirmBtnClick,
  modalText,
  confirmBtnTitle,
  loading,
}) => {
  const { t } = useTranslation();

  const handleCancelClick = () => {
    setState(!state);
  };

  return (
    <div
      onClick={handleCancelClick}
      className="absolute w-full h-screen flex items-center justify-center bg-white bg-opacity-30 backdrop-blur-sm top-0 left-0"
    >
      <div
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          e.stopPropagation()
        }
        className="min-w-[300px] my-auto px-5 py-6 border rounded-lg bg-white z-[9999]"
      >
        <p className="text-center mb-8 text-sm text-[#64748B]">
          {modalText ? modalText : t("shared.confirm_modal.title")}
        </p>
        <div className="flex justify-between items-center">
          <SecondaryButton className="w-1/3" onClick={handleCancelClick}>
            {t("shared.confirm_modal.cancel")}
          </SecondaryButton>
          {loading ? (
            <Loader />
          ) : (
            <BaseButton widthNotFull={true} onClick={confirmBtnClick}>
              {confirmBtnTitle
                ? confirmBtnTitle
                : t("shared.confirm_modal.confirm")}
            </BaseButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
