import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  bgColor?: string;
};

const BaseContainer: FC<Props> = ({ children, className = "" }) => {
  return (
    <div
      className={`${className} relative h-screen flex flex-col min-w-[320px] max-w-[375px] w-[100%] my-0 mx-auto px-[10px]`}
    >
      {children}
    </div>
  );
};

export default BaseContainer;
