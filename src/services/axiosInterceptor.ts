import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

enum HttpStatus {
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
}
const TOKEN_KEY = 'token';
const onRequest = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> => {
  console.log("ggggg")
  const authToken = localStorage.getItem(TOKEN_KEY);
  const isTokenRequired = config?.headers?.['X-TOKEN-REQ'] === false ? false : true;
  config.headers.delete('X-TOKEN-REQ');

  config.headers['Content-type'] = 'application/json; charset=UTF-8';
  // config.headers['x-wm-adminui'] = true;
  if (!isTokenRequired) {
    return config;
  }

  if (isTokenRequired && !authToken&&!config?.url?.includes('usermgmt/usermgmtsupport/Login')) {
    const controller = new AbortController();
    controller.abort();
    config.signal = controller.signal;
    return config;
  }

  if (isTokenRequired && authToken&&!config?.url?.includes('usermgmt/usermgmtsupport/Login')) {
    config.headers['Authorization'] = `Bearer ${authToken}`;
    return config;
  }

  return config;
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onErrorResponse = (error: AxiosError | Error): Promise<AxiosError> => {
  if (axios.isAxiosError(error)) {
    const { status } = (error.response as AxiosResponse) ?? {};
    switch (status) {
      case HttpStatus.Unauthorized:
        // Handle "Login required" error
        //for login and UAEPass apis show toast messages
        if (
          !error?.config?.url?.endsWith('Login') &&
          !error?.config?.url?.includes('/moeimgmt/login/UAEPass?code')
        ) {
          window.dispatchEvent(new CustomEvent('unauthorized'));
        }
        break;
      case HttpStatus.Forbidden:
        // Handle "Permission denied" error
        break;
      case HttpStatus.NotFound:
        // Handle "Invalid request" error
        break;
      case HttpStatus.InternalServerError:
        // Handle "Server error" error
        break;
      default:
        // Handle unknown error
        break;
    }
  }
  // Always reject the promise to maintain the error flow
  return Promise.reject(error);
};

const axiosInterceptor = (instance: AxiosInstance): AxiosInstance => {
  instance.interceptors.request.use(onRequest, onErrorResponse);
  instance.interceptors.response.use(onResponse, onErrorResponse);
  return instance;
};
export default axiosInterceptor;
