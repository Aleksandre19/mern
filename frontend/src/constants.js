// export const BASE_URL =
//   process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';
const mode = process.env.NODE_ENV;
export const BASE_URL = '';
export const PRODUCTS_URL = '/api/products';
export const USERS_URL = '/api/users';
export const ORDERS_URL = '/api/orders';
export const PAYPAL_URL = '/api/config/paypal';
export const UPLOADS_URL =
  mode === 'development' ? '/api/uploads' : '/var/data/uploads';
