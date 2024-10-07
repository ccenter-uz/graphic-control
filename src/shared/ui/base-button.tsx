import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const BaseButton: FC<Props> = (props) => {
  return (
    <button className="text-white p-2.5 rounded-lg w-full bg-gradient-to-r from-[#174880] to-[#3981EC]">
      {props.children}
    </button>
  );
};

export default BaseButton;
