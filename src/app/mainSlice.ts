import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Section {
  id: number;
  name: string;
}
export interface Article {
  map(
    arg0: (article: Article) => import('react/jsx-runtime').JSX.Element,
  ): import('react').ReactNode;
  id: number;
  sectionId: number;
  title: string;
  text: string;
}
export interface Test {
  id: number;
  articleId: number;
  sectionId: number;
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
  sections: Section[];
  article: Article | null;
  articles: Article[];
  test: Test | null;
  tests: Test[];
  loading: boolean;
  error: boolean;
  articlesPage: boolean;
  searchArticles: boolean;
}

const initialState: State = {
  sections: [],
  article: null,
  articles: [],
  test: null,
  tests: [],
  loading: false,
  error: false,
  articlesPage: false,
  searchArticles: false,
};

export const getAllArticles = createAsyncThunk<
  Article[],
  undefined,
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

export const getTestByArticleId = createAsyncThunk<
  Test,
  number,
  { rejectValue: string }
>('store/getTestByArticleId', async (articleId, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`http://localhost:3001/tests`);

    const filteredData = data.find((el: Test) => el.articleId === articleId);

    return filteredData;
  } catch (error) {
    console.log(error);
    return rejectWithValue('Server Error!');
  }
});

export const getAllSections = createAsyncThunk<
  Section[],
  undefined,
  { rejectValue: string }
>('store/getAllSections', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`http://localhost:3001/sections`);

    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('Server Error!');
  }
});

export const searchArticles = createAsyncThunk<
  Article[],
  string,
  { rejectValue: string }
>('store/searchArticles', async (search, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`http://localhost:3001/articles`);

    const filteredData = data.filter((article: Article) => {
      return article.title.toLowerCase().includes(search.toLowerCase());
    });

    return filteredData;
  } catch (error) {
    console.log(error);
    return rejectWithValue('Server Error!');
  }
});

const mainSlice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    clearArticleState(state) {
      state.article = null;
    },
    setSearchArticles(state) {
      state.searchArticles = true;
    },
    clearSearchArticles(state) {
      state.searchArticles = false;
    },
  },
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
      .addCase(getTestByArticleId.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getTestByArticleId.fulfilled, (state, action) => {
        state.loading = false;
        state.test = action.payload;
      })
      .addCase(getAllSections.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAllSections.fulfilled, (state, action) => {
        state.loading = false;
        state.sections = action.payload;
      })
      .addCase(searchArticles.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(searchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      });
  },
});

export const { clearArticleState, setSearchArticles, clearSearchArticles } =
  mainSlice.actions;

export default mainSlice.reducer;
