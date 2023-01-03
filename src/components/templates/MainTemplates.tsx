import { ReactNode } from "react";

interface MainTemplatesInterface {
	children: ReactNode;
}

const MainTemplates = (props: MainTemplatesInterface) => {
	return (
		<div className="bg-slate-100 min-h-screen">
			<header className="header">
				<div className="container flex justify-between items-center">
					<h1 className="text-3xl font-bold">Users App</h1>
					<button>Login</button>
				</div>
			</header>
			<main className="container py-4">{props.children}</main>
		</div>
	);
};

export default MainTemplates;
