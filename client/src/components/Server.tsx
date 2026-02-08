import { SERVER_URL } from "../config";
import type ServerProps from "../types/chat/ServerProps";

const Server = ({serverId, avatar, name, disabled, onJoinServer} : ServerProps) => {
  const handleJoin = () => {
    if (onJoinServer) {
      onJoinServer(serverId)
    }
  }
  
  return(
    <>
      <button 
        className="button-server" 
        disabled={disabled}
        onClick={handleJoin}
      >
        <div className={`container-server`}>
            <img src={`${SERVER_URL}${avatar}`} alt="test" className='server-image'/>
            <div className='server-text'> 
              <div className='server-name'>{name}</div>
            </div>
        </div>
      </button>
    </>
  );
}

export default Server;