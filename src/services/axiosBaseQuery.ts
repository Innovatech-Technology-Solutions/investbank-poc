import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios from 'axios';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import { getBaseURL } from '../utils/Commonutils';
const axiosBaseQuery =
  (
    baseURL: string = getBaseURL(),
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {

    try {
      const response = await axios({
        url: baseURL + url,
        method,
        data,
        params,
        headers,
      });
      return {
        data: {
          data: response.data,
          status: response.status,
          statusText: response.statusText,
        },
      };
    } catch (axiosError) {
      const err = (axiosError as AxiosError)
      return {
        error: {
          status: err?.response?.status,
          data: err?.response?.data || err?.message,
        },
      };
    }
  };

export default axiosBaseQuery;
