import axios from "axios";
import queryString from "query-string";

const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
});

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
};
