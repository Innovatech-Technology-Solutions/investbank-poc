import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseURL } from '../utils/Commonutils';

export const profileApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${getBaseURL()}` }),
  reducerPath: 'profileApi',
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: `/usermgmt/usermgmtsupport/ProfileInformation`,
        
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetProfileQuery } = profileApi;
