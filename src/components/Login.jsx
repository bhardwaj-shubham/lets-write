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
import { login as authLogin } from "@/store/authSlice";
import { useDispatch } from "react-redux";

const FormSchema = z.object({
	email: z.string().email({
		message: "Please enter your email address.",
	}),
	password: z.string().min(8, {
		message: "Please enter your password.",
	}),
});

function Login() {
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const dispatch = useDispatch();

	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(data) {
		setIsLoading(true);

		console.log(data);

		try {
			const session = await authService.login(data);

			if (session) {
				const userData = await authService.getCurrentUser();

				if (userData) {
					dispatch(authLogin(userData));
				}

				// TODO: navigate to home page
			}

			console.log(session);
		} catch (error) {
			setIsError(true);
			console.error(error);
		}

		setIsLoading(false);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8 flex flex-col items-center md:w-1/2 p-8 bg-white rounded-lg shadow-lg mx-auto mt-10 w-full"
			>
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

				{isError && (
					<p className="w-3/4 text-red-500 text-sm">
						Invalid email or password. Please try again.
					</p>
				)}

				<Button
					type="submit"
					disabled={isLoading}
					className="w-3/4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					{isLoading ? (
						<>
							<LoaderCircle className="mr-2 h-6 w-6 animate-spin" />
							<span>Loading...</span>
						</>
					) : (
						"Login"
					)}
				</Button>
			</form>

			<p className="mt-2 text-center text-base text-black-60">
				Don&apos;t have any account?&nbsp;{" "}
				<a href="#" className="hover:text-gray-600">
					Sign Up
				</a>
			</p>
		</Form>
	);
}
export default Login;
