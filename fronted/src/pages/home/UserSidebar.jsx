import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOtherUserThunk,
  logoutUserThunk,
} from "../../store/slice/user/user.thunk";
import { twMerge } from "tailwind-merge";
import Messagebox from "./Messagebox";

const UserSidebar = ({ className }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);

  React.useEffect(() => {
    dispatch(getOtherUserThunk());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUserThunk());
  };

  return (
    <div className={twMerge("w-full h-screen px-2 ", className)}>
      <div className="text-2xl font-bold text-center py-4">CHAT APP</div>

      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent border border-gray-300 focus:outline-none focus:border-none focus:ring-2 focus:ring-blue-500 w-full pl-10 py-4 p-4 rounded-4xl"
      />

      <Messagebox className="h-full" />

      <div className="flex flex-row justify-between mb-2 border-t pt-3">
        <div className="flex flex-row items-center gap-4">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-15 rounded-full ring-2 ring-offset-2">
              <img
                src={
                  user?.profilePic ||
                  "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                }
                alt={user?.username || "current user"}
              />
            </div>
          </div>

          <div>
            <h1 className="text-xl font-bold">{user?.username || "User"}</h1>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="bg-red-400 text-xl font-bold py-2 px-4 rounded-3xl outline-none cursor-pointer hover:bg-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserSidebar;
