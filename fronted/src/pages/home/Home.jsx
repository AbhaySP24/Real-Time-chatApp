import React from "react";
import UserSidebar from "./UserSidebar";
import RightSide from "./RightSide";
import { useDispatch, useSelector } from "react-redux";
import {
  connectSocket,
  disconnectSocket,
  getSocket,
} from "../../socket/socket";
import { setNewMessage } from "../../store/slice/message/message.slice";

const Home = () => {
  const dispatch = useDispatch();
  const { user, selectedUser } = useSelector((state) => state.userReducer);

  React.useEffect(() => {
    if (!user?._id) {
      return;
    }

    const socket = connectSocket(user._id);

    socket?.on("newMessage", (newMessage) => {
      const activeChatUserId = selectedUser?._id;

      // Only push the message into the current chat if it belongs to the open conversation.
      if (
        activeChatUserId &&
        String(newMessage.senderId) === String(activeChatUserId)
      ) {
        dispatch(setNewMessage(newMessage));
      }
    });

    return () => {
      const currentSocket = getSocket();
      currentSocket?.off("newMessage");
      disconnectSocket();
    };
  }, [dispatch, selectedUser, user?._id]);

  return (
    <div className="flex flex-row w-full h-screen">
      <UserSidebar className="px-3 w-1/3 border-r h-screen flex flex-col" />
      <RightSide />
    </div>
  );
};

export default Home;
