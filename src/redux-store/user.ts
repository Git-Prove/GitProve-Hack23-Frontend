import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch user info
export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async () => {
    const response = await fetch("http://127.0.0.1:3000/api/users/me", {
      credentials: "include",
    });
    const data = await response.json();
    return data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    avatarUrl: "",
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.name = action.payload.name;
        state.avatarUrl = action.payload.avatarUrl;
      })
      .addCase(fetchUserInfo.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default userSlice.reducer;
