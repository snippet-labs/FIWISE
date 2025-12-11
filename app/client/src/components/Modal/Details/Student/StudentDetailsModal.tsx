import { useState } from "react";
import { motion } from "motion/react";
import { IoCloseCircle } from "react-icons/io5";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import type { Student } from "../../../../store/types/Student.types";
import { useStudentStore } from "../../../../store/useStudentStore";

interface StudentDetailsModalProps {
	student: Student;
	onClose: () => void;
}

const MONTHS = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

const StudentDetailsModal: React.FC<StudentDetailsModalProps> = ({
	student: initialStudent,
	onClose,
}) => {
	const { students, updateStudent, deleteStudent } = useStudentStore();
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

	const handleDelete = () => {
		deleteStudent(student.id);
		onClose();
	};

	return (
		<div className="fixed inset-0 z-3000 flex items-center justify-center p-4 overflow-y-auto">
			<div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
			<button type="button" onClick={onClose}></button>

			<motion.div
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.9, opacity: 0 }}
				className="relative z-5000 bg-black rounded-xl shadow-2xl p-6 w-full max-w-2xl border-2 border-blue-400 my-4 max-h-[90vh] overflow-y-auto"
			>
				{/* HEADER */}
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-2xl font-bold text-white">Student Details</h2>
					<button
						type="button"
						onClick={onClose}
						className="text-white hover:text-red-400 TRANSITION"
					>
						<IoCloseCircle size={28} />
					</button>
				</div>

				{/* INFORMATION */}
				<div className="space-y-4 mb-6">
					{/* NAME */}
					<div className="bg-black/50 border border-white/30 rounded-lg p-4">
						<label
							htmlFor="name"
							className="text-xs text-white/60 uppercase tracking-wide"
						>
							Name
						</label>
						<p className="text-white text-lg font-semibold mt-1">
							{student.name}
						</p>
					</div>

					{/* LEVEL / CLASS */}
					<div className="bg-black/50 border border-white/30 rounded-lg p-4">
						<label
							htmlFor="class"
							className="text-xs text-white/60 uppercase tracking-wide"
						>
							Class
						</label>
						<p className="text-white text-lg font-semibold mt-1">
							<span className="bg-purple-500 px-3 py-1 rounded-full text-sm">
								CLASS {student.level.toUpperCase()}
							</span>
						</p>
					</div>

					{/* YEAR - WITH - INCREMENT / DECREMENT */}
					<div className="bg-black/50 border border-white/30 rounded-lg p-4">
						<label
							htmlFor="academic-year"
							className="text-xs text-white/60 uppercase tracking-wide mb-2 block"
						>
							Academic Year
						</label>
						<div className="flex items-center gap-3">
							<button
								type="button"
								onClick={handleYearDecrement}
								className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg TRANSITION"
							>
								<FiMinus size={20} />
							</button>
							<span className="text-white text-2xl font-bold flex-1 text-center">
								{currentYear}
							</span>
							<button
								type="button"
								onClick={handleYearIncrement}
								className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg TRANSITION"
							>
								<FiPlus size={20} />
							</button>
						</div>
					</div>

					{/* JOINING - DATE */}
					<div className="grid grid-cols-2 gap-4">
						<div className="bg-black/50 border border-white/30 rounded-lg p-4">
							<label
								htmlFor="joined"
								className="text-xs text-white/60 uppercase tracking-wide"
							>
								Joined
							</label>
							<p className="text-white text-lg font-semibold mt-1">
								{student.joined}
							</p>
						</div>

						{/* MONTHLY - FEES */}
						<div className="bg-black/50 border border-white/30 rounded-lg p-4">
							<label
								htmlFor="monthly-fees"
								className="text-xs text-white/60 uppercase tracking-wide"
							>
								Monthly Fees
							</label>
							<p className="text-white text-lg font-semibold mt-1">
								₹{student.fees}
							</p>
						</div>
					</div>

					{/* SUBJECTS */}
					<div className="bg-black/50 border border-white/30 rounded-lg p-4">
						<label
							htmlFor="subjects"
							className="text-xs text-white/60 uppercase tracking-wide mb-2 block"
						>
							Subjects
						</label>
						<div className="flex flex-wrap gap-2">
							{student.subjects.map((subject) => (
								<span
									key={subject}
									className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium"
								>
									{subject}
								</span>
							))}
						</div>
					</div>

					{/* DAYS - ATTENDING */}
					<div className="bg-black/50 border border-white/30 rounded-lg p-4">
						<label
							htmlFor="days-attending"
							className="text-xs text-white/60 uppercase tracking-wide mb-2 block"
						>
							Days Attending
						</label>
						<div className="flex flex-wrap gap-2">
							{student.days.map((day) => (
								<span
									key={day}
									className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium"
								>
									{day}
								</span>
							))}
						</div>
					</div>
				</div>

				{/* FEE - TRACKER */}
				<div className="mb-6">
					<button
						type="button"
						onClick={() => setIsAccordionOpen(!isAccordionOpen)}
						className="w-full bg-linear-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 TRANSITION flex items-center justify-between"
					>
						<span>Fee Tracker - {currentYear}</span>
						<span className="text-sm">{isAccordionOpen ? "▲" : "▼"}</span>
					</button>

					{isAccordionOpen && (
						<motion.div
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: "auto", opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							className="bg-black/50 border-2 border-blue-400/30 rounded-lg p-4 mt-2"
						>
							<p className="text-white/60 text-sm mb-3">
								Select the months when fees were paid for year {currentYear}
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
											className={`py-3 px-3 rounded-lg font-bold text-sm relative overflow-hidden transform transition-all duration-200 ${
												isPaid
													? "bg-green-500 text-white border-2 border-green-400 shadow-lg shadow-green-500/50 scale-105"
													: "bg-black/50 text-white/60 border-2 border-white/30 hover:border-green-400 hover:bg-black/70 hover:scale-105"
											} ${isClicked ? "scale-95" : ""}`}
										>
											{isPaid && (
												<span className="absolute inset-0 flex items-center justify-center text-white text-xs">
													✓
												</span>
											)}
											<span className={isPaid ? "opacity-70" : ""}>
												{month}
											</span>
										</button>
									);
								})}
							</div>
							<div className="mt-4 p-3 bg-black/30 rounded-lg border border-white/10">
								<div className="flex items-center justify-between">
									<span className="text-white/60 text-sm">Paid months:</span>
									<span className="text-white font-bold text-lg">
										{paidMonths.length}/12
									</span>
								</div>
								<div className="mt-2 text-white text-sm font-semibold">
									{paidMonths.length > 0 ? (
										<span className="text-green-400">
											{paidMonths.join(", ")}
										</span>
									) : (
										<span className="text-red-400">No months paid yet</span>
									)}
								</div>
								<div className="mt-2 w-full h-2 bg-black/50 rounded-full overflow-hidden">
									<div
										className="h-full bg-linear-to-r from-green-400 to-green-600 transition-all duration-300"
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
						className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg TRANSITION flex items-center justify-center gap-2"
					>
						<FiTrash2 size={18} />
						Delete Student
					</button>
					<button
						type="button"
						onClick={onClose}
						className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg TRANSITION"
					>
						Close
					</button>
				</div>

				{/* DELETE - CONFIRMATION */}
				{showDeleteConfirm && (
					<div className="absolute inset-0 bg-black/90 rounded-xl flex items-center justify-center p-6">
						<div className="bg-black border-2 border-red-400 rounded-lg p-6 max-w-md">
							<h3 className="text-white text-xl font-bold mb-4">
								Confirm Deletion
							</h3>
							<p className="text-white/80 mb-6">
								Are you sure you want to delete {student.name}? This action
								cannot be undone.
							</p>
							<div className="flex gap-3">
								<button
									type="button"
									onClick={handleDelete}
									className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg TRANSITION"
								>
									Yes, Delete
								</button>
								<button
									type="button"
									onClick={() => setShowDeleteConfirm(false)}
									className="flex-1 bg-white/20 hover:bg-white/30 text-white font-semibold py-2 rounded-lg TRANSITION"
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				)}
			</motion.div>
		</div>
	);
};

export default StudentDetailsModal;
