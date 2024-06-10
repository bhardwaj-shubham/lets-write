import { useSelector } from "react-redux";
import AllPosts from "./AllPosts";

function Home() {
	const userStatus = useSelector((state) => state.auth.isAuthenticating);

	if (!userStatus) {
		return (
			<div className="w-full py-8 text-center">
				<h1 className="text-2xl font-bold mt-8">
					Please login to view posts
				</h1>
			</div>
		);
	}

	return (
		<div className="w-full py-8 text-center px-8">
			<AllPosts />
		</div>
	);
}

export default Home;
