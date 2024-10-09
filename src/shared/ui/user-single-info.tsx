import { FC } from "react";

type Props = {
  title: string;
  value: string;
};

const UserSingleInfo: FC<Props> = ({ title, value }) => {
  return (
    <div className="flex justify-between items-center px-5 py-3 border bg-[#F0F7FE] rounded-md">
      <p className="text-[#394e34]">{title}</p>
      <p className="text-[#394e34]">{value}</p>
    </div>
  );
};

export default UserSingleInfo;
