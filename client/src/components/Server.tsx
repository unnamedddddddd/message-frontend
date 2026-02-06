import type ServerProps from "../interfaces/ServerProps";

const Server = ({serverId, avatar, name, disabled, onJoinServer} : ServerProps) => {
  const handleJoin = () => {
    if (onJoinServer) {
      onJoinServer(serverId)
    }
  }
  console.log(`http://localhost:3000${avatar}`);

  return(
    <>
      <button 
        className="button-server" 
        disabled={disabled}
        onClick={handleJoin}
      >
        <div className={`container-server`}>
            <img src={`http://localhost:3000${avatar}`} alt="test" className='server-image'/>
            <div className='server-text'> 
              <div className='server-name'>{name}</div>
            </div>
        </div>
      </button>
    </>
  );
}

export default Server;