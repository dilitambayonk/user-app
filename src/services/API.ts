import axios from "axios";
import queryString from "query-string";
import Cookies from "js-cookie";
import { TypeLoginUser } from "./Types";

const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
});

instance.interceptors.request.use(
	(config: any) => {
		const token = Cookies.get("token");
		if (token) {
			config.headers.Authorization = "Bearer " + token;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

const loginUser = async (data: TypeLoginUser) => {
	try {
		const result = await instance.post("/login", data);
		return result.data;
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.log(error.message);
		}
	}
};

const getUserAll = async (query = { page: 1, per_page: 4 }) => {
	const queries = queryString.stringify(query);
	try {
		const result = await instance.get(`/users${queries ? `?${queries}` : ""}`);
		return result.data;
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.log(error.message);
		}
	}
};

const getUser = async (id: string) => {
	try {
		const result = await instance.get(`/users/${id}`);
		return result.data;
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.log(error.message);
		}
	}
};

export const fetchAPI = {
	getUserAll,
	getUser,
	loginUser,
};
