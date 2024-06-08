import { PostForm } from "@/components/index";
import postService from "@/appwrite/post";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function EditPost() {
	const [post, setPost] = useState(null);
	const { slug } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		async function getPost() {
			if (slug) {
				const post = await postService.getPost(slug);
				if (post) {
					setPost(post);
				}
			} else {
				navigate("/");
			}
		}

		getPost();
	}, [slug, navigate]);

	return (
		post && (
			<>
				<PostForm post={post} />
			</>
		)
	);
}

export default EditPost;
