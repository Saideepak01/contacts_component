import { notification as AntNotfication } from "antd";

export function Notification() {
  const [api, contextHolder] = AntNotfication.useNotification();

  const openNotification = (type, message, description) => {
    api[type]({
      message,
      description,
    });
  };

  return { openNotification, contextHolder };
}
