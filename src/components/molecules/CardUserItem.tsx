import Image from "next/image";
import Link from "next/link";
import { FcLike } from "react-icons/fc";

interface CardUserItemInterface {
	id: number;
	name: string;
	email: string;
	avatar: string;
}

const CardUserItem = (props: CardUserItemInterface) => {
	const { id, name, email, avatar } = props;

	return (
		<div className="p-4 bg-white rounded-xl shadow-xl flex flex-col justify-between">
			<div>
				<Image
					src={avatar}
					loader={() => avatar}
					alt="avatar"
					width={150}
					height={150}
					className="mx-auto rounded-full w-[150px] h-[150px]"
				/>
				<div className="py-2 text-center">
					<h2 className="text-slate-900 font-bold text-xl">{name}</h2>
					<p className="text-slate-700 text-xs">{email}</p>
				</div>
			</div>
			<div className="mt-2 flex items-center justify-between">
				<Link href={`/detail/${id}`}>
					<button className="text-xs underline">Detail</button>
				</Link>
				<div>
					<FcLike />
				</div>
			</div>
		</div>
	);
};

export default CardUserItem;
