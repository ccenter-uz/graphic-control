import BaseButton from "./base-button";
import SecondaryButton from "./secondary-button";

const ConfirmModal = () => {
  return (
    <div className="px-5 py-6 border rounded-lg mx-6">
      <p className="text-center mb-8">Вы действительно хотите выйти?</p>
      <div className="flex justify-between">
        <SecondaryButton className="w-1/3">Отмена</SecondaryButton>
        <BaseButton className="w-1/3">Выйти</BaseButton>
      </div>
    </div>
  );
};

export default ConfirmModal;
