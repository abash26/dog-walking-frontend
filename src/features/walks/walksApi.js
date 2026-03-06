import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../baseApi';

export const walksApi = createApi({
  reducerPath: 'walksApi',
  baseQuery,
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
    getAvailableWalks: builder.query({
      query: () => 'walks/walker/available',
      providesTags: ['Walks'],
    }),
    acceptWalk: builder.mutation({
      query: (id) => ({
        url: `walks/walker/${id}/accept`,
        method: 'PUT',
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
  useGetAvailableWalksQuery,
  useAcceptWalkMutation,
  useCompleteWalkMutation,
  useCancelWalkMutation,
} = walksApi;
