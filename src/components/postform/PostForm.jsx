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
import { useCallback, useEffect } from "react";
import appwriteService from "@/appwrite/post";
import { useSelector } from "react-redux";
// import { useState } from "react";

const PostFormSchema = z.object({
	title: z.string().min(2, {
		message: "Title must be at least 2 characters.",
	}),
	slug: z.string().min(2, {
		message: "Slug must be at least 2 characters.",
	}),
	content: z.string().min(2, {
		message: "Content must be at least 2 characters.",
	}),
	status: z.string().min(2, {
		message: "Please select a status.",
	}),
	featuredImage: z.any(),
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

	// const [preview, setPreview] = useState(null);
	const userData = useSelector((state) => state.auth.userData);

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
		console.log(data);

		const file = data.featuredImage[0]
			? await appwriteService.uploadFile(data.featuredImage[0])
			: null;

		if (post.$id) {
			if (file) {
				appwriteService.deleteFile(post.featuredImage);
			}

			const newPost = await appwriteService.updatePost(post.$id, {
				title: data.title,
				slug: data.slug,
				content: data.content,
				featuredImage: file ? file.$id : "",
				status: data.status,
				userId: userData.$id,
			});

			if (newPost) {
				console.log("Post updated successfully.", newPost);
			} else {
				console.error("Failed to update post.");
			}
		} else {
			const file = await appwriteService.uploadFile(
				data.featuredImage[0]
			);

			if (file) {
				const newPost = await appwriteService.createPost({
					title: data.title,
					slug: data.slug,
					content: data.content,
					featuredImage: file.$id,
					status: data.status,
					userId: userData.$id,
				});

				if (newPost) {
					console.log("Post created successfully.", newPost);
				} else {
					console.error("Failed to create post.");
				}
			}
		}
	};

	return (
		<Form {...form}>
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
									label="Content :"
									name="content"
									defaultValues={form.getValues("content")}
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

				<Button>Submit</Button>
			</form>
		</Form>
	);
}

export default PostForm;
