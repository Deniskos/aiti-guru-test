import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface User {
  username: string;
  accessToken: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const getToken = () => {
  return (
     sessionStorage.getItem("token") || localStorage.getItem("token")
  );
};

const saveToken = (token: string, remember: boolean) => {
  if (remember) {
    localStorage.setItem("token", token);
  } else {
    sessionStorage.setItem("token", token);
  }
};

const removeToken = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
};

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (
    {
      username,
      password,
      remember,
    }: { username: string; password: string; remember: boolean },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 30,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Ошибка авторизации");
      }

      // 🔑 сохраняем токен централизованно
      saveToken(data.accessToken, remember);

      return data;
    } catch (e) {
      return rejectWithValue("Сетевая ошибка");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initAuth(state) {
      const token = getToken();

      if (token) {
        state.user = {
          username: "persisted",
          accessToken: token,
        };
      }
    },

    logout(state) {
      state.user = null;
      removeToken();
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;

        state.user = {
          username: action.payload.username,
          accessToken: action.payload.accessToken,
        };
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { initAuth, logout } = authSlice.actions;
export default authSlice.reducer;
