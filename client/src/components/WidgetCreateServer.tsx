import { createServer } from "@/api/chat";
import type { CreateServerProps } from "@/types";
import { useState } from "react";

const WidgetCreateServer = ( {onClose}: CreateServerProps ) => {
  const [serverName, setServerName] = useState<string>('');
  const [serverAvatar, setServerAvatar] = useState<File | null>(null);
  const [serverAvatarURL, setServerAvatarURL] = useState<string>('');

  const handleCreateServer = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!serverAvatar) {
      alert('Выберите аватар сервера');
      return;
    }

    const data = await createServer(serverName, serverAvatar);
    if (!data.success) {
     console.error(data.message);
      alert(`Ошибка: ${data.message}`);
      return
    }
    alert('Сервер создан успешно');
    window.location.reload();
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Файл слишком большой (макс 5МБ)');
      return;
    }

    setServerAvatar(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setServerAvatarURL(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="widget-create-server-form-container">
      <form className="create-server-form" onSubmit={handleCreateServer}>
        <div className="widget-header">
          <div className="widget-header-text">
            <h3>Создать сервер</h3>
          </div>
          <div className="widget-button-close">         
            <button onClick={onClose} type="button" className="close-widget-button">X</button>
          </div>
        </div>
        <div className="server-avatar-container">
          <label htmlFor="server-avatar-upload" className="server-avatar-label">
            <div className="avatar-overlay">Поставить аватар</div>
          </label>
          <input 
            type="text" 
            value={serverAvatarURL} 
            placeholder="Avatar URL"
            className="server-avatar-input"
            disabled={true}
          />
        </div>
         <input 
              id="server-avatar-upload"
              onChange={handleFileChange}
              type="file"  
              style={{ display: 'none' }} 
            />
        <div className="widget-create-server-name">
          <label htmlFor="widget-server-name-input" className="widget-server-name-label">Server name</label>
          <input
            value={serverName}
            id="widget-server-name-input"
            className="widget-server-name-input"
            type="text" 
            placeholder="server name"
            onChange={(e) => setServerName(e.target.value)}
            minLength={5}
            required
          />
        </div>
        <button className="create-server-button" type="submit" >
          create server
        </button>
      </form>
    </div>
  );
};



export default WidgetCreateServer;