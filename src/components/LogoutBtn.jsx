import { useDispatch } from "react-redux";
import authService from "@/appwrite/auth";
import { logout } from "@/store/authSlice";
import { Button } from "./ui/button";

function LogoutBtn() {
	const dispatch = useDispatch();

	const handleLogout = async () => {
		await authService.logout().then(() => dispatch(logout()));
	};

	return (
		<Button className="rounded-full font-medium" onClick={handleLogout}>
			Logout
		</Button>
	);
}

export default LogoutBtn;
