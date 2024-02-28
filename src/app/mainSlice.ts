import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Article {
  id: number;
  text: string;
}
export interface State {
  article: Article | null;
  articles: Article[];
  loading: boolean;
  error: boolean;
}

const initialState: State = {
  article: null,
  articles: [],
  loading: false,
  error: false,
};

export const getSingleArticle = createAsyncThunk<
  Article,
  number,
  { rejectValue: string }
>('store/getSingleArticle', async (id, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`http://localhost:3001/articles/${id}`);
    return data.results;
  } catch (error) {
    console.log(error);
    return rejectWithValue('Server Error!');
  }
});

export const getAllArticles = createAsyncThunk<
  Article[],
  void,
  { rejectValue: string }
>('store/getAllArticles', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('http://localhost:3001/articles');
    return data.results;
  } catch (error) {
    console.log(error);
    return rejectWithValue('Server Error!');
  }
});

const mainSlice = createSlice({
  name: 'slice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSingleArticle.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getSingleArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.article = action.payload;
      })
      .addCase(getAllArticles.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAllArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      });
  },
});

export default mainSlice.reducer;
