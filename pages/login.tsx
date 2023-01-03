import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { fetchAPI } from "../src/services/API";
import { TypeLoginUser } from "../src/services/Types";
import Loader from "../src/components/atoms/Loader";
import { useRouter } from "next/router";
import Link from "next/link";
import Cookies from "js-cookie";
import { useContext } from "react";
import { LoginContext } from "./_app";

const Login = () => {
	const [isLoggedIn, setIsloggedIn] = useContext(LoginContext);
	const router = useRouter();
	const [input, setInput] = useState({ email: "", password: "" });

	const { mutate, isLoading } = useMutation(
		async (data: TypeLoginUser) => await fetchAPI.loginUser(data),
		{
			onSuccess: (data) => {
				setIsloggedIn(true);
				Cookies.set("token", data.token, { expires: 7 });
				router.push("/");
			},
		}
	);

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput({ ...input, [e.target.name]: e.target.value });
	};

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault();
		mutate(input);
	};

	return (
		<div className="bg-slate-100 min-h-screen grid place-items-center">
			<div className="max-w-md bg-white shadow-xl p-4 rounded-xl">
				<h2 className="text-center font-bold">Login</h2>
				<form onSubmit={handleLogin}>
					<div className="mt-6 flex flex-col gap-4">
						<input
							name="email"
							type="email"
							placeholder="Masukan email"
							className="w-full px-4 py-2 mt-2 border border-1 rounded focus:outline-4 outline-blue-200"
							onChange={handleChangeInput}
							required
						/>
						<input
							name="password"
							type="password"
							placeholder="Masukan password"
							className="w-full px-4 py-2 mt-2 border border-1 rounded focus:outline-4 outline-blue-200"
							onChange={handleChangeInput}
							required
						/>
						<button
							type="submit"
							className="px-7 py-3 bg-blue-500 rounded-full text-white font-semibold outline-none"
						>
							{isLoading ? (
								<Loader className="text-white my-0 text-3xl" />
							) : (
								"Login"
							)}
						</button>
						<Link href="/" className="mt-6 text-xs w-fit mx-auto underline">
							Kembali
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
