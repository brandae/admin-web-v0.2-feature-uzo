import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { addMenu } from '../../redux/slices/menu';

import { useEffect, useState } from 'react';
import { BellOutlined } from '@ant-design/icons';
import NotificationDrawer from 'components/notification-drawer';
import { delMany, values } from 'idb-keyval';
import { Badge } from 'antd';
import { toast } from 'react-toastify';
import PushNotification from 'components/push-notification';


const ChatIcons = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const goToChat = () => {
    dispatch(
      addMenu({
        url: 'chat',
        id: 'chat',
        name: t('chat'),
      })
    );
  };

  const [notificationDrawer, setNotificationDrawer] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const handleFocus = () => {
      getNotifications();
    };
    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  function getNotifications() {
    values().then((val) => setNotifications(val));
  }

  function clearNotifications() {
    delMany(notifications)
      .then(() => {
        setNotifications([]);
        setNotificationDrawer(false);
      })
      .catch(() => toast.error('Error occured'));
  }


  return (
    <div className='chat' style={{ cursor: 'pointer' }}>
      <div style={{ position: 'absolute' }}>
        <span className='icon-button' onClick={() => setNotificationDrawer(true)}>
          <Badge count={notifications.length}>
            <BellOutlined style={{ fontSize: 20 }} />
          </Badge>
        </span>

        <NotificationDrawer
          visible={notificationDrawer}
          handleClose={() => setNotificationDrawer(false)}
          list={notifications}
          clear={clearNotifications}
          refetch={getNotifications}
        />
        <PushNotification refetch={getNotifications} />
      </div>
    </div>
  );
};

export default ChatIcons;



// import React from 'react';
// import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
// import { NavLink } from 'react-router-dom';
// import { shallowEqual, useDispatch, useSelector } from 'react-redux';
// import { addMenu } from '../../redux/slices/menu';
// import { Badge } from 'antd';
// import { useTranslation } from 'react-i18next';
// import { getAllUnreadMessages } from '../../redux/selectors/chatSelector';

// const ChatIcons = () => {
//   const { t } = useTranslation();
//   const dispatch = useDispatch();
//   const goToChat = () => {
//     dispatch(
//       addMenu({
//         url: 'chat',
//         id: 'chat',
//         name: t('chat'),
//       })
//     );
//   };
//   const { user } = useSelector((state) => state.auth, shallowEqual);
//   const { myShop } = useSelector((state) => state.myShop, shallowEqual);
//   const unreadMessages = useSelector(
//     (state) => getAllUnreadMessages(state.chat.messages),
//     shallowEqual
//   );
//   return (
//     <NavLink onClick={goToChat} to='/chat' className='chat'>
//       <Badge
//         count={
//           unreadMessages.filter((item) =>
//             user.role == 'admin'
//               ? item.roleId == 'admin'
//               : user.role == 'seller'
//               ? item.roleId == myShop.id
//               : item.roleId == user.id
//           ).length
//         }
//       >
//         <IoChatbubbleEllipsesOutline className='chat-icon' />
//       </Badge>
//     </NavLink>
//   );
// };

// export default ChatIcons;
