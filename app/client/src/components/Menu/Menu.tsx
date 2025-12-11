import { useScreenSize } from "../../hooks/useScreenSize";
import { useMenuStore } from "../../store/useMenu";
import { MENU_UTILS_ITEMS } from "../../utils/Menu.utils";
import { RiLogoutCircleLine } from "react-icons/ri";

interface MenuProps {
	onFormModalOpen: (modalType: "student") => void;
}

const Menu: React.FC<MenuProps> = ({ onFormModalOpen }) => {
	const viewport = useScreenSize();
	const { isOpen, toggleMenu } = useMenuStore();

	const RESPONSIVE_WIDTH = viewport.width > 500 ? "w-80" : "w-70";

	return (
		<div
			className={`${RESPONSIVE_WIDTH} z-1000 fixed top-20 right-5  bottom-5 border-2 border-white/20 rounded-xl bg-black/20 backdrop-blur-md transform TRANSITION ${isOpen ? "translate-x-0 TRANSITION" : "translate-x-[125%] TRANSITION"}`}
		>
			<div className="text-white p-8 font-bold">
				<div className={`text-xl lg:text-2xl text-blue-400`}>MENU</div>
				<div className="mt-10">
					{MENU_UTILS_ITEMS.map((item) => {
						const Icon = item.icon;
						return (
							<div key={item.id}>
								<button
									type="button"
									onClick={() => {
										toggleMenu();
										onFormModalOpen("student");
									}}
								>
									<div className="group mb-10 flex items-center gap-3">
										<Icon
											size={20}
											className="group-hover:text-blue-400 group-hover:cursor-pointer group-hover:scale-101 TRANSITION"
										/>
										<div className="group-hover:text-white/30 group-hover:cursor-pointer TRANSITION">
											{item.title}
										</div>
									</div>
								</button>
							</div>
						);
					})}
				</div>
				<div>
					<div className="absolute bottom-5 right-5 bg-black/30 border-2 border-white/15 rounded-full p-2 hover:bg-blue-400 hover:cursor-pointer TRANSITION">
						<div className="text-white text-sm">
							<RiLogoutCircleLine size={20} />
						</div>
					</div>
					<div className="absolute bottom-5 right-18 bg-blue-400 border-2 border-white/15 rounded-full p-2">
						<div className="text-white text-sm">@apribhattacharya</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Menu;
