import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../features/auth/authApi';
import { dogsApi } from '../features/dogs/dogsApi';
import { walksApi } from '../features/walks/walksApi';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [dogsApi.reducerPath]: dogsApi.reducer,
    [walksApi.reducerPath]: walksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      dogsApi.middleware,
      walksApi.middleware
    ),
});
