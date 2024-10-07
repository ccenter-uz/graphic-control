import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const PageTitle: FC<Props> = ({ children }) => {
  return <h1 className="text-xl font-semibold">{children}</h1>;
};

export default PageTitle;
