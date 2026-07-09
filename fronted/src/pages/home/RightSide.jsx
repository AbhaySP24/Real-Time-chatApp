import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageContainer from "./MessageContainer";
import { VscSend } from "react-icons/vsc";
import { sendMessageThunk } from "../../store/slice/message/message.thunk";

const RightSide = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userReducer);
  const { buttonLoading } = useSelector((state) => state.messageReducer);
  const [messageText, setMessageText] = React.useState("");

  const handleSendMessage = async () => {
    if (!messageText.trim() || !selectedUser?._id) {
      return;
    }

    await dispatch(
      sendMessageThunk({
        message: messageText,
        receiverId: selectedUser._id,
      }),
    );

    setMessageText("");
  };

  return (
    <div className="w-2/3 h-screen flex flex-col gap-y-2 py-3  ">
      {/* Header: shows the selected chat user. */}

      <div className="flex flex-row items-center gap-8 border-b w-full pb-3 justify-start">
        <div className="avatar pl-3 pt-2 ">
          <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring-2 ring-offset-2">
            <img
              src={
                selectedUser?.profilePic ||
                "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
              }
              alt={selectedUser?.username || "chat user"}
            />
          </div>
        </div>

        <div>
          <h1 className="text-xl font-bold">
            {selectedUser?.username || "Select a user"}
          </h1>
        </div>
      </div>

      {/* Messages section */}
      <MessageContainer />

      {/* Message input section */}
      <div className="flex items-center gap-4 p-4 border-t">
        <input
          type="text"
          placeholder="Type a message..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
          className="input input-bordered flex-1 rounded-2xl border-0 border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={handleSendMessage}
          className="btn btn-primary px-4 py-2 bg-blue-600"
          disabled={buttonLoading}
        >
          {buttonLoading ? (
            <>
              <span className="loading loading-spinner  text-white"></span>
            </>
          ) : (
            <VscSend />
          )}
        </button>
      </div>
    </div>
  );
};

export default RightSide;
