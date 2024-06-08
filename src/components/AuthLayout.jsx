import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

function AuthLayout({ children, authentication = true }) {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const authStatus = useSelector((state) => state.auth.isAuthenticating);

	useEffect(() => {
		if (authentication && !authStatus) {
			navigate("/login");
		} else if (!authentication && authStatus) {
			navigate("/");
		}

		setIsLoading(false);
	}, [authStatus, navigate, authentication]);

	return isLoading ? <LoaderCircle size={15} /> : <>{children}</>;
}
export default AuthLayout;
