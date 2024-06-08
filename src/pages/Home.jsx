import { useState, useEffect } from "react";
import postService from "@/appwrite/post";
import { Card } from "@/components/index";
import { useSelector } from "react-redux";

function Home() {
	const [posts, setPosts] = useState([]);
	const userStatus = useSelector((state) => state.auth.isAuthenticating);

	useEffect(() => {
		async function getPosts() {
			const posts = await postService.getPosts();
			if (posts) {
				setPosts(posts.documents);
				// console.log(posts);
			}
		}

		if (userStatus) {
			getPosts();
		}
	}, [userStatus]);

	if (!userStatus) {
		return (
			<div className="w-full py-8 text-center">
				<h1 className="text-2xl font-bold">
					Please login to view posts
				</h1>
			</div>
		);
	}

	return (
		<div className="w-full py-8 text-center">
			<div className="flex mx-12 mt-8">
				{posts.length !== 0 ? (
					posts.map((post) => (
						<div key={post.$id} className="p-2 w-1/4 ">
							<Card {...post} />
						</div>
					))
				) : (
					<div className="w-full py-8 text-center">
						<h1 className="text-2xl font-bold">
							No posts available
						</h1>
					</div>
				)}
			</div>
		</div>
	);
}

export default Home;
