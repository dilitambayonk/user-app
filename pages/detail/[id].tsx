import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import MainTemplates from "../../src/components/templates/MainTemplates";
import { fetchAPI } from "../../src/services/API";
import { TypeResponseSinggle } from "../../src/services/Types";

const DetailUser = () => {
	const router = useRouter();
	const { id } = router.query;

	const { data, isLoading, error } = useQuery<TypeResponseSinggle, Error>(
		["getUser"],
		() => fetchAPI.getUser(id as string)
	);

	console.log(data);

	return (
		<MainTemplates>
			{data?.data && (
				<div className="mt-10 p-4 bg-white rounded-xl shadow-xl flex flex-col justify-between">
					<div>
						<Image
							src={data?.data.avatar}
							loader={() => data?.data.avatar}
							alt="avatar"
							width={150}
							height={150}
							className="mx-auto rounded-full w-[150px] h-[150px]"
						/>
						<div className="py-2 text-center">
							<h2 className="text-slate-900 font-bold text-xl">
								{data?.data.first_name} {data?.data.last_name}
							</h2>
							<p className="text-slate-700 text-xs">{data?.data.email}</p>
						</div>
					</div>
				</div>
			)}
		</MainTemplates>
	);
};

export default DetailUser;
