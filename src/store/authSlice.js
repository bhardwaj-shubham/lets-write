import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isAuthenticating: false,
	userData: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, action) => {
			state.isAuthenticating = true;
			state.userData = action.payload.userData;
		},
		logout: (state) => {
			state.isAuthenticating = false;
			state.userData = null;
		},
	},
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
