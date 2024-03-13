import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from './usersTypes';
import { Result, State } from './usersTypes';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

const initialState: State = {
  loading: false,
  error: false,
  signIn: false,
  logIn: false,
  authorized: false,
  user: null,
  users: [],
  result: null,
  results: [],
};

export const registration = createAsyncThunk<
  User,
  User,
  { rejectValue: string }
>('store/registration', async (userDb, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`http://localhost:3001/users`, userDb);
    toast.success('Данные добавлены');
    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('Server Error!');
  }
});

export const autorize = createAsyncThunk<
  User,
  { userName: string; password: string },
  { rejectValue: string }
>('store/autorize', async (user, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`http://localhost:3001/users`);
    const filteredData = data.filter(
      (el: { userName: string; password: string }) =>
        el.userName === user.userName && el.password === user.password,
    );

    if (filteredData.length > 0) {
      toast.success('Вход выполнен');
      return filteredData[0];
    } else {
      toast.error('Пользователь не найден');
      return rejectWithValue('Пользователь не найден');
    }
  } catch (error) {
    console.log(error);
    return rejectWithValue('Server Error!');
  }
});

export const sendTestResult = createAsyncThunk<
  Result,
  Result,
  { rejectValue: string }
>('store/sendTestResult', async (result, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(
      `http://localhost:3001/usersResults`,
      result,
    );
    toast.success('Готово');
    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('Server Error!');
  }
});

const usersSlice = createSlice({
  name: 'usersSlice',
  initialState,
  reducers: {
    openLogIn(state) {
      state.logIn = true;
    },
    openSignIn(state) {
      state.signIn = true;
    },
    closeRegistrtionModal(state) {
      state.signIn = false;
      state.logIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registration.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.authorized = true;
        state.logIn = false;

        Cookies.set('userId', action.payload.id);
        Cookies.set('userName', action.payload.userName);
        Cookies.set('userEmail', action.payload.email);
        Cookies.set('userPassword', action.payload.password);
      })
      .addCase(autorize.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(autorize.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.authorized = true;
        state.signIn = false;

        Cookies.set('userId', action.payload.id);
        Cookies.set('userName', action.payload.userName);
        Cookies.set('userEmail', action.payload.email);
        Cookies.set('userPassword', action.payload.password);
      })
      .addCase(sendTestResult.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(sendTestResult.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      });
  },
});

export const { openLogIn, openSignIn, closeRegistrtionModal } =
  usersSlice.actions;

export default usersSlice.reducer;
