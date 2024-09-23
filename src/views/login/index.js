import './login.css'
import React, { useEffect, useState, useRef } from 'react';
import { data } from '../../configs/menu-config';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Descriptions,
  Form,
  Input,
  notification,
  Row,
  Typography,
} from 'antd';
import authService from '../../services/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../../redux/slices/auth';
import {
  fetchRestSettings,
  fetchSettings,
} from '../../redux/slices/globalSettings';
import { useTranslation } from 'react-i18next';
import { PROJECT_NAME } from '../../configs/app-global';
import Recaptcha from 'components/recaptcha';
import { setMenu } from 'redux/slices/menu';
import bannerImage from "../../assets/images/v2_4.png"
import Logo from "../../assets/images/BrandLogo.png"
const { Title } = Typography;


const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { settings } = useSelector((state) => state.globalSettings);
  const [recaptcha, setRecaptcha] = useState(null);
  const handleRecaptchaChange = (value) => {
    setRecaptcha(value);
  };
  // const isDemo = Boolean(Number(settings?.is_demo));
  const isDemo = false;

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const credRef = useRef({ email: '', password: '' })

  const handleLogin = (values) => {
    const body = { password: password };
    console.log(email)
    console.log(password)
    if (email.includes('@')) {
      body.email = email;
    } else {
      body.phone = email.replace(/[^0-9]/g, '');
    }

    setLoading(true);
    authService
      .login(body)
      .then((res) => {
        const user = {
          fullName: res.data.user.firstname + ' ' + res.data.user.lastname,
          role: res.data.user.role,
          urls: data[res.data.user.role],
          img: res.data.user.img,
          token: res.data.access_token,
          email: res.data.user.email,
          id: res.data.user.id,
          shop_id: res.data.user?.shop?.id,
        };
        if (user.role === 'waiter') {
          dispatch(
            setMenu({
              icon: 'user',
              id: 'orders-board',
              name: 'my.orders',
              url: 'waiter/orders-board',
            })
          );
        }
        if (user.role === 'user') {
          notification.error({
            message: t('ERROR_101'),
          });
          return;
        }
        localStorage.setItem('token', res.data.access_token);
        dispatch(setUserData(user));
        if (user.role === 'admin') {
          dispatch(fetchSettings());
        } else {
          dispatch(fetchRestSettings());
        }
      })
      .finally(() => setLoading(false));
  };

  const copyCredentials = (event, item) => {
    event.preventDefault();
    form.setFieldsValue({ email: item.login, password: item.password });
  };

  useEffect(() => {
    dispatch(fetchRestSettings());
  }, []);


  // useEffect(() => {
  //   const listener = event => {
  //     if (event.code === "Enter" || event.code === "NumpadEnter") {
  //       event.preventDefault(credRef.current);
  //       handleLogin()
  //     }
  //   };

  //   document.addEventListener("keydown", listener);

  //   return () => {
  //     document.removeEventListener("keydown", listener);
  //   };
  // }, []);

  return (
    <div className='login-container'>
      <div className='login__wrapper'>
        <img className='login__wrapper_logo' src={Logo} />
        <div className='login__form'>
          <div className='login__form_wrapper'>
            <div className='login__form_header'>Welcome Back</div>
            <div className='login__form_subheader'>Login into your account</div>
            <input required type="email" value={email} onChange={e => { setEmail(e.target.value); credRef.current.email = e.target.value }} placeholder="Email" className='login__form_input' />
            <input required type="password" value={password} onChange={e => { setPassword(e.target.value); credRef.current.password = e.target.value }} placeholder="Password" className='login__form_input' />
            <button type="submit" onClick={handleLogin} className='login__form_control'>
              {
                loading
                  ? <span class="login__form_control__loader"></span>
                  : "Log In"
              }
            </button>
          </div>
        </div>

        <div className='login__banner'>
          <img src={bannerImage} />

          <div className='login__banner_info'>
            <div className='login__banner_info__circle'></div>
            <div className='login__banner_info__text'>
              In the realm of commerce, change is constant. Embrace it, adapt, thrive, innovate.
            </div>
          </div>
        </div>
      </div>

      {/* <div class="v2_2">
        <div class="v2_3"></div>
        <div class="v2_4"></div>
        <div class="v2_5"></div>
        <div class="v2_6"></div><span class="v2_11">In the realm of commerce, change is constant. Embrace it, adapt, thrive,
          innovate.</span>
        <div class="v2_12">
          <div class="v2_14"></div>
          <div class="v2_15"></div>
          <div class="v2_38">
            <div class="v2_39"></div><span class="v2_40">Email</span>
          </div>
          <div class="v2_41">
            <div class="v2_42"></div><span class="v2_43">Password</span>
            <div class="v2_44">
              <div class="v2_45">
                <div class="v2_46">
                  <div class="v2_47"></div>
                  <div class="v2_48"></div>
                  <div class="v2_49"></div>
                  <div class="v2_50"></div>
                  <div class="v2_51"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="v2_52">
            <div class="v2_53"></div><span class="v2_54">Log In</span>
          </div><span class="v2_55">Login into your account</span><span class="v2_56">Welcome Back</span>
        </div><span class="v2_58">Support</span>
        <div class="v103_2">
          <div class="v103_3">
            <div class="v103_4">
              <div class="v103_5"></div>
              <div class="v103_6"></div>
              <div class="v103_7">
                <div class="v103_8"></div>
              </div>
            </div><span class="v103_9">Grow, Build, Succeed.</span>
          </div>
        </div>
        <div class="v103_11">
          <div class="v103_12">
            <div class="v103_13">
              <div class="v103_14"></div>
            </div>
            <div class="v103_15">
              <div class="v103_16"></div>
            </div>
            <div class="v103_17">
              <div class="v103_18"></div>
            </div>
          </div>
        </div>
      </div> */}
    </div >
  );
};
export default Login;
