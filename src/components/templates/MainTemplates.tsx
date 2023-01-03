import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { useContext } from "react";
import { LoginContext } from "../../../pages/_app";

interface MainTemplatesInterface {
	children: ReactNode;
}

const MainTemplates = (props: MainTemplatesInterface) => {
	const router = useRouter();
	const [isLoggedIn, setIsloggedIn] = useContext(LoginContext);

	const handleLogin = () => {
		router.push("/login");
	};

	const handleLogout = () => {
		setIsloggedIn(false);
		Cookies.remove("token");
	};

	return (
		<div className="bg-slate-100 min-h-screen">
			<header className="header">
				<div className="container flex justify-between items-center">
					<h1 className="text-3xl font-bold">Users App</h1>
					{isLoggedIn ? (
						<button onClick={handleLogout}>Logout</button>
					) : (
						<button onClick={handleLogin}>Login</button>
					)}
				</div>
			</header>
			<main className="container py-4">{props.children}</main>
		</div>
	);
};

export default MainTemplates;
