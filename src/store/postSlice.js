import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	posts: [],
};

const postSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		allPosts: (state, action) => {
			state.posts = action.payload.posts;
		},
		addPost: (state, action) => {
			state.posts.push(action.payload.post);
		},
		updatePost: (state, action) => {
			const { post } = action.payload;
			const index = state.posts.findIndex((p) => p.$id === post.$id);
			state.posts[index] = post;
		},
		deletePost: (state, action) => {
			const { postId } = action.payload;
			state.posts = state.posts.filter((post) => post.$id !== postId);
		},
		logoutPosts: (state) => {
			state.posts = [];
		},
	},
});

export const { allPosts, addPost, updatePost, deletePost, logoutPosts } =
	postSlice.actions;

export default postSlice.reducer;
