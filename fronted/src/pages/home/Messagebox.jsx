import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../store/slice/user/user.slice";
import { twMerge } from "tailwind-merge";

const Messagebox = ({ className }) => {
  const dispatch = useDispatch();
  const { otherUsers, selectedUser } = useSelector(
    (state) => state.userReducer,
  );

  return (
    <div
      className={twMerge(
        "w-full flex flex-col gap-y-2 py-3 flex-1 overflow-y-auto",
        className,
      )}
    >
      {otherUsers?.length ? (
        otherUsers.map((user) => (
          <button
            key={user._id}
            type="button"
            onClick={() => dispatch(setSelectedUser(user))}
            className={`flex flex-row items-center gap-4 rounded-3xl p-2 cursor-pointer hover:bg-gray-400 text-left ${
              selectedUser?._id === user._id ? "bg-gray-300" : "bg-gray-200"
            }`}
          >
            <div className="avatar">
              <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring-2 ring-offset-2">
                <img
                  src={
                    user.profilePic ||
                    "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                  }
                  alt={user.username}
                />
              </div>
            </div>
            <div className="font-medium text-black">{user.username}</div>
          </button>
        ))
      ) : (
        <p className="text-sm text-gray-500 px-2">No other users found.</p>
      )}
    </div>
  );
};

export default Messagebox;
