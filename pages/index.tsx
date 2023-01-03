import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import ErrorWarning from "../src/components/atoms/ErrorWarning";
import Loader from "../src/components/atoms/Loader";
import CardUserItem from "../src/components/molecules/CardUserItem";
import Pagination from "../src/components/molecules/Pagination";
import MainTemplates from "../src/components/templates/MainTemplates";
import { fetchAPI } from "../src/services/API";
import { TypeResponse, TypeUser } from "../src/services/Types";

export default function Home() {
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	const { data, isLoading, error, refetch, isInitialLoading } = useQuery<
		TypeResponse,
		Error
	>(["getUserAll"], () => fetchAPI.getUserAll({ page: page, per_page: 4 }), {
		onSuccess: (result) => {
			setTotalPages(result.total_pages);
		},
	});

	useEffect(() => {
		refetch();
	}, [page]);

	const handlePrevClick = () => {
		if (page > 1) {
			setPage(page - 1);
		}
	};

	const handleNextClick = () => {
		if (page < totalPages) {
			setPage(page + 1);
		}
	};

	return (
		<MainTemplates>
			<>
				{error && <ErrorWarning />}
				{(isLoading || isInitialLoading) && <Loader />}
				{data?.total && !isLoading && data?.total > 1 ? (
					<>
						<div className="grid grid-cols-4 gap-4 mt-10">
							{data?.data.map((item: TypeUser) => (
								<CardUserItem
									key={item.id}
									id={item.id}
									name={`${item.first_name} ${item.last_name}`}
									email={item.email}
									avatar={item.avatar}
								/>
							))}
						</div>
						<Pagination
							page={page}
							totalPages={totalPages}
							handlePrevClick={handlePrevClick}
							handleNextClick={handleNextClick}
						/>
					</>
				) : (
					<div className="my-10 text-red-600 text-center">
						Tidak ada data ditampilkan!
					</div>
				)}
			</>
		</MainTemplates>
	);
}
