import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import programmerService from "./programmerService";

const initialState = {
  programmers: [],
  status: "idle",
  error: null,
};

// ? fetch list of programmers from endpoint

export const fetchProgrammers = createAsyncThunk(
  "programmer/fetched",
  async (query, thunkAPI) => {
    try {
      return await programmerService.fetch_programmers(query);
    } catch (error) {
      const response =
        (error.response &&
          error.response.message &&
          error.response.message.data) ||
        error.response ||
        error.toString();
      return thunkAPI.rejectWithValue(response);
    }
  }
);

// * add new skills
export const addSkill = createAsyncThunk(
  "programmers/skills/added",
  async (data, thunkAPI) => {
    try {
      return await programmerService.addSkill(data);
    } catch (error) {
      const response =
        (error.response &&
          error.response.message &&
          error.response.message.data) ||
        error.response ||
        error.toString();
      return thunkAPI.rejectWithValue(response);
    }
  }
);

// * update skill

export const updateSkill = createAsyncThunk(
  "programmers/skill/updated",
  async (data, thunkAPI) => {
    try {
      return await programmerService.updateSkill(data);
    } catch (error) {
      const response =
        (error.response &&
          error.response.message &&
          error.response.message.data) ||
        error.response ||
        error.toString();
      return thunkAPI.rejectWithValue(response);
    }
  }
);

export const deleteSkill = createAsyncThunk(
  "programmers/skill/deleted",
  async (data, thunkAPI) => {
    try {
      return await programmerService.deleteSkill(data);
    } catch (error) {
      const response =
        (error.response &&
          error.response.message &&
          error.response.message.data) ||
        error.response ||
        error.toString();
      return thunkAPI.rejectWithValue(response);
    }
  }
);

const programmerSlice = createSlice({
  name: "programmers",
  initialState,
  reducers: {
    resetSkill: (state) => {
      state.skill = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProgrammers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProgrammers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.programmers = action.payload;
      })
      .addCase(fetchProgrammers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addSkill.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addSkill.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.skill = action.payload;
      })
      .addCase(addSkill.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateSkill.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateSkill.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(updateSkill.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteSkill.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(deleteSkill.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default programmerSlice.reducer;
export const { resetSkill } = programmerSlice.actions;
