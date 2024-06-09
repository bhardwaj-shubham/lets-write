import config from "@/config/config";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class PostService {
	client = new Client();
	databases;
	bucket;
	databaseId;
	collectionId;
	bucketId;

	constructor() {
		this.client
			.setEndpoint(config.appwriteUrl)
			.setProject(config.appwriteProjectId);
		this.databases = new Databases(this.client);
		this.bucket = new Storage(this.client);
		this.databaseId = config.appwriteDatabaseId;
		this.collectionId = config.appwriteCollectionId;
		this.bucketId = config.appwriteBucketId;
	}

	// create a post
	async createPost({ title, slug, content, featuredImage, status, userId }) {
		try {
			const response = await this.databases.createDocument(
				this.databaseId,
				this.collectionId,
				slug,
				{
					title,
					content,
					featuredImage,
					status,
					userId,
				}
			);

			if (response?.errors) {
				throw new Error(response?.errors[0].message);
			}

			return response;
		} catch (error) {
			throw new Error(error);
		}
	}

	// update post
	async updatePost(slug, { title, content, featuredImage, status }) {
		try {
			const response = await this.databases.updateDocument(
				this.databaseId,
				this.collectionId,
				slug,
				{
					title,
					content,
					featuredImage,
					status,
				}
			);

			if (response?.errors) {
				throw new Error(response?.errors[0].message);
			}

			return response;
		} catch (error) {
			throw new Error(error);
		}
	}

	// delete post
	async deletePost(slug) {
		try {
			const response = await this.databases.deleteDocument(
				this.databaseId,
				this.collectionId,
				slug
			);

			if (response?.errors) {
				throw new Error(response?.errors[0].message);
			}

			return response;
		} catch (error) {
			throw new Error(error);
		}
	}

	// get post
	async getPost(slug) {
		try {
			const response = await this.databases.getDocument(
				this.databaseId,
				this.collectionId,
				slug
			);

			if (response?.errors) {
				throw new Error(response?.errors[0].message);
			}

			return response;
		} catch (error) {
			throw new Error(error);
		}
	}

	// get all posts
	async getPosts(queries = [Query.equal("status", "active")]) {
		try {
			const response = await this.databases.listDocuments(
				this.databaseId,
				this.collectionId,
				queries
			);

			if (response?.errors) {
				throw new Error(response?.errors[0].message);
			}

			return response;
		} catch (error) {
			throw new Error(error);
		}
	}

	// upload the featured image file
	async uploadFile(file) {
		try {
			const response = await this.bucket.createFile(
				this.bucketId,
				ID.unique(),
				file
			);

			if (response?.errors) {
				throw new Error(response?.errors[0].message);
			}

			return response;
		} catch (error) {
			throw new Error(error);
		}
	}

	// delete the uploaded featured image file
	async deleteFeaturedImage(fileId) {
		try {
			const response = await this.bucket.deleteFile(
				this.bucketId,
				fileId
			);

			if (response?.errors) {
				throw new Error(response?.errors[0].message);
			}

			return response;
		} catch (error) {
			throw new Error(error);
		}
	}

	// get featured image file preview
	async getFeaturedImagePreview(fileId) {
		try {
			const response = await this.bucket.getFilePreview(
				this.bucketId,
				fileId
			);

			if (response?.errors) {
				throw new Error(response?.errors[0].message);
			}

			return response;
		} catch (error) {
			throw new Error(error);
		}
	}

	// get user posts
	async getUserPosts(userId) {
		try {
			const response = await this.databases.listDocuments(
				this.databaseId,
				this.collectionId,
				[Query.equal("userId", userId)]
			);

			if (response?.errors) {
				throw new Error(response?.errors[0].message);
			}

			return response;
		} catch (error) {
			throw new Error(error);
		}
	}
}

const postService = new PostService();

export default postService;
