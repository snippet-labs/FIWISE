import { useState } from "react";
import { motion } from "motion/react";
import { IoCloseCircle } from "react-icons/io5";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import type { Student } from "../../../../store/types/Student.types";
import { useStudentStore } from "../../../../store/useStudentStore";
import { TbArrowUpFromArc, TbArrowUpToArc } from "react-icons/tb";
import Confirmation from "../../Confirmation/ConfirmationModal";
import { MONTHS } from "../../../../utils/Form.utils";

interface StudentDetailsModalProps {
	student: Student;
	onClose: () => void;
}

// const MONTHS = [
// 	"Jan",
// 	"Feb",
// 	"Mar",
// 	"Apr",
// 	"May",
// 	"Jun",
// 	"Jul",
// 	"Aug",
// 	"Sep",
// 	"Oct",
// 	"Nov",
// 	"Dec",
// ];

const StudentDetailsModal: React.FC<StudentDetailsModalProps> = ({
	student: initialStudent,
	onClose,
}) => {
	const { students, updateStudent } = useStudentStore();
	const [currentYear, setCurrentYear] = useState(initialStudent.year);
	const [isAccordionOpen, setIsAccordionOpen] = useState(false);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const [clickedMonth, setClickedMonth] = useState<string | null>(null);

	// DATA - STORE - STUDENT
	const student =
		students.find((s) => s.id === initialStudent.id) || initialStudent;

	// PAID - MONTS
	const paidMonths = student.feeTracking[currentYear] || [];

	const handleYearIncrement = () => {
		const newYear = currentYear + 1;
		setCurrentYear(newYear);
		updateStudent(student.id, { year: newYear });
	};

	const handleYearDecrement = () => {
		const newYear = currentYear - 1;
		setCurrentYear(newYear);
		updateStudent(student.id, { year: newYear });
	};

	const handleMonthToggle = (month: string) => {
		setClickedMonth(month);
		setTimeout(() => setClickedMonth(null), 300);

		const currentPaidMonths = student.feeTracking[currentYear] || [];
		const newPaidMonths = currentPaidMonths.includes(month)
			? currentPaidMonths.filter((m) => m !== month)
			: [...currentPaidMonths, month];

		const newFeeTracking = {
			...student.feeTracking,
			[currentYear]: newPaidMonths,
		};

		updateStudent(student.id, { feeTracking: newFeeTracking });
	};

	// const handleDelete = () => {
	// 	deleteStudent(student.id);
	// 	onClose();
	// };

	return (
		<div className="fixed inset-0 z-3000 flex items-center justify-center p-4 overflow-y-auto">
			<div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
			{/* <button type="button" onClick={onClose}></button> */}

			<motion.div
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.9, opacity: 0 }}
				className="relative z-5000 bg-black rounded-xl shadow-2xl p-6 w-full max-w-2xl border-2 border-blue-400 my-4 max-h-[90vh] overflow-y-auto"
			>
				{/* HEADER */}
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-2xl font-bold text-white">STUDENT DETAILS</h2>
					<button
						type="button"
						onClick={onClose}
						className="text-red-500/70 hover:cursor-pointer TRANSITION"
					>
						<IoCloseCircle size={28} />
					</button>
				</div>

				{/* INFORMATION */}
				<div className="space-y-2">
					{/* NAME */}
					<div className="flex flex-wrap items-center justify-between bg-black border border-white/30 rounded-xl px-4 py-2">
						<label
							htmlFor="name"
							className="text-xs text-white/60 uppercase tracking-tighter"
						>
							Name
						</label>
						<p className="text-white text-md font-semibold">{student.name}</p>
					</div>

					{/* LEVEL / CLASS */}
					<div className="flex flex-wrap items-center justify-between bg-black border border-white/30 rounded-xl px-4 py-3">
						<label
							htmlFor="class"
							className="text-xs text-white/60 uppercase tracking-tighter"
						>
							Class
						</label>
						<p className="text-white text-xs font-semibold">
							<span className="bg-purple-500 px-3 py-1 rounded-full text-xs">
								{student.level.toUpperCase()}
							</span>
						</p>
					</div>

					{/* YEAR - WITH - INCREMENT / DECREMENT */}
					<div className="bg-black border border-white/30 rounded-xl px-4 py-2">
						<label
							htmlFor="academic-year"
							className="text-xs text-white/60 uppercase tracking-tighter mb-2 block"
						>
							Academic Year
						</label>
						<div className="flex items-center gap-3">
							<button
								type="button"
								onClick={handleYearDecrement}
								className="bg-blue-400 text-white p-2 rounded-full TRANSITION"
							>
								<FiMinus size={15} />
							</button>
							<span className="text-white text-xl font-bold flex-1 text-center">
								{currentYear}
							</span>
							<button
								type="button"
								onClick={handleYearIncrement}
								className="bg-blue-400 text-white p-2 rounded-full TRANSITION"
							>
								<FiPlus size={15} />
							</button>
						</div>
					</div>

					{/* JOINING - DATE */}
					<div className="grid grid-cols-2 gap-2">
						<div className="bg-black border border-white/30 rounded-xl px-4 py-1">
							<label
								htmlFor="joined"
								className="text-xs text-white/60 uppercase tracking-tighter"
							>
								Joined
							</label>
							<p className="text-white text-md font-semibold">
								{student.joined}
							</p>
						</div>

						{/* MONTHLY - FEES */}
						<div className="bg-black border border-white/30 rounded-xl px-4 py-1">
							<label
								htmlFor="monthly-fees"
								className="text-xs text-white/60 uppercase tracking-tigher"
							>
								Monthly Fees
							</label>
							<p className="text-white text-md font-semibold">
								<span className="text-green-500">₹</span>
								{student.fees}
							</p>
						</div>
					</div>

					{/* SUBJECTS */}
					<div className="bg-black border border-white/30 rounded-xl px-4 py-2">
						<label
							htmlFor="subjects"
							className="text-xs text-white/60 uppercase tracking-tighter mb-2 block"
						>
							Subjects
						</label>
						<div className="flex flex-wrap gap-1">
							{student.subjects.map((subject) => (
								<span
									key={subject}
									className="bg-emerald-500 text-white px-2 py-0.5 rounded-full text-xs font-medium"
								>
									{subject}
								</span>
							))}
						</div>
					</div>

					{/* DAYS - ATTENDING */}
					<div className="bg-black border border-white/30 rounded-xl px-4 py-2 mb-2">
						<label
							htmlFor="days-attending"
							className="text-xs text-white/60 uppercase tracking-tighter mb-2 block"
						>
							Days Attending
						</label>
						<div className="flex flex-wrap gap-1">
							{student.days.map((day) => (
								<span
									key={day}
									className="bg-blue-500 text-white px-2 py-0.5 rounded-full text-xs font-medium"
								>
									{day}
								</span>
							))}
						</div>
					</div>
				</div>

				{/* FEE - TRACKER */}
				<div className="mb-8">
					<button
						type="button"
						onClick={() => setIsAccordionOpen(!isAccordionOpen)}
						className="w-full bg-linear-to-r from-green-600/70 to-green-500/70  text-white font-bold py-3 px-4 rounded-xl TRANSITION flex items-center justify-between"
					>
						<span className="flex gap-2 text-sm">
							FEE TRACKER <span className="text-black">{currentYear}</span>
						</span>
						<span className="text-xs TRANSITION">
							{isAccordionOpen ? (
								<TbArrowUpToArc size={18} className="text-bold " />
							) : (
								<TbArrowUpFromArc size={18} className="text-bold" />
							)}
						</span>
					</button>

					{isAccordionOpen && (
						<motion.div
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: "auto", opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							className="bg-black border-2 border-green-400/30 rounded-xl p-4 mt-2"
						>
							<p className="text-white/60 text-xs mb-3">
								Mark the months for fees paid for{" "}
								<span className="text-green-400">{currentYear}</span>
							</p>
							<div className="grid grid-cols-3 md:grid-cols-4 gap-2">
								{MONTHS.map((month) => {
									const isPaid = paidMonths.includes(month);
									const isClicked = clickedMonth === month;
									return (
										<button
											key={month}
											type="button"
											onClick={() => handleMonthToggle(month)}
											className={`py-2 rounded-xl font-bold text-xs relative overflow-hidden TRANSITION ${
												isPaid
													? "bg-green-500/50 text-white border-2 border-green-400 scale-101"
													: "bg-black text-white/60 border-2 border-white/30"
											} ${isClicked ? "scale-95" : ""}`}
										>
											{/* {isPaid && (
												<span className="absolute inset-0 flex items-center justify-center text-white text-xs">
													✓
												</span>
											)} */}
											<span className={isPaid ? "" : "opacity-70"}>
												{month}
											</span>
										</button>
									);
								})}
							</div>
							<div className="mt-4 p-3 border-green-400/30 rounded-xl border-2">
								<div className="flex items-center justify-between">
									<span className="text-white/60 text-xs uppercase">
										Paid months
									</span>
									<span className="text-white font-bold text-lg">
										{paidMonths.length}/12
									</span>
								</div>
								<div className="mt-2 text-white text-sm font-semibold">
									{paidMonths.length > 0 ? (
										<span className="text-green-400">
											{/* {paidMonths.join(", ")}  */}
										</span>
									) : (
										<span className="text-red-400 text-xs uppercase">
											All fees due for this year
										</span>
									)}
								</div>
								<div className="mt-2 w-full h-2 bg-black rounded-full overflow-hidden">
									<div
										className="h-full bg-linear-to-r from-green-400/80 to-green-600/80 TRASITION"
										style={{ width: `${(paidMonths.length / 12) * 100}%` }}
									/>
								</div>
							</div>
						</motion.div>
					)}
				</div>

				{/* BUTTONS */}
				<div className="flex gap-3">
					<button
						type="button"
						onClick={() => setShowDeleteConfirm(true)}
						className="flex-1 bg-linear-to-br from-red-500/70 to-red-600/70 text-white font-semibold py-2 rounded-full TRANSITION flex items-center justify-center gap-2"
					>
						<FiTrash2 size={18} />
						DELETE RECORD
					</button>
				</div>

				{/* DELETE - CONFIRMATION */}
				{showDeleteConfirm && (
					<Confirmation
						title="CONFIRM DELETION ?"
						targetSelection={student.id}
						onDeleteConfirmationModalClose={() => setShowDeleteConfirm(false)}
					/>
				)}
			</motion.div>
		</div>
	);
};

export default StudentDetailsModal;
