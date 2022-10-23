import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import skillsService from "./skillsService";

const initialState = {
  skills: [],
  status: "idle",
  error: null,
};

export const fetchSkills = createAsyncThunk(
  "skills/fetched",
  async (thunkAPI) => {
    try {
      return await skillsService.getSkills();
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

const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.skills = action.payload;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default skillsSlice.reducer;
