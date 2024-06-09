import { useDispatch } from "react-redux";
import authService from "@/appwrite/auth";
import { logout } from "@/store/authSlice";
import { logoutPosts } from "@/store/postSlice";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = async () => {
		setLoading(true);
		await authService
			.logout()
			.then(() => {
				toast.success("Logout successful.");
				dispatch(logout());
				dispatch(logoutPosts());
				navigate("/");
			})
			.finally(() => setLoading(false));
	};

	return (
		<Button
			className="rounded-full font-medium w-24"
			onClick={handleLogout}
			disabled={loading}
		>
			{loading ? (
				<LoaderCircle className="w-6 h-6 animate-spin" />
			) : (
				"Logout"
			)}
		</Button>
	);
}

export default LogoutBtn;
