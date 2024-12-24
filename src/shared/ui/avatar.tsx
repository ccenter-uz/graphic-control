import React, { useEffect, useState } from "react";

interface IAvatarProps {
  fullname: string;
  src?: string;
  width: string;
  height?: string;
}

const Avatar: React.FC<IAvatarProps> = ({ fullname, src, width, height }) => {
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
      className={`flex items-center justify-center bg-gray-200 ${width} ${height} rounded-full`}
    >
      {isLoading ? (
        <div className="animate-pulse h-full w-full bg-gray-300 rounded-full" />
      ) : imageSrc ? (
        <img
          src={imageSrc}
          alt={fullname}
          className={`${width} ${height} object-cover object-top rounded-full`}
        />
      ) : (
        <span className="text-3xl font-bold text-[#394e34]">
          {firstLetters}
        </span>
      )}
    </div>
  );
};

export default Avatar;
