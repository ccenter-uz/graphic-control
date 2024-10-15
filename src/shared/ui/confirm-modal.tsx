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
    <div
      onClick={handleCancelClick}
      className="absolute w-full h-screen flex items-center justify-center bg-white bg-opacity-30 backdrop-blur-sm top-0 left-0"
    >
      <div
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          e.stopPropagation()
        }
        className="my-auto px-5 py-6 border rounded-lg bg-white z-[9999]"
      >
        <p className="text-center mb-8">Вы действительно хотите выйти?</p>
        <div className="flex justify-between">
          <SecondaryButton className="w-1/3" onClick={handleCancelClick}>
            Отмена
          </SecondaryButton>
          <BaseButton className="w-1/3">Выйти</BaseButton>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
