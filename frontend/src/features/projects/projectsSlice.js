import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Action } from "@remix-run/router";
import projectsService from "./projectsService";

const initialState = {
  projects: [],
  comments: [],
  status: "idle",
  error: null,
};

export const createProject = createAsyncThunk(
  "projects/created",
  async (data, thunkAPI) => {
    try {
      return await projectsService.createProject(data);
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

export const fetchProjects = createAsyncThunk(
  "projects/fetched",
  async (query, thunkAPI) => {
    try {
      return await projectsService.fetchProjects(query);
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

export const updateProject = createAsyncThunk(
  "projects/updated",
  async (data, thunkAPI) => {
    try {
      return await projectsService.updateProject(data);
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

export const deleteProject = createAsyncThunk(
  "projects/removed",
  async (data, thunkAPI) => {
    try {
      return await projectsService.deleteProject(data);
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

export const voteProject = createAsyncThunk(
  "projects/voted",
  async (data, thunkAPI) => {
    try {
      return await projectsService.vote(data);
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

export const addComment = createAsyncThunk(
  "projects/comment/added",
  async (data, thunkAPI) => {
    try {
      return await projectsService.addComment(data);
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

export const fetchComments = createAsyncThunk(
  "projects/comment/fetched",
  async (slug, thunkAPI) => {
    try {
      return await projectsService.fetchProjectComments(slug);
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

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    resetProject: (state) => {
      state.projects = [];
      state.comments = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projects = [...state.projects, action.payload];
      })
      .addCase(createProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        const filtered = state.projects.filter(
          (project) => project.slug !== action.payload.slug
        );
        state.projects = [...filtered];
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        const filtered = state.projects.filter(
          (project) => project !== action.payload
        );
        state.projects = [...filtered];
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(voteProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(voteProject.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(voteProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default projectsSlice.reducer;
export const { resetProject } = projectsSlice.actions;
