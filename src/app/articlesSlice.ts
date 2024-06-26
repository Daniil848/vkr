import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebase';
import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
} from 'firebase/firestore';
import { Article, Section, State, Test } from './articlesTypes';

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

    docs.forEach((doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
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

    docs.forEach((doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
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

    docs.forEach((doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
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

    docs.forEach((doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
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

export const getAllTests = createAsyncThunk<
  Test[],
  undefined,
  { rejectValue: string }
>('store/getAllTests', async (_, { rejectWithValue }) => {
  try {
    const docRef = query(collection(db, 'tests'));
    const docs = await getDocs(docRef);
    const data: Test[] = [];

    docs.forEach((doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
      const test: Test = {
        id: doc.id,
        articleId: doc.data().articleId,
        sectionId: doc.data().sectionId,
        title: doc.data().title,
        questions: doc.data().questions,
      };

      data.push(test);
    });

    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('Server Error!');
  }
});

const articlesSlice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    clearArticleState(state) {
      state.article = initialState.article;
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
    resetStateTest(state) {
      state.test = initialState.test;
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
      .addCase(getAllTests.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAllTests.fulfilled, (state, action) => {
        state.loading = false;
        state.tests = action.payload;
      });
  },
});

export const {
  clearArticleState,
  setSearchArticles,
  clearSearchArticles,
  setTestError,
  resetStateTest,
} = articlesSlice.actions;

export default articlesSlice.reducer;
