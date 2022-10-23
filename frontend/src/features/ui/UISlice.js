import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: false,
  unreadMessageCount: 0,
  connectionStatus: "Uninstantiated",
};

const UISlice = createSlice({
  name: "UI",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.theme = action.payload;
    },
    updateUnreadMessageCount: (state, action) => {
      state.unreadMessageCount += action.payload;
    },
  },
});

export default UISlice.reducer;
export const { changeTheme, updateUnreadMessageCount } = UISlice.actions;
