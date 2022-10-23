import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import participantsService from "./participantsService";

const initialState = {
  participants: [],
  status: "idle",
  error: null,
};

export const fetchParticipants = createAsyncThunk(
  "participants/fetched",
  async (token, thunkAPI) => {
    try {
      return await participantsService.fetchParticipants(token);
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

const participantsSlice = createSlice({
  name: "participants",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchParticipants.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchParticipants.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.participants = action.payload;
      })
      .addCase(fetchParticipants.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default participantsSlice.reducer;
