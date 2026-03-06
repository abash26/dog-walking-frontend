import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../baseApi';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  tagTypes: ['Dogs'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        url: 'auth/register',
        method: 'POST',
        body,
      }),
    }),
    getMe: builder.query({
      query: () => 'auth/me',
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
} = authApi;
