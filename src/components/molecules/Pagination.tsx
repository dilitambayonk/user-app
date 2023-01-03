import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useState } from "react";

interface PaginationInterface {
	page: number | undefined;
	totalPages: number | undefined;
	handlePrevClick: () => void;
	handleNextClick: () => void;
}

const Pagination = (props: PaginationInterface) => {
	const { page, totalPages, handlePrevClick, handleNextClick } = props;

	return (
		<div className="mt-8 flex justify-center items-center gap-3">
			<button
				onClick={handlePrevClick}
				className={`p-1 hover:text-white hover:bg-blue-500 w-6 h-6 rounded ${
					page === 1 && "opacity-50"
				}`}
				disabled={page === 1}
			>
				<IoIosArrowBack />
			</button>
			{[...new Array(totalPages)].map((val, i) => (
				<div
					key={i}
					className={`p-1 w-6 h-6 grid place-content-center rounded ${
						i + 1 === page && "underline"
					}`}
				>
					{i + 1}
				</div>
			))}
			<button
				onClick={handleNextClick}
				className={`p-1 hover:text-white hover:bg-blue-500 w-6 h-6 rounded ${
					page === totalPages && "opacity-50"
				}`}
				disabled={page === totalPages}
			>
				<IoIosArrowForward />
			</button>
		</div>
	);
};

export default Pagination;
