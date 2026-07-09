import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessageThunk } from "../../store/slice/message/message.thunk";

const MessageContainer = () => {
  const dispatch = useDispatch();
  const { selectedUser, user } = useSelector((state) => state.userReducer);
  const { messages } = useSelector((state) => state.messageReducer);

  useEffect(() => {
    if (selectedUser?._id) {
      // Load the conversation of the selected user.
      dispatch(getMessageThunk(selectedUser._id));
    }
  }, [dispatch, selectedUser]);

  if (!selectedUser) {
    return (
      <div className="w-full flex items-center justify-center flex-col gap-5 h-full">
        <h2 className="text-2xl font-bold">Welcome to Chat App</h2>
        <p className="text-xl text-center">
          Please select a person from the left panel to continue your chat.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 overflow-y-auto p-4 gap-3">
      {messages.length > 0 ? (
        messages.map((message) => {
          const isCurrentUser = String(message.senderId) === String(user?._id);

          return (
            <div
              key={message._id}
              className={`chat ${isCurrentUser ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Profile"
                    src={
                      isCurrentUser
                        ? user?.profilePic ||
                          "https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                        : selectedUser?.profilePic ||
                          "https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                    }
                  />
                </div>
              </div>

              <div className="chat-header">
                <span className="text-xs font-semibold mr-1">
                  {isCurrentUser ? user?.username : selectedUser?.username}
                </span>
              </div>

              <div
                className={`chat-bubble ${isCurrentUser ? "bg-blue-500 text-white" : ""}`}
              >
                {message.message}
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center text-gray-500 mt-10">
          No messages yet. Start the conversation.
        </p>
      )}
    </div>
  );
};

export default MessageContainer;
