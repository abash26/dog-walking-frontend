import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const dogsApi = createApi({
  reducerPath: 'dogsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:7188/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
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
