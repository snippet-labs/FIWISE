import { useState } from "react";
import Image from "../../../public/logo.png";
import { useScreenSize } from "../../hooks/useScreenSize";
import Home from "../../pages/Home/Home";
import Menu from "../Menu/Menu";
import Navigation from "../Navigation/Navigation";
import StudentModal from "../Modal/Form/Student/StudentModal";

const Content: React.FC = () => {
	const viewport = useScreenSize();
	const RESTRICTIVE_VIEWPORT_SIZE = viewport.width > 450;

	const [activeFormModal, setActiveFormModal] = useState<"student" | null>(
		null,
	);

	return (
		<div className="h-screen w-full">
			<div className="relative w-full min-h-full bg-black/98 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[32px_32px] bg-repeat">
				{RESTRICTIVE_VIEWPORT_SIZE ? (
					<div>
						<div className="flex flex-col items-center justify-center h-screen">
							<img
								src={Image}
								alt="mindlist-application-logo"
								className="hover:cursor-pointer hover:scale-105 TRANSITION"
							/>
							<span className="text-white font-bold text-2xl">FIWISE</span>
							<div className="mt-5">
								<p className="text-white">
									We are currently only on mobile, stay tuned
								</p>
							</div>
						</div>
					</div>
				) : (
					<div>
						<Navigation />
						{activeFormModal === "student" && (
							<StudentModal
								onStudentFormModalClose={() => setActiveFormModal(null)}
							/>
						)}
						<div className="mx-auto max-w-[1440px] w-full">
							<Menu
								onFormModalOpen={(modalType) => setActiveFormModal(modalType)}
							/>
							<div className="px-5 py-5 md:px-25 lg:px-25">
								<Home />
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Content;
