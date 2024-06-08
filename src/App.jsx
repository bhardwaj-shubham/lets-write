import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import authService from "@/appwrite/auth";
import { login, logout } from "@/store/authSlice";
import { Header } from "@/components/index";
import { Footer } from "@/components/index";
import { useSelector } from "react-redux";

function App() {
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();
	const userData = useSelector((state) => state.auth.userData);

	useEffect(() => {
		async function getCurrentUser() {
			await authService
				.getCurrentUser()
				.then((userData) => {
					if (userData) {
						dispatch(login({ userData }));
					} else {
						dispatch(logout());
					}
				})
				.catch((error) => {
					console.error(error);
				})
				.finally(() => setIsLoading(false));
		}

		if (!userData) {
			getCurrentUser();
		}
	}, [userData, dispatch]);

	return (
		<div className="font-primary">
			{!isLoading && (
				<div
					className="min-h-screen flex flex-wrap content-between 
				 bg-background"
				>
					<div className="w-full block">
						<Header />
						<main>
							<Outlet />
						</main>
						<Footer />
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
