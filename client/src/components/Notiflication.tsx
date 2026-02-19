import type { NotificationProps } from "@/types";

const Notiflication = ({ type, message, onClose }: NotificationProps) => {

  // const stylesType = {
  //   'error': {
      
  //   }





  // }






  return (
    <div className={`notification-main`}>
      <div className="notification-button-close">         
        <button onClick={onClose} type="button" className="close-notification-button">X</button>
      </div>
      <div className="noitification-data-container">
        <div className={`notification-type-${type}`}>
          {type}
        </div>
        <div className="notification-message">
          {message}
        </div>
      </div>
    </div>
  );
};

export default Notiflication;