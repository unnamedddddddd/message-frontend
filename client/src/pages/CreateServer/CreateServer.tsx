import React, { useState } from "react";
import './CreateServer.css';
import { createServer } from "@/api/chat";
import { useNavigate } from 'react-router-dom'


const CreateServer = () => {
  const [serverName, setServerName] = useState<string>('');
  const [serverAvatar, setServerAvatar] = useState<File | null>(null);
  const [serverAvatarURL, setServerAvatarURL] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
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
    alert('Пользователь создан успешно');
    navigate('/login');
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
    <div className="create-server-main">
      <div className="create-server-form-container">
        <form className="create-server-form" onSubmit={handleSubmit}>
          <div className="server-data">
            <div className="server-avatar-container">
              <label htmlFor="server-avatar-upload" className="avatar-label">
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
            <div className="server-text-container">
              <input 
                type="text" 
                value={serverName}  
                onChange={(e) => setServerName(e.target.value)}
                placeholder="Название сервера"
                className="server-name-input"
              />
            </div>
          </div>
          <div className="button-container">
            <button type="submit" className='create-server-button'>
              create server
            </button>
          </div>  
        </form>
      </div>
    </div>
  );
}

export default CreateServer;