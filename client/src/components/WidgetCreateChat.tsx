import { createChat } from "@/api/chat";
import type { CreateChatProps } from "@/types";
import { useState, type FormEvent } from "react";

const WidgetCreateChat = ( {onClose, serverId}: CreateChatProps ) => {
  const [chatType, setChatType] = useState<'text' | 'voice'>('text');
  const [chatName, setChatName] = useState<string>('');

  const handleCreateChat = async (e: FormEvent<HTMLFormElement>) => {
    try {
      setChatName('');
      e.preventDefault()
      if (!serverId) {
        alert('Зайдите на сервер');
        return;
      }
      const data = await createChat(serverId, chatName, chatType);
      if (!data.success) {
        console.error(data.message);
        return;
      }
      alert(data.message);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="widget-create-chat-form-container">
      <form className="create-chat-form" onSubmit={handleCreateChat}>
        <div className="widget-header">
          <div className="widget-header-text">
            <h3>Создать чат</h3>
          </div>
          <div className="widget-button-close">         
            <button onClick={onClose} type="button" className="close-widget-button">X</button>
          </div>
        </div>
        <div className="widget-create-chat-name">
          <label htmlFor="widget-chat-name-input">Chat name</label>
          <input
            value={chatName}
            className="widget-chat-name-input"
            type="text" 
            placeholder="Chat name"
            onChange={(e) => setChatName(e.target.value)}
            minLength={5}
            required
          />
        </div>
        <div className="widget-create-chat-type">
          <div className="container-radio-voice">
            <label htmlFor="widget-chat-type-input-voice">Голосовой</label>
            <input
              type="radio"
              id="widget-chat-type-input-voice"
              value="voice"
              checked={chatType === 'voice'}
              onChange={() => setChatType('voice')}
            /> 
          </div>
          <div className="container-radio-text">
            <label htmlFor="widget-chat-type-input-text">Текстовый</label>
            <input
              type="radio"
              id="widget-chat-type-input-text"
              value="text"
              checked={chatType === 'text'}
              onChange={() => setChatType('text')}
            />
          </div>
        </div>
        <button className="create-chat-button" >
          create chat
        </button>
      </form>
    </div>
  );
};



export default WidgetCreateChat;