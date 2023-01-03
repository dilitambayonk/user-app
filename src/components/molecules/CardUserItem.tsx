import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { LoginContext } from "../../../pages/_app";
import { useEffect } from "react";

interface CardUserItemInterface {
	id: number;
	name: string;
	email: string;
	avatar: string;
}

const CardUserItem = (props: CardUserItemInterface) => {
	const { id, name, email, avatar } = props;
	const [isLeggedIn] = useContext(LoginContext);
	const [isLike, setIsLike] = useState(false);

	useEffect(() => {
		const dataLikes: Array<number> = JSON.parse(
			localStorage.getItem("liked") || "[]"
		);
		dataLikes.find((item) => item === id && setIsLike(true));
	}, []);

	const handleLike = () => {
		if (!isLeggedIn) {
			return alert("Login untuk bisa like user!");
		}

		const dataLikes: Array<number> = JSON.parse(
			localStorage.getItem("liked") || "[]"
		);
		const like = dataLikes.find((item) => item === id);
		console.log(like);
		if (like) {
			const newLiked = removeItemOnce(dataLikes, id);
			localStorage.setItem("liked", JSON.stringify(newLiked));
		} else {
			dataLikes.push(id);
			localStorage.setItem("liked", JSON.stringify(dataLikes));
		}
		setIsLike(!isLike);
	};

	const removeItemOnce = (arr: Array<number>, id: number) => {
		const index = arr.indexOf(id);
		if (index > -1) {
			arr.splice(index, 1);
		}
		return arr;
	};

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
				<button onClick={handleLike}>
					{isLike ? <FcLike /> : <FcLikePlaceholder />}
				</button>
			</div>
		</div>
	);
};

export default CardUserItem;
