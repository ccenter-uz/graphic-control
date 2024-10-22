import { FC, useState } from "react";

import BaseModal from "./base-modal";
import ExplanationBtn from "./explanation-btn";

type Props = {
  isError?: boolean;
  isSuccess?: boolean;
};

const NewPreferenceValidation: FC<Props> = ({ isError, isSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleClick = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div>
      <div className="flex">
        <p
          className={`text-sm ${
            isError
              ? "text-[#F44336]"
              : isSuccess
              ? "text-[#4CAF50]"
              : "text-[#64748B]"
          }`}
        >
          1. Не ставьте подряд 6 рабочих дней
        </p>
        <ExplanationBtn
          className="ml-2"
          onClick={handleClick}
          color={isError ? "#F44336" : isSuccess ? "#4CAF50" : "#64748B"}
        />
      </div>
      {isModalOpen ? (
        <BaseModal state={isModalOpen} setState={setIsModalOpen} />
      ) : null}
    </div>
  );
};

export default NewPreferenceValidation;
