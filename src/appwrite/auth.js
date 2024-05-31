import config from "@/config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
	client = new Client();
	account;

	constructor() {
		this.client
			.setEndpoint(config.appwriteUrl)
			.setProject(config.appwriteProjectId);
		this.account = new Account(this.client);
	}

	// create new user account
	async createAccount({ email, password, name }) {
		try {
			const newUserAccount = await this.account.create(
				ID.unique(),
				email,
				password,
				name
			);

			if (newUserAccount?.errors) {
				throw new Error(newUserAccount?.errors[0].message);
			}

			return newUserAccount;
		} catch (error) {
			throw new Error(error);
		}
	}

	// user login
	async login({ email, password }) {
		try {
			const response = await this.account.createEmailPasswordSession(
				email,
				password
			);

			if (response?.errors) {
				throw new Error(response?.errors[0].message);
			}

			return response;
		} catch (error) {
			throw new Error(error);
		}
	}

	// get current login user
	async getCurrentUser() {
		try {
			const response = await this.account.get();

			if (response?.errors) {
				throw new Error(response?.errors[0].message);
			}

			return response;
		} catch (error) {
			throw new Error(error);
		}
	}

	// logout user
	async logout() {
		try {
			const response = await this.account.deleteSessions();

			if (response?.errors) {
				throw new Error(response?.errors[0].message);
			}

			return response;
		} catch (error) {
			throw new Error(error);
		}
	}
}

const authService = new AuthService();

export default authService;
