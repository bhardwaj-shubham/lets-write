import { useSelector } from "react-redux";
import { Card } from "@/components/index";
import { useEffect, useState } from "react";
import postService from "@/appwrite/post";
import { allPosts } from "@/store/postSlice";
import { useDispatch } from "react-redux";

function UserPosts() {
	const [userPosts, setUserPosts] = useState([]);
	const userId = useSelector((state) => state.auth.userData.$id);
	const dispatch = useDispatch();

	useEffect(() => {
		async function getUserPosts() {
			const posts = await postService.getUserPosts(userId);
			if (posts) {
				setUserPosts(posts.documents);
				dispatch(allPosts({ posts: posts.documents }));
				console.log(posts);
			}
		}

		getUserPosts();
	}, [userId, dispatch]);

	return (
		<div className="w-full py-8">
			<div className="flex flex-wrap">
				{userPosts.length !== 0 ? (
					userPosts.map((post) => (
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

export default UserPosts;
