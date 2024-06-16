import {  notification, } from 'antd';

export const Notification = (message, type) =>{
  const placement = "top"
       switch (type) {
        case "success":
          notification.success({ message , placement });
          break;
        case "error":
          notification.error({ message,placement });
          break;
        case "warning":
          notification.warning({ message,placement });
          break;
        case "info":
          notification.info({ message, placement });
          break;
        default:
          break;
      }

}