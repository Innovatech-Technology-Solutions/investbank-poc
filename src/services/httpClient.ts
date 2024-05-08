import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './axiosBaseQuery';

export const httpClient = (rp?: string, baseURL?: string) =>
  createApi({
    baseQuery: axiosBaseQuery(baseURL),
    endpoints: () => ({}),
    reducerPath: rp || 'httphost',
    tagTypes: ['Task'],
  });
