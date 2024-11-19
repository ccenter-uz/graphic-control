import { ChangeEvent, Dispatch, FC, useEffect, useState } from "react";

import BaseLabel from "@shared/ui/base-label";
import BaseTextarea from "@shared/ui/base-textarea";

interface Props {
  className?: string;
  setIsSubmitBtnActive: Dispatch<React.SetStateAction<boolean>>;
}
export const Step4ReasonForm: FC<Props> = ({
  className = "",
  setIsSubmitBtnActive,
}) => {
  const MAX_LETTER = 250;
  const [textareaValue, setTextareaValue] = useState("");
  const [message, setMessage] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    if (MAX_LETTER - e.target.value.length >= 0) {
      setTextareaValue(e?.target?.value);
    }
  };

  useEffect(() => {
    console.log(textareaValue.length);

    if (textareaValue.length === 0) {
      setIsSubmitBtnActive(false);
    } else {
      setIsSubmitBtnActive(true);
    }
    if (MAX_LETTER - textareaValue.length === 0) {
      setMessage("Вы больше не можете печатать!");
    } else {
      setMessage("");
    }
  }, [setIsSubmitBtnActive, textareaValue]);
  return (
    <div className={`${className}`}>
      <BaseLabel>Укажите причину предпочтения:</BaseLabel>
      <BaseTextarea
        value={textareaValue}
        onChange={handleTextAreaChange}
        isFocused={isFocused}
        setIsFocused={setIsFocused}
        message={message}
      />
      <div className="flex justify-between">
        <p className="text-sm text-[#C43D46]">{message}</p>
        <p className="text-sm text-[#64748B]">
          {textareaValue.length}/{MAX_LETTER}
        </p>
      </div>
    </div>
  );
};
