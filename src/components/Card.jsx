import postService from "@/appwrite/post";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

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
			<div className="w-full bg-gray-300 rounded-xl p-4 h-64 items-center text-center">
				<div className="w-full justify-center mb-4 ">
					{isLoading ? (
						<LoaderCircle size={40} className="animate-spin" />
					) : (
						<img
							src={image}
							alt={title}
							className="rounded-lg w-40 object-cover h-40 mx-auto mt-2"
						/>
					)}
				</div>

				<h2 className="text-lg font-bold">{title}</h2>
			</div>
		</Link>
	);
}

export default Card;
