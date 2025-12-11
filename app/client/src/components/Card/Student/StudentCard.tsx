import { FaUserEdit } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";

interface StudentCardProps {
	name: string;
	level: string;
	year: number;
	joined: string;
	subjects: string[];
	days: string[];
	fees: number;
	onDeleteConfirmation: () => void;
}

const StudentCard: React.FC<StudentCardProps> = ({
	name,
	level,
	year,
	joined,
	subjects,
	days,
	fees,
	onDeleteConfirmation,
}) => {
	return (
		<div className="w-full max-w-sm bg-black/90 border-2 border-blue-400 rounded-2xl p-6 text-white shadow-xl">
			<div className="flex items-center justify-end gap-2">
				<button
					type="button"
					aria-label="Edit"
					onClick={() => {}}
					className="group p-2 rounded-full border-2 border-white/30 hover:bg-white active:scale-95 TRANSITION"
				>
					<FaUserEdit size={16} className="group-hover:text-blue-400" />
				</button>

				<button
					type="button"
					aria-label="Delete"
					onClick={onDeleteConfirmation}
					className="group p-2 rounded-full border-2 border-white/30 hover:bg-white active:scale-95 TRANSITION"
				>
					<RiDeleteBinFill size={16} className="group-hover:text-red-400" />
				</button>
			</div>
			<div className="mt-3">
				<div className="mb-5">
					<h2 className="text-2xl font-bold tracking-tight truncate">{name}</h2>

					<span className="mt-2 inline-block text-xs bg-purple-500/80 text-white px-3 py-1 rounded-full font-semibold">
						{(() => {
							const lower = level.toLowerCase();
							if (lower === "ug" || lower === "pg") return level.toUpperCase();
							const num = Number(level);
							if (!Number.isNaN(num) && num >= 1 && num <= 12) {
								return `CLASS ${num}`;
							}
							return level;
						})()}
					</span>
				</div>

				<div className="space-y-3 text-sm leading-relaxed">
					<p className="flex justify-between">
						<span className="opacity-60">Academic Year</span>
						<span className="font-medium text-blue-400">{year}</span>
					</p>

					<p className="flex justify-between">
						<span className="opacity-60">Joined</span>
						<span className="font-medium">{joined}</span>
					</p>

					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0">
						<span className="opacity-60 text-sm">Subjects</span>

						<div className="flex-1 md:max-w-[60%]">
							<div className="flex flex-wrap gap-2 py-0.5">
								{subjects.map((subject) => (
									<span
										key={subject}
										className="px-2 py-1 border border-emerald-300 rounded-full bg-white/5 text-emerald-300 text-xs font-medium"
									>
										{subject}
									</span>
								))}
							</div>
						</div>
					</div>

					<div>
						<span className="opacity-60">Days Attending</span>
						<div className="flex flex-wrap gap-2 mt-2">
							{days.map((days) => (
								<span
									key={days}
									className="px-2 py-1 rounded-full text-xs font-bold bg-white text-blue-400 border border-white/30"
								>
									{days}
								</span>
							))}
						</div>
					</div>

					<p className="flex justify-between mt-5">
						<span className="opacity-60">Fees</span>
						<span className="text-green-400 font-bold text-2xl">₹{fees}</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default StudentCard;

/**
 * @description This Student Card component would take the following items -
 * name (Name of the student)
 * level (Level/Class of the student)
 * year (Year of joining)
 * joined (Full information of the joining date)
 * subjects (The number of subjects undertaken by the student)
 * days (Days in a week in which the student is attending classes)
 * fees (Monthly fee structure)
 */
