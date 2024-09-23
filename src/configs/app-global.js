export const PROJECT_NAME = process.env.REACT_APP_PROJECT_NAME
export const IMG_URL = '';
export const BASE_URL = process.env.REACT_APP_API_BASE_URL
export const WEBSITE_URL = process.env.REACT_APP_WEBSITE_URL
export const VERSION_SUFFIX = process.env.REACT_APP_API_VERSION_SUFFIX

export const api_base = `${BASE_URL}${VERSION_SUFFIX}`;

export const api_url = `${api_base}/`;
export const example = BASE_URL + '/';
export const export_url = process.env.REACT_APP_EXPORT_URL
export const api_url_admin = `${api_base}${process.env.REACT_APP_DASHBOARD_NAMESPACE}${process.env.REACT_APP_ADMIN_NAMESPACE}/`;
export const api_url_admin_dashboard = `${api_base}${process.env.REACT_APP_DASHBOARD_NAMESPACE}/`;

// Google Maps
export const MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY
export const VAPID_KEY = process.env.REACT_APP_GOOGLE_MAP_VAPID_KEY
export const LAT = process.env.REACT_APP_GOOGLE_MAP_DEFAULT_LAT
export const LNG = process.env.REACT_APP_GOOGLE_MAP_DEFAULT_LANG
// Firebase
export const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY
export const AUTH_DOMAIN = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
export const PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID
export const STORAGE_BUCKET = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
export const MESSAGING_SENDER_ID = process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
export const APP_ID = process.env.REACT_APP_FIREBASE_APP_ID
export const MEASUREMENT_ID = process.env.REACT_APP_FIREBASE_MEASUREMENT_ID

// Recaptcha
export const RECAPTCHASITEKEY = process.env.REACT_APP_RECAPTCHA_SITEKEY;

// Have to remvoe
export const DEMO_SELLER = 334; // seller_id
export const DEMO_SELLER_UUID = '3566bdf6-3a09-4488-8269-70a19f871bd0'; // seller_id
export const DEMO_SHOP = 599; // seller_id
export const DEMO_DELIVERYMAN = 375; // deliveryman_id
export const DEMO_MANEGER = 114; // deliveryman_id
export const DEMO_MODERATOR = 297; // deliveryman_id
export const DEMO_ADMIN = 107; // deliveryman_id

export const SUPPORTED_FORMATS = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'image/svg',
];
