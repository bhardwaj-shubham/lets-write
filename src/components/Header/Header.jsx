import icon from "@/assets/blog-icon.png";
import { useState } from "react";
import { LogoutBtn } from "@/components/index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
	const authStatus = useSelector((state) => state.auth.isAuthenticating);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	function handleToggle() {
		// console.log("clicked");
		setIsDialogOpen(!isDialogOpen);
	}

	return (
		<nav className="p-3 flex bg-white justify-between items-center">
			<Link to="/" className="flex gap-2 items-center flex-1">
				<img
					src={icon}
					alt="Blog Icon"
					className="object-cover max-w-12 max-h-12"
				/>
				<span className="text-lg font-medium">Lets Write</span>
			</Link>

			<div className="hidden lg:flex gap-12">
				<Link to="/" className="font-medium mt-2">
					Home
				</Link>

				{authStatus && (
					<Link to="/all-posts" className="font-medium mt-2">
						All Posts
					</Link>
				)}

				{authStatus && (
					<Link to="/add-post" className="font-medium mt-2">
						Add Post
					</Link>
				)}

				{!authStatus && (
					<Link to="/login" className="font-medium mt-2">
						Login
					</Link>
				)}

				{!authStatus && (
					<Link to="/signup" className="font-medium mt-2">
						Signup
					</Link>
				)}

				{authStatus && <LogoutBtn />}
			</div>

			<button className="p-2 lg:hidden" onClick={handleToggle}>
				<i className="fa-solid fa-bars text-gray-600"></i>
			</button>

			<div
				id="nav-dialog"
				className={`fixed z-10 lg:hidden bg-white inset-0 p-3 ${
					isDialogOpen ? "" : "hidden"
				}`}
			>
				<div className="flex justify-between">
					<Link
						to="/"
						className="flex gap-2 items-center"
						onClick={handleToggle}
					>
						<img
							src={icon}
							alt="Blog Icon"
							className="object-cover max-w-12 max-h-12"
						/>
						<span className="text-lg font-medium">Lets Write</span>
					</Link>

					<button className="p-2 lg:hidden" onClick={handleToggle}>
						<i className="fa-solid fa-xmark text-gray-600"></i>
					</button>
				</div>

				<div className="mt-6">
					<Link
						to="/"
						className="font-medium m-3 p-3 hover:bg-gray-50 block rounded-lg"
						onClick={handleToggle}
					>
						Home
					</Link>

					{authStatus && (
						<Link
							to="/all-posts"
							className="font-medium m-3 p-3 hover:bg-gray-50 block rounded-lg"
							onClick={handleToggle}
						>
							All Posts
						</Link>
					)}

					{authStatus && (
						<Link
							to="/add-post"
							className="font-medium m-3 p-3 hover:bg-gray-50 block rounded-lg"
							onClick={handleToggle}
						>
							Add Post
						</Link>
					)}

					{!authStatus && (
						<Link
							to="/login"
							className="font-medium m-3 p-3 hover:bg-gray-50 block rounded-lg "
							onClick={handleToggle}
						>
							Login
						</Link>
					)}

					{!authStatus && (
						<Link
							to="/signup"
							className="font-medium m-3 p-3 hover:bg-gray-50 block rounded-lg "
							onClick={handleToggle}
						>
							Signup
						</Link>
					)}

					{authStatus && (
						<div className="px-4" onClick={handleToggle}>
							<LogoutBtn />
						</div>
					)}
				</div>
			</div>
		</nav>
	);
}
export default Header;
