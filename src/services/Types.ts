export type TypeUser = {
	id: number;
	email: string;
	first_name: string;
	last_name: string;
	avatar: string;
};

export type TypeResponse = {
	page: number;
	per_page: number;
	total: number;
	total_pages: number;
	data: Array<TypeUser>;
};

export type TypeResponseSinggle = {
	data: TypeUser;
};

export type TypeLoginUser = {
	email: string;
	password: string;
};
