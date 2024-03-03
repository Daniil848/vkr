import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Article {
  id: number;
  title: string;
  text: string;
}
export interface Test {
  id: number;
  articleId: number;
  title: string;
  questions: {
    id: number;
    question: string;
    correctAnswer: number;
    answers: {
      id: number;
      answer: string;
    }[];
  }[];
}
export interface State {
  article: Article | null;
  articles: Article[];
  test: Test | null;
  loading: boolean;
  error: boolean;
}

const initialState: State = {
  article: null,
  articles: [],
  test: null,
  loading: false,
  error: false,
};

export const getAllArticles = createAsyncThunk<
  Article[],
  void,
  { rejectValue: string }
>('store/getAllArticles', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('http://localhost:3001/articles');
    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('Server Error!');
  }
});

export const getSingleArticle = createAsyncThunk<
  Article,
  number,
  { rejectValue: string }
>('store/getSingleArticle', async (id, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`http://localhost:3001/articles/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('Server Error!');
  }
});

export const getTest = createAsyncThunk<Test, number, { rejectValue: string }>(
  'store/getTest',
  async (articleId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/tests`);

      const filteredData = data.find((el: Test) => el.articleId === articleId);

      return filteredData;
    } catch (error) {
      console.log(error);
      return rejectWithValue('Server Error!');
    }
  },
);

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
      })
      .addCase(getTest.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getTest.fulfilled, (state, action) => {
        state.loading = false;
        state.test = action.payload;
      });
  },
});

export default mainSlice.reducer;
