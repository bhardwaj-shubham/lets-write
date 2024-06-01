import icon from "@/assets/blog-icon.png";
import { useState } from "react";

function Header() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	function handleToggle() {
		// console.log("clicked");
		setIsDialogOpen(!isDialogOpen);
	}

	return (
		<nav className="p-3 flex bg-white justify-between items-center">
			<a href="/" className="flex gap-2 items-center flex-1">
				<img
					src={icon}
					alt="Blog Icon"
					className="object-cover max-w-12 max-h-12"
				/>
				<span className="text-lg font-medium">Lets Write</span>
			</a>

			<div className="hidden lg:flex gap-12">
				<a href="/" className="font-medium ">
					Home
				</a>
				<a href="/" className="font-medium">
					About
				</a>
				<a href="/" className="font-medium">
					Contact
				</a>
				<a href="/" className="font-medium">
					Login
				</a>
			</div>

			<button className="p-2 lg:hidden" onClick={handleToggle}>
				<i className="fa-solid fa-bars text-gray-600"></i>
			</button>

			<div
				id="nav-dialog"
				className={`fixed z-10 md:hidden bg-white inset-0 p-3 ${
					isDialogOpen ? "" : "hidden"
				}`}
			>
				<div className="flex justify-between">
					<a href="/" className="flex gap-2 items-center">
						<img
							src={icon}
							alt="Blog Icon"
							className="object-cover max-w-12 max-h-12"
						/>
						<span className="text-lg font-medium">Let's Write</span>
					</a>
					<button className="p-2 md:hidden" onClick={handleToggle}>
						<i className="fa-solid fa-xmark text-gray-600"></i>
					</button>
				</div>
				<div className="mt-6">
					<a
						href="/"
						className="font-medium m-3 p-3 hover:bg-gray-50 block rounded-lg"
					>
						Home
					</a>
					<a
						href="/"
						className="font-medium m-3 p-3 hover:bg-gray-50 block rounded-lg"
					>
						About
					</a>
					<a
						href="/"
						className="font-medium m-3 p-3 hover:bg-gray-50 block rounded-lg"
					>
						Contact
					</a>
					<a
						href="/"
						className="font-medium m-3 p-3 hover:bg-gray-50 block rounded-lg"
					>
						Login
					</a>
				</div>
			</div>
		</nav>
	);
}
export default Header;
