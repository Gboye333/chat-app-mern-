import { useAuthContext } from "../../context/AuthContext"
import useConversation from "../../Zustand/useConversation";

const Message = ({message}) => {
  const { authUser } = useAuthContext();
  const { selectedConversation, setSelectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const profilePicture = fromMe ? authUser.profilePicture : selectedConversation?.profilePicture;
  const bubbleBgColor = fromMe ? 'bg-blue-500' : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={profilePicture}
          />
        </div>
      </div>
      <div>
        <div className={`chat-bubble text-white   ${bubbleBgColor}`}>{message.message}</div>
        <div className="chat-footer opaciity-50  text-xs flex gap-1 items-center">12:42</div>
      </div>
    </div>
  )
}

export default Message