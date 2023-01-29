import { createSlice } from "@reduxjs/toolkit";

const initialState = { currentUser: {} };

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateUser(state, action) {
      delete action.payload.token;
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    clearUser(state) {
      return {
        ...state,
        currentUser: {},
      };
    },
  },
});

export const { updateUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
