import postService from "@/appwrite/post";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Card({ $id, title, featuredImage }) {
	const [image, setImage] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchImage = async () => {
			try {
				const postImage = await postService.getFeaturedImagePreview(
					featuredImage
				);
				setImage(postImage);
			} catch (error) {
				console.error("Error fetching image:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchImage();
	}, [featuredImage]);

	return (
		<Link to={`/post/${$id}`}>
			<div className="w-full bg-gray-100 rounded-xl p-4 h-40 ">
				<div className="w-full justify-center mb-4">
					{isLoading ? (
						<h4>Loading...</h4>
					) : (
						<img src={image} alt={title} className="rounded-lg" />
					)}
				</div>

				<h2 className="text-xl font-bold">{title}</h2>
			</div>
		</Link>
	);
}

export default Card;