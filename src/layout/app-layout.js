import React, { useEffect, Suspense, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector, batch } from 'react-redux';
import { Layout } from 'antd';
import Sidebar from '../components/sidebar';
import TabMenu from '../components/tab-menu';
import ChatIcons from '../views/chat/chat-icons';
import Footer from '../components/footer';
import languagesService from '../services/languages';
import { setLangugages, setDefaultLanguage } from '../redux/slices/formLang';
import { fetchAllShops } from '../redux/slices/allShops';
import { fetchCurrencies, fetchRestCurrencies } from '../redux/slices/currency';
import { data } from '../configs/menu-config';
import { setUserData } from '../redux/slices/auth';
import Loading from '../components/loading';
import { fetchMyShop } from '../redux/slices/myShop';
import SubscriptionsDate from '../components/subscriptions-date';
import ParcelFloat from 'views/parcel-order/parcel-float';
import NotificationBar from 'components/notificationBar';
import {
  clearItems,
  fetchAcceptedOrders,
  fetchCanceledOrders,
  fetchDeliveredOrders,
  fetchNewOrders,
  fetchOnAWayOrders,
  fetchOrders,
  fetchReadyOrders,
  fetchCookingOrders,
} from 'redux/slices/orders';

const { Content } = Layout;
const AppLayout = () => {
  const dispatch = useDispatch();
  const notificationListner = useRef(null)
  const { languages } = useSelector((state) => state.formLang, shallowEqual);
  const { user } = useSelector((state) => state.auth, shallowEqual);
  const { direction, navCollapsed } = useSelector(
    (state) => state.theme.theme,
    shallowEqual,
  );

  const fetchLanguages = () => {
    languagesService.getAllActive().then(({ data }) => {
      batch(() => {
        dispatch(setLangugages(data));
        dispatch(
          setDefaultLanguage(
            data?.find((item) => item?.default)?.locale || 'en',
          ),
        );
      });
    });
  };

  useEffect(() => {
    const body = {
      page: 1,
      perPage: 1,
      status: 'approved',
    };
    if (!languages.length) {
      fetchLanguages();
    }
    if (user?.role === 'seller' || user?.role === 'moderator') {
      dispatch(fetchMyShop());
    }
    if (user?.role === 'admin' || user?.role === 'manager') {
      dispatch(fetchAllShops(body));
      dispatch(fetchCurrencies());
    } else {
      dispatch(fetchRestCurrencies());
    }
  }, []);

  useEffect(() => {
    // for development purpose only
    const userObj = {
      ...user,
      urls: data[user.role],
    };
    dispatch(setUserData(userObj));
  }, []);

  const getLayoutGutter = () => {
    // return navCollapsed ? SIDE_NAV_COLLAPSED_WIDTH : SIDE_NAV_WIDTH
    return navCollapsed ? 80 : 250;
  };

  const getLayoutDirectionGutter = () => {
    if (direction === 'ltr') {
      return { paddingLeft: getLayoutGutter(), minHeight: '100vh' };
    }
    if (direction === 'rtl') {
      return { paddingRight: getLayoutGutter(), minHeight: '100vh' };
    }
    return { paddingLeft: getLayoutGutter() };
  };


  useEffect(() => {
    // if(!notificationListner.current) {
    //   notificationListner.current = setInterval(() => {
    //     dispatch(fetchNewOrders({ status: 'new' }));
    //   }, 10000)
  
    //   return () => {
    //     clearInterval(notificationListner.current)
    //   }
    // }
  }, [])


  return (
    <Layout className='app-container'>
      <Sidebar />
      <Layout className='app-layout' style={getLayoutDirectionGutter()}>
        <TabMenu />
        <Content className='p-3' style={{ flex: '1 0 70%' }}>
          <Suspense fallback={<Loading />}>
            <SubscriptionsDate />
            <Outlet />
          </Suspense>
        </Content>
        <Footer />
      </Layout>
      {user?.role === 'admin' ||
      user?.role === 'seller' ||
      user?.role === 'deliveryman' ? (
        <ChatIcons />
        // <NotificationBar />
      ) : (
        ''
      )}
      {user?.role === 'admin' && <ParcelFloat />}
    </Layout>
  );
};

export default AppLayout;
