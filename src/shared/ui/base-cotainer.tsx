import React, { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const BaseContainer: FC<Props> = ({ children, className }) => {
  return (
    <div
      className={`${className} flex flex-col w-[390px] my-0 mx-auto px-[54px]`}
    >
      {children}
    </div>
  );
};

export default BaseContainer;
