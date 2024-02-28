import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface State {
  loading: boolean;
  error: boolean;
}

const initialState: State = {
  loading: false,
  error: false,
};

const mainSlice = createSlice({
  name: 'slice',
  initialState,
  reducers: {},
});

export default mainSlice.reducer;
