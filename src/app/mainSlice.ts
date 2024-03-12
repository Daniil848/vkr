import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebase';
import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import { Article, Section, State, Test, User } from './types';
import axios from 'axios';

const initialState: State = {
  sections: [],
  article: null,
  articles: [],
  test: null,
  tests: [],
  testError: false,
  loading: false,
  error: false,
  searchArticles: false,
  signIn: false,
  logIn: false,
  authorized: false,
  user: null,
  users: [],
};

export const getAllArticles = createAsyncThunk<
  Article[],
  undefined,
  { rejectValue: string }
>('store/getAllArticles', async (_, { rejectWithValue }) => {
  try {
    const docRef = query(collection(db, 'articles'));

    const docs = await getDocs(docRef);
    const data: Article[] = [];

    docs.forEach((doc: any) => {
      const article: Article = {
        id: doc.id,
        sectionId: doc.data().sectionId,
        title: doc.data().title,
        text: doc.data().text,
      };

      data.push(article);
    });

    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('Server Error!');
  }
});

export const getSingleArticle = createAsyncThunk<
  Article,
  string,
  { rejectValue: string }
>('store/getSingleArticle', async (id, { rejectWithValue }) => {
  try {
    const docRef = doc(db, 'articles', id);
    const docArticle = await getDoc(docRef);

    if (docArticle.exists()) {
      const data: Article = {
        id: docArticle.id,
        sectionId: docArticle.data().sectionId,
        title: docArticle.data().title,
        text: docArticle.data().text,
      };

      return data;
    } else {
      return rejectWithValue('Article not found!');
    }
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
    const docRef = query(collection(db, 'articles'));
    const docs = await getDocs(docRef);
    const data: Article[] = [];

    docs.forEach((doc: any) => {
      const article: Article = {
        id: doc.id,
        sectionId: doc.data().sectionId,
        title: doc.data().title,
        text: doc.data().text,
      };

      data.push(article);
    });

    const filteredData = data.filter((article: Article) => {
      return article.title.toLowerCase().includes(search.toLowerCase());
    });

    return filteredData;
  } catch (error) {
    console.log(error);
    return rejectWithValue('Server Error!');
  }
});

export const getTestByArticleId = createAsyncThunk<
  Test,
  string,
  { rejectValue: string }
>('store/getTestByArticleId', async (articleId, { rejectWithValue }) => {
  try {
    const docRef = query(collection(db, 'tests'));
    const docs = await getDocs(docRef);
    const data: Test[] = [];

    docs.forEach((doc: any) => {
      const test: Test = {
        id: doc.id,
        articleId: doc.data().articleId,
        sectionId: doc.data().sectionId,
        title: doc.data().title,
        questions: doc.data().questions,
      };

      data.push(test);
    });

    const filteredData = data.find(
      (el: Test) => el.articleId.toString() === articleId,
    );

    if (!filteredData) {
      return rejectWithValue('Test not found');
    }

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
    const docRef = query(collection(db, 'sections'));
    const docs = await getDocs(docRef);
    const data: Section[] = [];

    docs.forEach((doc: any) => {
      const section: Section = {
        id: doc.id,
        name: doc.data().name,
      };

      data.push(section);
    });

    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('Server Error!');
  }
});

export const registration = createAsyncThunk<
  User,
  User,
  { rejectValue: string }
>('store/registration', async (userDb, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`http://localhost:3001/users`, userDb);

    return data;
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
    setTestError(state, action) {
      state.testError = action.payload;
    },
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
      })
      .addCase(registration.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      });
  },
});

export const {
  clearArticleState,
  setSearchArticles,
  clearSearchArticles,
  setTestError,
  openLogIn,
  openSignIn,
  closeRegistrtionModal,
} = mainSlice.actions;

export default mainSlice.reducer;
