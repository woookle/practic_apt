import { createSlice } from "@reduxjs/toolkit";
import {
  verifyRegister,
  verifyLogin,
  fetchProfile,
  logoutFromAcc,
  login,
  changeAvatarProfile,
  changeAccountName,
  on2FA,
  off2FA,
} from "../../api/api";

const initialState = {
  user: null,
  loading: false,
  isUpdate: false,
  is2faUpdating: false,
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

      .addCase(on2FA.pending, (state) => {
        state.is2faUpdating = true;
      })
      .addCase(on2FA.fulfilled, (state, action) => {
        state.is2faUpdating = false;
        state.user.is2FAEnabled = true;
      })
      .addCase(on2FA.rejected, (state, action) => {
        state.is2faUpdating = false;
      })

      .addCase(off2FA.pending, (state) => {
        state.is2faUpdating = true;
      })
      .addCase(off2FA.fulfilled, (state, action) => {
        state.is2faUpdating = false;
        state.user.is2FAEnabled = false;
      })
      .addCase(off2FA.rejected, (state, action) => {
        state.is2faUpdating = false;
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