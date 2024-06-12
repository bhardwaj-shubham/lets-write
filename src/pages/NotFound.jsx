import Scarecrow from "@/assets/Scarecrow.png";

function NotFound() {
	return (
		<div className="flex items-center justify-center h-screen">
			<div className="text-center">
				<img
					src={Scarecrow}
					alt="Scarecrow"
					className="min-w-1/2 w-3/4 md:w-1/2 mx-auto mt-2 md:mt-8"
				/>
				<h1 className="text-4xl font-bold mt-8">404</h1>
				<p className="text-lg">Page not found</p>
			</div>
		</div>
	);
}

export default NotFound;
