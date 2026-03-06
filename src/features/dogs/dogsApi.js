import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../baseApi';

export const dogsApi = createApi({
  reducerPath: 'dogsApi',
  baseQuery,
  tagTypes: ['Dogs'],
  endpoints: (builder) => ({
    getDogs: builder.query({
      query: () => 'dogs',
      providesTags: ['Dogs'],
    }),

    createDog: builder.mutation({
      query: (dog) => ({
        url: 'dogs',
        method: 'POST',
        body: dog,
      }),
      invalidatesTags: ['Dogs'],
    }),

    updateDog: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `dogs/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Dogs'],
    }),

    deleteDog: builder.mutation({
      query: (id) => ({
        url: `dogs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Dogs'],
    }),
  }),
});

export const {
  useGetDogsQuery,
  useCreateDogMutation,
  useUpdateDogMutation,
  useDeleteDogMutation,
} = dogsApi;
