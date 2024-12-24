import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { API_MAP } from "@shared/constants/apiMap";
import { authApi } from "@shared/lib/baseApi";
import { HttpStatusCode } from "@shared/model/httpStatus";

import Avatar from "./avatar";

interface IUserImage {
  image: string;
  fullname: string;
}

const initialUserImage = {
  image: "",
  fullname: "",
};

const UserProfileLink = () => {
  const [userImage, setUserImage] = useState<IUserImage>(initialUserImage);
  const token = localStorage.getItem("GCToken") as string;
  const storedUserImage = localStorage.getItem("userImage");
  const storedUserFullName = localStorage.getItem("userFullName");

  const fetchUserInfo = async () => {
    try {
      const res = await authApi.get(API_MAP.GET_USER_INFO, {
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === HttpStatusCode.OK) {
        localStorage.setItem("userImage", res.data.image);
        localStorage.setItem("userFullName", res.data.name);
        setUserImage({
          image: res.data.image,
          fullname: res.data.name,
        });
      }
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  };

  useEffect(() => {
    storedUserImage && fetchUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Link to="/user">
      <Avatar
        src={storedUserImage || userImage.image}
        fullname={storedUserFullName || userImage.fullname}
        size="small"
      />
    </Link>
  );
};

export default UserProfileLink;
