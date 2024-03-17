import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Result, State, User } from './usersTypes';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

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
  adminPageError: false,
};

export const registration = createAsyncThunk<
  void,
  User,
  { rejectValue: string }
>('store/registration', async (user: User, { rejectWithValue }) => {
  try {
    const data = await setDoc(doc(db, 'users', user.id), user);
    Cookies.set('userId', user.id);
    toast.success('Данные добавлены');
    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('Server Error!');
  }
});

export const autorize = createAsyncThunk<
  User | undefined,
  { userName: string; password: string },
  { rejectValue: string }
>('store/autorize', async (user, { rejectWithValue }) => {
  try {
    const docRefUser = query(
      collection(db, 'users'),
      where('userName', '==', user.userName),
      where('password', '==', user.password),
      limit(1),
    );
    const docsUsers = await getDocs(docRefUser);

    if (!docsUsers.empty) {
      const doc = docsUsers.docs[0];
      const userData = {
        id: doc.id,
        email: doc.data().email,
        userName: doc.data().userName,
        password: doc.data().password,
        admin: doc.data().admin,
      };

      toast.success('Вход выполнен!');

      return userData;
    } else {
      toast.error('Пользователь не найден!');
      return;
    }
  } catch (error) {
    console.log(error);
    return rejectWithValue('Server Error!');
  }
});

export const getSingleUser = createAsyncThunk<
  User | undefined,
  string,
  { rejectValue: string }
>('store/getSingleUser', async (id, { rejectWithValue }) => {
  try {
    const docRef = doc(db, 'users', id);
    const docUser = await getDoc(docRef);

    if (docUser.exists()) {
      const userData = docUser.data();
      const user: User = {
        id: docUser.id,
        email: userData.email,
        userName: userData.userName,
        password: userData.password,
        admin: userData.admin,
      };
      return user;
    } else {
      return rejectWithValue('User not found');
    }
  } catch (error) {
    console.log(error);
    return rejectWithValue('Server Error!');
  }
});

export const getAllUsers = createAsyncThunk<
  User[],
  undefined,
  { rejectValue: string }
>('store/getAllUsers', async (_, { rejectWithValue }) => {
  try {
    const docRefUsers = query(collection(db, 'users'));
    const docsUsers = await getDocs(docRefUsers);
    const data: User[] = [];

    docsUsers.forEach((doc) => {
      const userData = doc.data();
      const user: User = {
        id: doc.id,
        email: userData.email,
        userName: userData.userName,
        password: userData.password,
        admin: userData.admin,
      };

      data.push(user);
    });

    return data ?? rejectWithValue('Result not found');
  } catch (error) {
    console.log(error);
    return rejectWithValue('Server Error!');
  }
});

export const sendTestResult = createAsyncThunk<
  undefined,
  Result,
  { rejectValue: string }
>('store/sendTestResult', async (result, { rejectWithValue }) => {
  try {
    await addDoc(collection(db, 'results'), result);
    toast.success('Готово');
  } catch (error) {
    console.log(error);
    return rejectWithValue('Server Error!');
  }
});

export const getTestResult = createAsyncThunk<
  Result,
  { testId: string | undefined; userId: string | undefined },
  { rejectValue: string }
>('store/getTestResult', async (properties, { rejectWithValue }) => {
  try {
    const docRefResults = query(
      collection(db, 'results'),
      where('testId', '==', properties.testId),
      where('userId', '==', properties.userId),
      limit(1),
    );
    const docsResults = await getDocs(docRefResults);

    if (!docsResults.empty) {
      const doc = docsResults.docs[0];
      const resultData = {
        id: doc.id,
        userId: doc.data().userId,
        testId: doc.data().testId,
        sectionId: doc.data().sectionId,
        grade: doc.data().grade,
        answersCount: doc.data().answersCount,
        percentCorrectAnswers: doc.data().percentCorrectAnswers,
      };

      return resultData;
    } else {
      return rejectWithValue('Result not found');
    }
  } catch (error) {
    console.log(error);
    return rejectWithValue('Server Error!');
  }
});

export const getUserResults = createAsyncThunk<
  Result[],
  string,
  { rejectValue: string }
>('store/getUserResults', async (userId, { rejectWithValue }) => {
  try {
    const docRefResults = query(collection(db, 'results'));
    const docsResults = await getDocs(docRefResults);
    const data: Result[] = [];

    docsResults.forEach((doc) => {
      const resultData = doc.data();
      const result: Result = {
        id: doc.id,
        userId: resultData.userId,
        testId: resultData.testId,
        sectionId: resultData.sectionId,
        grade: resultData.grade,
        answersCount: resultData.answersCount,
        percentCorrectAnswers: resultData.percentCorrectAnswers,
      };

      data.push(result);
    });

    const filteredData = data.filter((el) => el.userId === userId);

    return filteredData ?? rejectWithValue('Result not found');
  } catch (error) {
    console.log(error);
    return rejectWithValue('Server Error!');
  }
});

export const getAllResults = createAsyncThunk<
  Result[],
  undefined,
  { rejectValue: string }
>('store/getAllResults', async (_, { rejectWithValue }) => {
  try {
    const docRefResults = query(collection(db, 'results'));
    const docsResults = await getDocs(docRefResults);
    const data: Result[] = [];

    docsResults.forEach((doc) => {
      const resultData = doc.data();
      const result: Result = {
        id: doc.id,
        userId: resultData.userId,
        testId: resultData.testId,
        sectionId: resultData.sectionId,
        grade: resultData.grade,
        answersCount: resultData.answersCount,
        percentCorrectAnswers: resultData.percentCorrectAnswers,
      };

      data.push(result);
    });

    return data ?? rejectWithValue('Result not found');
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
    logOut(state) {
      state.user = null;
      Cookies.remove('userId');
    },
    closeRegistrationModal(state) {
      state.signIn = false;
      state.logIn = false;
    },
    resetStateTestResult(state) {
      state.result = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registration.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(registration.fulfilled, (state) => {
        state.loading = false;
        state.authorized = true;
        state.logIn = false;
      })
      .addCase(autorize.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(autorize.fulfilled, (state, action) => {
        state.loading = false;
        action.payload ? (state.user = action.payload) : null;
        state.authorized = true;
        state.signIn = false;

        Cookies.set('userId', action.payload ? action.payload.id : '');
      })
      .addCase(getSingleUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.loading = false;
        action.payload ? (state.user = action.payload) : null;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(sendTestResult.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(sendTestResult.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getTestResult.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getTestResult.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(getUserResults.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getUserResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(getAllResults.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAllResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      });
  },
});

export const {
  openLogIn,
  openSignIn,
  logOut,
  closeRegistrationModal,
  resetStateTestResult,
} = usersSlice.actions;

export default usersSlice.reducer;
