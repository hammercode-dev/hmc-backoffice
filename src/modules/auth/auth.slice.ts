import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useState } from "react";
import { authApi } from "@/api/auth-api";
import { RootState } from "@/app/store";
import { User } from "./auth.entity";
import { useAppDispatch } from "@/app/hooks";
import { storage } from "@/utils/storage";
import { authStorage } from "@/utils/storage/auth";

export interface AuthState {
  user: User | null;
  error: SerializedError | null;
}

const initialState: AuthState = {
  user: null,
  error: null,
};

// Slice

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    receiveUser: (state, action: PayloadAction<ReceiveUserPayload>) => {
      state.user = action.payload.user;
    },
    setError: (state, action: PayloadAction<Error>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      authAsyncActions.fetchUserByEmail.fulfilled,
      (state, action) => {
        state.user = action.payload;
      },
    );
  },
});

export const authReducer = authSlice.reducer;

// Actions

interface LoginPayload {
  email: string;
  password: string;
}

interface ReceiveUserPayload {
  user: User;
}

const AUTH_ASYNC_ACTIONS = {
  LOGIN: "auth/login",
  FETCH_BY_ID: "auth/fetchById",
} as const;

export const authAsyncActions = {
  fetchUserByEmail: createAsyncThunk(
    AUTH_ASYNC_ACTIONS.FETCH_BY_ID,
    async () => {
      return authApi.getUser();
    },
  ),
} as const;

export const authActions = authSlice.actions;

// Selectors

export const authSelectors = {
  getUser: (state: RootState) => state.auth.user,
  getError: (state: RootState) => state.auth.error,
} as const;

export function useAuthModule() {
  const [isUserInitializing, setUserInitializing] = useState<boolean>(false);
  const [isUserInitialized, setUserInitialized] = useState<boolean>(false);
  const user = useSelector(authSelectors.getUser);
  const error = useSelector(authSelectors.getError);
  const dispatch = useAppDispatch();

  const initialize = () => {
    setUserInitializing(true);
    return authApi
      .getUser()
      .then((user) => {
        dispatch(authActions.receiveUser({ user }));
      })
      .catch((error) => {
        authStorage.evictKey();
        dispatch(authActions.setError(error));
      })
      .finally(() => {
        setUserInitialized(true);
        setUserInitializing(false);
      });
  };

  const login = (payload: LoginPayload) => {
    return authApi.login(payload.email, payload.password)
      .then((result) => {
        setUserInitialized(true);
        setUserInitializing(false);
        storage.auth.storeKey(result.accessToken);

        return result;
      });
  };

  const logout = () => {
    dispatch(authActions.logout());
    storage.auth.evictKey();
  };

  const hasAuthKey = () => {
    return Boolean(storage.auth.getKey());
  };

  const setError = (message: string) => {
    dispatch(authActions.setError(new Error(message)));
  };

  return {
    isInitialized: isUserInitialized,
    isInitializing: isUserInitializing,
    user,
    error,
    initialize,
    login,
    logout,
    setError,
    hasAuthKey,
  };
}
