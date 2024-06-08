import { Card } from "@/components/index";
import postService from "@/appwrite/post";
import { useState, useEffect } from "react";

function AllPosts() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		async function getPosts() {
			const posts = await postService.getPosts();
			if (posts) {
				setPosts(posts.documents);
			}
		}

		getPosts();
	}, []);

	return (
		<div className="w-full py-8">
			<div className="flex flex-wrap">
				{posts.length !== 0 ? (
					posts.map((post) => (
						<div key={post.$id} className="p-2 w-1/4">
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

export default AllPosts;
