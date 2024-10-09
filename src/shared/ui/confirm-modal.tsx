import { FC } from "react";

import BaseButton from "./base-button";
import SecondaryButton from "./secondary-button";

type Props = {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
};
const ConfirmModal: FC<Props> = ({ state, setState }) => {
  const handleCancelClick = () => {
    setState(!state);
  };

  return (
    <div className="px-5 py-6 border rounded-lg mx-6 bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999]">
      <p className="text-center mb-8">Вы действительно хотите выйти?</p>
      <div className="flex justify-between">
        <SecondaryButton className="w-1/3" onClick={handleCancelClick}>
          Отмена
        </SecondaryButton>
        <BaseButton className="w-1/3">Выйти</BaseButton>
      </div>
    </div>
  );
};

export default ConfirmModal;
