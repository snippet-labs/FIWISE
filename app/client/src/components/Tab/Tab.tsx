import { useState } from "react";
import { MdPeopleAlt } from "react-icons/md";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { IoCalendarSharp } from "react-icons/io5";
import Student from "./Student/Student";
import Dashboard from "./Dashboard/Dashboard";
import Routine from "./Routine/Routine";

const Tab: React.FC = () => {
	const [activeTab, setActiveTab] = useState<
		"students" | "routine" | "dashboard"
	>("students");

	return (
		<div>
			<div className="flex items-center gap-3">
				<button
					type="button"
					onClick={() => setActiveTab("students")}
					className={`rounded-full border-2 border-white/30 bg-black cursor-pointer ${activeTab === "students" ? "bg-white text-blue-400 px-9 py-2" : "text-white p-2"} hover:scale-105 TRANSITION`}
				>
					<MdPeopleAlt size={20} />
				</button>

				<button
					type="button"
					onClick={() => setActiveTab("routine")}
					className={`rounded-full border-2 border-white/30 bg-black cursor-pointer ${activeTab === "routine" ? "bg-white text-blue-400 px-9 py-2" : "text-white p-2"} hover:scale-105 TRANSITION`}
				>
					<IoCalendarSharp size={20} />
				</button>

				<button
					type="button"
					onClick={() => setActiveTab("dashboard")}
					className={`rounded-full border-2 border-white/30 bg-black cursor-pointer ${activeTab === "dashboard" ? "bg-white text-blue-400 px-9 py-2" : "text-white p-2"} hover:scale-105 TRANSITION`}
				>
					<TbLayoutDashboardFilled size={20} />
				</button>
			</div>
			<div className="mt-4">
				{activeTab === "students" && <Student />}
				{activeTab === "routine" && <Routine />}
				{activeTab === "dashboard" && <Dashboard />}
			</div>
		</div>
	);
};

export default Tab;
