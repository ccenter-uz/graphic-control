import { Link } from "react-router-dom";

import userImg from "../../../assets/images/user.svg";

const UserProfileLink = () => {
  return (
    <Link to="/user">
      <img src={userImg} alt="user img" className="w-8 h-8" />
    </Link>
  );
};

export default UserProfileLink;
