import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import articlesSlice from './articlesSlice';
import usersSlice from './usersSlice';

export const store = configureStore({
  reducer: {
    articlesSlice: articlesSlice,
    usersSlice: usersSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
