import { Link } from "react-router-dom";

import userProfileImg from "../../../assets/images/user-profile.svg";

const UserProfileLink = () => {
  return (
    <Link to="/user">
      <img src={userProfileImg} alt="user img" className="w-8 h-8" />
    </Link>
  );
};

export default UserProfileLink;
