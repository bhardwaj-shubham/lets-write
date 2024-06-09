import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import RTE from "@/components/RTE";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import postService from "@/appwrite/post";
import { addPost, updatePost } from "@/store/postSlice";
import { useDispatch } from "react-redux";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

const PostFormSchema = z.object({
	title: z.string().min(2, {
		message: "Title must be at least 2 characters.",
	}),
	slug: z
		.string()
		.min(2, {
			message: "Slug must be at least 2 characters.",
		})
		.max(36, {
			message: "Slug must be at most 36 characters.",
		}),
	content: z.string().min(2, {
		message: "Content must be at least 2 characters.",
	}),
	status: z.string().min(2, {
		message: "Please select a status.",
	}),
	featuredImage: z.any().refine((file) => file?.length === 1, {
		message: "Image is required",
	}),
});

function PostForm({ post }) {
	const form = useForm({
		resolver: zodResolver(PostFormSchema),
		defaultValues: {
			title: post?.title || "",
			slug: post?.$id || "",
			content: post?.content || "",
			status: post?.status || "active",
			featuredImage: post?.featuredImage || "",
		},
	});

	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const userData = useSelector((state) => state.auth.userData);
	const rteRef = useRef(null);
	const dispatch = useDispatch();

	const slugTransform = useCallback((value) => {
		if (!value) return "";
		return value
			.trim()
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/\s/g, "-");
	}, []);

	useEffect(() => {
		const subscription = form.watch((value, { name }) => {
			if (name === "title") {
				form.setValue("slug", slugTransform(value.title), {
					shouldValidate: true,
				});
			}
		});

		return () => subscription.unsubscribe();
	}, [form, slugTransform, form.setValue]);

	const onSubmit = async (data) => {
		// console.log(data);
		setLoading(true);

		if (post) {
			// console.log(post);

			const file = data.featuredImage[0]
				? await postService.uploadFile(data.featuredImage[0])
				: null;

			if (file) {
				await postService.deleteFeaturedImage(post.featuredImage);
			}

			const updatedPost = await postService.updatePost(post.$id, {
				...data,
				featuredImage: file ? file.$id : post.featuredImage,
			});

			if (updatedPost) {
				toast.success("Post updated successfully.");

				dispatch(updatePost({ post: updatedPost }));
				navigate(`/post/${updatedPost.$id}`);
			}
		} else {
			const file = await postService.uploadFile(data.featuredImage[0]);

			if (file) {
				const fileId = file.$id;
				data.featuredImage = fileId;

				const newPost = await postService.createPost({
					...data,
					userId: userData.$id,
				});

				if (newPost) {
					toast.success("Post created successfully.");

					dispatch(addPost({ post: newPost }));
					navigate(`/post/${newPost.$id}`);
				}
			}
		}
		setLoading(false);
	};

	return (
		<Form {...form}>
			<h2 className="text-center font-semibold text-xl ">
				Article Editor
			</h2>

			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8 flex flex-col items-center md:w-1/2 p-8  rounded-lg shadow-lg mx-auto mt-8 w-full bg-gray-200"
			>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input type="text" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="slug"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Slug</FormLabel>
							<FormControl>
								<Input
									type="text"
									{...field}
									onInput={(e) => {
										form.setValue(
											"slug",
											slugTransform(
												e.currentTarget.value
											),
											{ shouldValidate: true }
										);
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="content"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Content</FormLabel>
							<FormControl>
								<RTE
									control={form.control}
									{...field}
									name="content"
									defaultValues={form.getValues("content")}
									ref={rteRef}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="featuredImage"
					render={({ field }) => (
						<>
							<FormItem className="w-full">
								<FormLabel>Featured Image</FormLabel>
								<FormControl className="hover:cursor-pointer">
									<Input
										type="file"
										accept="image/*"
										ref={field.ref}
										id="featuredImage"
										{...form.register("featuredImage")}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						</>
					)}
				/>

				<FormField
					control={form.control}
					name="status"
					render={({ field }) => (
						<FormItem className="w-full" {...field}>
							<FormLabel>Status</FormLabel>
							<FormControl>
								<Select>
									<SelectTrigger>
										<SelectValue placeholder="Select a status" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectItem value="active">
												Active
											</SelectItem>
											<SelectItem value="inactive">
												Inactive
											</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button className="w-20" disabled={loading}>
					{loading ? (
						<LoaderCircle className="mr-2 h-6 w-6 animate-spin" />
					) : (
						"Submit"
					)}
				</Button>
			</form>
		</Form>
	);
}

export default PostForm;
