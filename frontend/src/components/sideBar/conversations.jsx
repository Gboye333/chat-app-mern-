import Conversation from "./conversation";
import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from '../../utils/emoji'; // Adjust the path based on where the function is defined.


const conversations = () => {
  const { loading, conversations } = useGetConversations();

  return (
    <div className='py-2 flex flex-col overflow-auto'>
   
   {conversations.map((conversation,idx) => (
    <Conversation 
      key={conversation._id}
      conversation={conversation}
      emoji={getRandomEmoji()}
      lastIdx={idx === conversations.length -1}
    />
   ))}
      
    {loading ? <span className="loading loading-spinner"></span> : null}
    </div>
  )
}

export default conversations