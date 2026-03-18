import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../baseApi';

export const walksApi = createApi({
  reducerPath: 'walksApi',
  baseQuery,
  tagTypes: ['Walks'],
  endpoints: (builder) => ({
    // Owner endpoints
    getWalks: builder.query({
      query: ({ page = 1, pageSize = 10 }) =>
        `walks/owner/mine?page=${page}&pageSize=${pageSize}`,
      providesTags: ['Walks'],
    }),
    scheduleWalk: builder.mutation({
      query: (walk) => ({
        url: 'walks/owner',
        method: 'POST',
        body: walk,
      }),
      invalidatesTags: ['Walks'],
    }),
    cancelWalkByOwner: builder.mutation({
      query: (id) => ({
        url: `walks/owner/${id}/cancel`,
        method: 'PUT',
      }),
      invalidatesTags: ['Walks'],
    }),

    // Walker endpoints
    getAvailableWalks: builder.query({
      query: () => 'walks/walker/available',
      providesTags: ['Walks'],
    }),
    getWalksByWalker: builder.query({
      query: () => 'walks/walker/mine',
      providesTags: ['Walks'],
    }),
    acceptWalk: builder.mutation({
      query: (id) => ({
        url: `walks/walker/${id}/accept`,
        method: 'PUT',
      }),
      invalidatesTags: ['Walks'],
    }),
    startWalk: builder.mutation({
      query: (id) => ({
        url: `walks/walker/${id}/start`,
        method: 'PUT',
      }),
      invalidatesTags: ['Walks'],
    }),
    completeWalk: builder.mutation({
      query: (id) => ({
        url: `walks/walker/${id}/complete`,
        method: 'PUT',
      }),
      invalidatesTags: ['Walks'],
    }),
    cancelWalkByWalker: builder.mutation({
      query: (id) => ({
        url: `walks/walker/${id}/cancel`,
        method: 'PUT',
      }),
      invalidatesTags: ['Walks'],
    }),
  }),
});

export const {
  useGetWalksQuery,
  useScheduleWalkMutation,
  useCancelWalkByOwnerMutation,
  useGetAvailableWalksQuery,
  useGetWalksByWalkerQuery,
  useAcceptWalkMutation,
  useStartWalkMutation,
  useCompleteWalkMutation,
  useCancelWalkByWalkerMutation,
} = walksApi;
