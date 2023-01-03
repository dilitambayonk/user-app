import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "@next/font/google";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { createContext, useState } from "react";
import Cookies from "js-cookie";
import { useEffect } from "react";

const poppins = Poppins({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	display: "block",
});

const queryClient = new QueryClient();

export const LoginContext = createContext<
	[boolean | null, (isLogedIn: boolean) => void]
>([false, () => {}]);

export default function App({ Component, pageProps }: AppProps) {
	const [isLogedIn, setIsLogedIn] = useState(false);

	useEffect(() => {
		setIsLogedIn(Cookies.get("token") ? true : false);
	}, []);

	return (
		<LoginContext.Provider value={[isLogedIn, setIsLogedIn]}>
			<QueryClientProvider client={queryClient}>
				<main className={poppins.className}>
					<Component {...pageProps} />
				</main>
			</QueryClientProvider>
		</LoginContext.Provider>
	);
}
