import React, { useEffect, useState } from "react";

interface IAvatarProps {
  fullname: string;
  src?: string;
  size: string;
}

const Avatar: React.FC<IAvatarProps> = ({ fullname, src, size }) => {
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (src) {
      setIsLoading(true);
      const image = new Image();
      image.onload = () => {
        setIsLoading(false);
        setImageSrc(src);
      };
      image.onerror = () => {
        setIsLoading(false);
      };
      image.src = src;
    }
  }, [src]);

  const firstLetters = fullname
    .split(" ")
    .map((name) => name[0])
    .join("");

  return (
    <div
      className={`${
        size === "big" ? "w-[100px] h-[100px]" : "w-8 h-8"
      } flex items-center justify-center bg-gray-200 rounded-full`}
    >
      {isLoading ? (
        <div className="animate-pulse h-full w-full bg-gray-300 rounded-full" />
      ) : imageSrc ? (
        <img
          src={imageSrc}
          alt={fullname}
          className={`${
            size === "big" ? "w-[100px] h-[100px]" : "w-8 h-8"
          } object-cover object-top rounded-full`}
        />
      ) : (
        <span
          className={`${
            size === "big" ? "text-3xl" : "text-xs"
          } font-bold text-[#394e34]`}
        >
          {firstLetters}
        </span>
      )}
    </div>
  );
};

export default Avatar;
