import { createSlice } from "@reduxjs/toolkit";
import {
  verifyRegister,
  verifyLogin,
  fetchProfile,
  logoutFromAcc,
  login,
  changeAvatarProfile,
  changeAccountName,
} from "../../api/api";

const initialState = {
  user: null,
  loading: false,
  isUpdate: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(verifyRegister.fulfilled, (state, action) => {
        state.user = action.payload;
      })


      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.is2FA ? null : action.payload;
      })
      .addCase(verifyLogin.fulfilled, (state, action) => {
        state.user = action.payload;
      })


      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
      })


      .addCase(changeAvatarProfile.pending, (state) => {
        state.isUpdate = true;
      })
      .addCase(changeAvatarProfile.fulfilled, (state, action) => {
        state.user.avatar = action.payload;
        state.isUpdate = false;
      })
      .addCase(changeAvatarProfile.rejected, (state, action) => {
        state.isUpdate = false;
      })


      .addCase(changeAccountName.fulfilled, (state, action) => {
        state.user.username = action.payload
      })


      .addCase(logoutFromAcc.fulfilled, (state, action) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;