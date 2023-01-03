import { BiLoaderAlt } from "react-icons/bi";

interface LoaderInterface {
	className?: string;
}

const Loader = (props: LoaderInterface) => {
	return (
		<BiLoaderAlt
			className={`animate-spin mx-auto ${
				props.className ? props.className : "text-blue-500 my-60 text-4xl"
			}`}
		/>
	);
};

export default Loader;
