import icon from "@/assets/blog-icon.png";

function Footer() {
	return (
		<footer className="px-6 py-12 max-w-7xl mt-16 mx-auto lg:px-8 lg:mt-10">
			<div className="rounded-lg border lg:border-none lg:bg-gray-50 bg-gray-50 flex flex-col lg:flex-row-reverse items-center px-8 py-12 gap-8">
				<a href="#" className="font-light">
					Documentation
				</a>
				<div className="flex gap-8 text-lg">
					<a href="#" className="text-gray-600 hover:text-gray-900">
						<i className="fa-brands fa-twitter"></i>
					</a>
					<a href="#" className="text-gray-600 hover:text-gray-900">
						<i className="fa-brands fa-github"></i>
					</a>
				</div>
				<a href="/" className="flex gap-2 items-center flex-1">
					<img
						src={icon}
						alt="Blog Icon"
						className="object-cover max-w-12 max-h-12"
					/>
					<span className="text-lg font-medium">Lets Write</span>
				</a>
			</div>
			<div className="flex flex-col gap-6 items-center justify-center my-12">
				<div className="flex gap-2 items-center">
					<p className="text-sm text-gray-600">Lets Write</p>
				</div>
				<p className="text-sm text-gray-400">
					© 2024 Lets Write, Inc. All rights reserved.
				</p>
			</div>
		</footer>
	);
}
export default Footer;
