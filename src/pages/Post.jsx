import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import postService from "@/appwrite/post";
import { Button } from "@/components/ui/button";

function Post() {
	const [post, setPost] = useState(null);
	const [featuredImage, setFeaturedImage] = useState(null);

	const { slug } = useParams();
	const navigate = useNavigate();

	const userData = useSelector((state) => state.auth.userData);

	const isAuthor = post && userData ? post.userId === userData.$id : false;

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
		const status = await postService.deletePost(post.$id);
		if (status) {
			await postService.deleteFeaturedImage(post.featuredImage);
			navigate("/");
		}
	};

	return (
		post && (
			<div className="py-8 px-4 md:px-16 w-full lg:w-[80%] flex flex-wrap text-center items-center mx-auto">
				<div className="w-full flex justify-center mb-4 relative border rounded-lg p-2">
					<img
						src={featuredImage}
						alt={post.title}
						className="rounded-full"
					/>

					{isAuthor && (
						<div className="absolute right-6 top-6 my-6">
							<Link to={`/edit-post/${post.$id}`}>
								<Button className="mr-3">Edit</Button>
							</Link>
							<Button variant="destructive" onClick={deletePost}>
								Delete
							</Button>
						</div>
					)}
				</div>

				<div className="w-full mb-6 mt-8">
					<h1 className="text-2xl font-bold">{post.title}</h1>
				</div>

				<div className="browser-css">{parse(post.content)}</div>
			</div>
		)
	);
}

export default Post;
