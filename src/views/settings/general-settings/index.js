import React, { useState, useEffect } from 'react';
import { Card, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';

import Setting from './setting';
import Locations from './locations';
import Footer from './footer';
import Reservation from './reservation';
import Permission from './permission';
import Auth from './auth';
import settingService from '../../../services/settings';
import { shallowEqual, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { disableRefetch, setMenuData } from '../../../redux/slices/menu';
import createImage from '../../../helpers/createImage';
import Loading from '../../../components/loading';
import UiType from './ui-type';
import QrCode from './qr-code';


import Currencies from 'views/currencies'
import Payments from 'views/payments'
import PaymentsPayload from 'views/payment-payloads'
import SmsPayload from 'views/sms-payload'
import EmailProvider from 'views/email-provider'
import Notifications from 'views/settings/firebaseConfig'
import Social from 'views/settings/socialSettings'
import AppSetting from 'views/settings/app-setting'
import Languages from 'views/languages'
import AddLanguages from 'views/languages/language-add'
import Translations from 'views/translations'

const { TabPane } = Tabs;
const defaultLocation = {
  lat: 47.4143302506288,
  lng: 8.532059477976883,
};

export default function GeneralSettings() {
  const { t } = useTranslation();
  const [tab, setTab] = useState('settings');
  const [loading, setLoading] = useState(false);
  const { activeMenu } = useSelector((state) => state.menu, shallowEqual);
  const dispatch = useDispatch();
  const [logo, setLogo] = useState(activeMenu.data?.logo || null);
  const [languageTab, setLanguageTab] = useState('view');
  const [favicon, setFavicon] = useState(activeMenu.data?.favicon || null);
  const [location, setLocation] = useState(
    activeMenu.data?.location || defaultLocation
  );

  const onChange = (key) => {
    setLanguageTab('view')
    setTab(key);
  }

  const createSettings = (list) => {
    const result = list.map((item) => ({
      [item.key]: item.value,
    }));
    return Object.assign({}, ...result);
  };

  function fetchSettings() {
    setLoading(true);
    settingService
      .get()
      .then((res) => {
        const data = createSettings(res?.data);
        const locationArray = data?.location?.split(',');
        data.order_auto_delivery_man = data.order_auto_delivery_man === '1';
        data.order_auto_approved = data.order_auto_approved === '1';
        data.parcel_order_auto_approved =
          data.parcel_order_auto_approved === '1';
        data.system_refund = data.system_refund === '1';
        data.refund_delete = data.refund_delete === '1';
        data.prompt_email_modal = data.prompt_email_modal === '1';
        data.blog_active = data.blog_active === '1';
        data.referral_active = data.referral_active === '1';
        data.aws = data.aws === '1';
        data.group_order = data.group_order === '1';
        data.by_subscription = data.by_subscription === '1';
        data.reservation_enable_for_user =
          data.reservation_enable_for_user === '1';
        data.is_demo = data.is_demo === '1';
        data.product_auto_approve = data?.product_auto_approve === '1';
        data.category_auto_approve = data?.category_auto_approve === '1';
        data.before_order_phone_required =
          data?.before_order_phone_required === '1';
        data.location = {
          lat: Number(locationArray?.[0]),
          lng: Number(locationArray?.[1]),
        };
        setLocation(data.location);
        data.logo = createImage(data.logo);
        data.favicon = createImage(data.favicon);
        setLogo(data.logo);
        setFavicon(data.favicon);
        dispatch(setMenuData({ activeMenu, data }));
      })
      .finally(() => {
        setLoading(false);
        dispatch(disableRefetch(activeMenu));
      });
  }


  useEffect(() => {
    if (activeMenu.refetch) {
      fetchSettings();
    }
  }, [activeMenu.refetch]);

  return (
    <Card title={t('settings')}>
      {loading ? (
        <Loading />
      ) : (
        <Tabs
          activeKey={tab}
          onChange={onChange}
          tabPosition='left'
          size='small'
        >
          <TabPane key='settings' tab={'General'}>
            <Setting
              logo={logo}
              setLogo={setLogo}
              favicon={favicon}
              setFavicon={setFavicon}
            />
          </TabPane>
          <TabPane key='location' tab={t('business.location')}>
            <Locations location={location} setLocation={setLocation} />
          </TabPane>
          <TabPane key='permission' tab={t('features')}>
            <Permission />
          </TabPane>
          {/* <TabPane key='auth' tab={'Auth'}>
            <Auth />
          </TabPane> */}
          <TabPane key='footer' tab={t('footer')}>
            <Footer />
          </TabPane>
          <TabPane key='app' tab={'App'}>
            <AppSetting />
          </TabPane>
          <TabPane key='social' tab={'Social'}>
            <Social />
          </TabPane>
          <TabPane key='notifications' tab={'Notification'}>
            <Notifications />
          </TabPane>
          <TabPane key='currencies' tab={'Currencies'}>
            <Currencies />
          </TabPane>
          <TabPane key='payments' tab={'Payments'}>
            <Payments />
          </TabPane>
          <TabPane key='payments-payload' tab={'Payments Payload'}>
            <PaymentsPayload />
          </TabPane>
          <TabPane key='sms-payload' tab={'SMS Payload'}>
            <SmsPayload />
          </TabPane>
          <TabPane key='email-provider' tab={'Email Provider'}>
            <EmailProvider />
          </TabPane>
          <TabPane key='languages' tab={'Languages'}>
            { languageTab === "view" && <Languages onToggleLaunguageView={(mode) => setLanguageTab(mode)} /> }
            { languageTab === "add" && <AddLanguages onToggleLaunguageView={(mode) => setLanguageTab(mode)} /> }
          </TabPane>
          <TabPane key='translations' tab={'Translations'}>
            <Translations />
          </TabPane>
          {/* <TabPane key='ui_type' tab={t('ui.type')}>
            <UiType />
          </TabPane> */}
          {/* <TabPane key='reservation' tab={t('reservation')}>
            <Reservation />
          </TabPane> */}
          {/* <TabPane key='qr_code' tab={t('qrcode')}>
            <QrCode />
          </TabPane> */}
        </Tabs>
      )}
    </Card>
  );
}
