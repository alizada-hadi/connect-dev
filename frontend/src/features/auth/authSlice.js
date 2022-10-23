import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

export const register = createAsyncThunk(
  "auth/registered",
  async (data, thunkAPI) => {
    try {
      return await authService.signup(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.message &&
          error.response.message.data) ||
        error.response ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const activate = createAsyncThunk(
  "auth/user_activated",
  async (data, thunkAPI) => {
    try {
      return await authService.activate(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.message &&
          error.response.message.data) ||
        error.response ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/loggedin",
  async (data, thunkAPI) => {
    try {
      return await authService.signin(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.message &&
          error.response.message.data) ||
        error.response ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const profile = createAsyncThunk(
  "auth/profile/updated/",
  async (data, thunkAPI) => {
    try {
      return await authService.profile(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.message &&
          error.response.message.data) ||
        error.response ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const get_user = createAsyncThunk(
  "auth/get/user",
  async (data, thunkAPI) => {
    try {
      return await authService.get_user(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.message &&
          error.response.message.data) ||
        error.response ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const reset_password = createAsyncThunk(
  "auth/reset_password",
  async (email, thunkAPI) => {
    try {
      return await authService.reset_password(email);
    } catch (error) {
      const message =
        (error.response &&
          error.response.message &&
          error.response.message.data) ||
        error.response ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const change_password = createAsyncThunk(
  "auth/password/changed",
  async (data, thunkAPI) => {
    try {
      return await authService.change_password(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.message &&
          error.response.message.data) ||
        error.response ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  user: "",
  access: "",
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.status = "idle";
      state.user = "";
      state.access = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(activate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(activate.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(activate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(reset_password.pending, (state) => {
        state.status = "loading";
      })
      .addCase(reset_password.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(reset_password.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(change_password.pending, (state) => {
        state.status = "loading";
      })
      .addCase(change_password.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(change_password.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.access = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(profile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.status = "succeeded";
        const programmer = action.payload;
        state.user = { ...state.user, programmer };
      })
      .addCase(profile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(get_user.pending, (state) => {
        state.status = "loading";
      })
      .addCase(get_user.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(get_user.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
export const { reset } = authSlice.actions;
