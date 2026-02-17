import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const walksApi = createApi({
  reducerPath: 'walksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:7188/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Walks'],
  endpoints: (builder) => ({
    getWalks: builder.query({
      query: () => 'walks',
      providesTags: ['Walks'],
    }),
    scheduleWalk: builder.mutation({
      query: (walk) => ({
        url: 'walks',
        method: 'POST',
        body: walk,
      }),
      invalidatesTags: ['Walks'],
    }),
    completeWalk: builder.mutation({
      query: (id) => ({
        url: `walks/${id}/complete`,
        method: 'PUT',
      }),
      invalidatesTags: ['Walks'],
    }),
    cancelWalk: builder.mutation({
      query: (id) => ({
        url: `walks/${id}/cancel`,
        method: 'PUT',
      }),
      invalidatesTags: ['Walks'],
    }),
  }),
});

export const {
  useGetWalksQuery,
  useScheduleWalkMutation,
  useCompleteWalkMutation,
  useCancelWalkMutation,
} = walksApi;
