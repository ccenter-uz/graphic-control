import { FC } from "react";

type Props = {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
};
const BaseModal: FC<Props> = ({ state, setState }) => {
  const handleCancelClick = () => {
    setState(!state);
  };
  return (
    <div
      onClick={handleCancelClick}
      className="absolute w-full h-screen flex items-center justify-center bg-white bg-opacity-30 backdrop-blur-sm top-0 left-0 z-50"
    >
      <div
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          e.stopPropagation()
        }
        className="border my-auto px-5 py-6 rounded-lg bg-white w-[300px]"
      >
        <h6 className="text-sm text-center font-semibold">Title</h6>
        <p className="text-xs">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur,
          deserunt! Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Consectetur, deserunt!
        </p>
      </div>
    </div>
  );
};

export default BaseModal;
