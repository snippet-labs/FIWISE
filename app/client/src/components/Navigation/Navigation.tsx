import Image from "../../../public/logo.png";
import { RiMenuFoldFill, RiMenuFold2Fill } from "react-icons/ri";
import { useMenuStore } from "../../store/useMenu";

const Navigation: React.FC = () => {
	const { isOpen, toggleMenu } = useMenuStore();

	return (
		<div className="z-2000 sticky top-0 w-full bg-black/20 backdrop-blur-md border-b-2 border-white/20">
			<div className="flex items-center justify-between h-15 mx-auto max-w-[1440px] w-full px-5 md:px-25 lg:px-25">
				<div className="flex gap-2">
					<img
						src={Image}
						alt="mind-list-application-logo"
						className="w-8 md:w-10 lg:w-10 TRANSITION"
					/>
					<span className="text-white font-bold text-md md:text-lg lg:text-xl TRANSITION">
						FIWISE<span className="text-blue-400">.</span>
					</span>
				</div>
				<button type="button" onClick={toggleMenu} className="TRANSITION">
					{isOpen ? (
						<RiMenuFold2Fill
							size={30}
							className="text-white hover:text-blue-400 hover:cursor-pointer TRANSITION"
						/>
					) : (
						<RiMenuFoldFill
							size={30}
							className="text-white hover:text-blue-400 hover:cursor-pointer TRANSITION"
						/>
					)}
				</button>
			</div>
		</div>
	);
};

export default Navigation;
