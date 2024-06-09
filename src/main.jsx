import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AuthLayout from "./components/AuthLayout.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import AddPost from "./pages/AddPost.jsx";
import EditPost from "./pages/EditPost.jsx";
import Post from "./pages/Post.jsx";
import UserPosts from "./pages/UserPosts.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/login",
				element: (
					<AuthLayout authentication={false}>
						<Login />
					</AuthLayout>
				),
			},
			{
				path: "/signup",
				element: (
					<AuthLayout authentication={false}>
						<Signup />
					</AuthLayout>
				),
			},
			{
				path: "/my-posts",
				element: (
					<AuthLayout authentication>
						<UserPosts />
					</AuthLayout>
				),
			},
			{
				path: "/add-post",
				element: (
					<AuthLayout authentication>
						<AddPost />
					</AuthLayout>
				),
			},
			{
				path: "/edit-post/:slug",
				element: (
					<AuthLayout authentication>
						<EditPost />
					</AuthLayout>
				),
			},
			{
				path: "/post/:slug",
				element: <Post />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
