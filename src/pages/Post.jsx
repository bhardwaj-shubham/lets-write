import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import postService from "@/appwrite/post";
import { Button } from "@/components/ui/button";
import { deletePost as postDelete } from "@/store/postSlice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

function Post() {
	const [post, setPost] = useState(null);
	const [featuredImage, setFeaturedImage] = useState(null);
	const [loading, setLoading] = useState(false);

	const { slug } = useParams();
	const navigate = useNavigate();
	const userData = useSelector((state) => state.auth.userData);
	const isAuthor = post && userData ? post.userId === userData.$id : false;
	const dispatch = useDispatch();

	useEffect(() => {
		async function getPost() {
			if (!slug) return navigate("/");

			const post = await postService.getPost(slug);
			if (!post) return navigate("/");
			setPost(post);

			const postImage = await postService.getFeaturedImagePreview(
				post.featuredImage
			);
			// console.log(postImage);
			setFeaturedImage(postImage.href);
		}

		getPost();
	}, [slug, navigate]);

	const deletePost = async () => {
		setLoading(true);

		const status = await postService.deletePost(post.$id);
		if (status) {
			await postService.deleteFeaturedImage(post.featuredImage);
			toast.success("Post deleted successfully.");

			dispatch(postDelete({ postId: post.$id }));
			navigate("/");
		}
		setLoading(false);
	};

	return (
		post && (
			<div className="py-8 px-4 md:px-16 w-full lg:w-[80%] flex flex-wrap text-center items-center mx-auto">
				<div className="w-full flex justify-center mb-4 relative border rounded-lg p-2">
					<img
						src={featuredImage}
						alt={post.title}
						className="rounded-full w-36 object-cover"
					/>

					{isAuthor && (
						<div className="absolute top-40 my-2 lg:right-6 lg:top-6 lg:my-6">
							<Link to={`/edit-post/${post.$id}`}>
								<Button className="mr-3">Edit</Button>
							</Link>
							<Button
								variant="destructive"
								onClick={deletePost}
								disabled={loading}
							>
								{loading ? "Deleting..." : "Delete"}
							</Button>
						</div>
					)}
				</div>

				<div className="w-full mb-6 mt-8">
					<h1 className="text-2xl font-bold">{post.title}</h1>
				</div>

				<div className="browser-css w-full px-2 my-8 leading-relaxed ">
					{parse(post.content)}
				</div>
			</div>
		)
	);
}

export default Post;
