import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import authService from "@/appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "@/store/authSlice";

const FormSchema = z.object({
	name: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
	password: z.string().min(8, {
		message: "Password must be at least 8 characters.",
	}),
});

function Signup() {
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();

	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	async function onSubmit(data) {
		setIsLoading(true);

		console.log(data);

		try {
			const response = await authService.createAccount({ ...data });

			if (response) {
				const userData = await authService.getCurrentUser();
				if (userData) {
					dispatch(login(userData));
				}
				// TODO: navigate to home page
			}

			console.log(response);
		} catch (error) {
			console.error(error);
		}

		setIsLoading(false);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8 flex flex-col items-center md:w-1/2 p-8 bg-white rounded-lg shadow-lg mx-auto mt-8 w-full"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem className="w-3/4">
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input type="text" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem className="w-3/4">
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input type="email" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem className="w-3/4">
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input type="password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" disabled={isLoading} className="w-20">
					{isLoading ? (
						<>
							<LoaderCircle className="mr-2 h-6 w-6 animate-spin" />
						</>
					) : (
						"Sign Up"
					)}
				</Button>
			</form>

			<p className="mt-2 text-center text-base text-black/60">
				Already have an account?&nbsp;
				<a href="#" className="text-gray-800 font-medium">
					SignIn
				</a>
			</p>
		</Form>
	);
}
export default Signup;
