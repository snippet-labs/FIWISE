import { useState, useMemo } from "react";
import { useStudentStore } from "../../../store/useStudentStore";
import { MdPeopleAlt } from "react-icons/md";
import { IoCloseCircle } from "react-icons/io5";
import { LuUserSearch } from "react-icons/lu";

import {
	FaCheckCircle,
	FaExclamationCircle,
	FaTimesCircle,
} from "react-icons/fa";
import type { Student as StudentType } from "../../../store/types/Student.types";
import StudentDetailsModal from "../../Modal/Details/Student/StudentDetailsModal";
import { MONTHS_PER_YEAR } from "../../../constants";
import { getPaymentStatus } from "../../../utils/paymentStatus";
import { groupStudentsByClass } from "../../../utils/classGrouping";
import EmptyState from "../../EmptyState/EmptyState";

const Student: React.FC = () => {
	const { students } = useStudentStore();
	const [selectedStudent, setSelectedStudent] = useState<StudentType | null>(
		null,
	);
	const [searchQuery, setSearchQuery] = useState("");

	// QUICK STAT BASED ON YEAR
	const quickStats = useMemo(() => {
		let totalPaidFees = 0;
		let fullyPaid = 0;
		let partialPaid = 0;
		let noPaid = 0;

		students.forEach((student) => {
			const paidMonths = student.feeTracking[student.year] || [];
			totalPaidFees += paidMonths.length * student.fees;

			if (paidMonths.length === MONTHS_PER_YEAR) fullyPaid++;
			else if (paidMonths.length > 0) partialPaid++;
			else noPaid++;
		});

		return { totalPaidFees, fullyPaid, partialPaid, noPaid };
	}, [students]);

	// FILTER BY SEARCH
	const filteredStudents = useMemo(() => {
		if (!searchQuery.trim()) return students;

		const query = searchQuery.toLowerCase();
		return students.filter(
			(student) =>
				student.name.toLowerCase().includes(query) ||
				student.level.toLowerCase().includes(query),
		);
	}, [students, searchQuery]);

	// GROUP BY CLASS CATEGORY
	const groupedStudents = useMemo(() => {
		return groupStudentsByClass(filteredStudents);
	}, [filteredStudents]);


	if (students.length === 0) {
		return (
			<EmptyState
				icon={MdPeopleAlt}
				title="NO STUDENT"
				message='"ADD STUDENT" in the menu to get started'
			/>
		);
	}

	return (
		<div>
			{/* HEADER - QUICK STATS */}
			<div className="mb-6">
				<div className="flex items-center gap-3 mb-5">
					<MdPeopleAlt size={28} className="text-blue-400" />
					<h1 className="text-2xl font-bold text-white">STUDENT</h1>
				</div>

				{/* QUICK - STAT - CARDS */}
				<div className="grid grid-cols-2 gap-3 mb-4">
					<div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-xl p-3">
						<div className="flex items-center gap-2 mb-1">
							<MdPeopleAlt size={16} className="text-white" />
							<span className="text-xs text-white uppercase">Total</span>
						</div>
						<p className="text-2xl font-bold text-white">{students.length}</p>
					</div>
					<div className="bg-linear-to-br from-green-500 to-green-600 rounded-xl p-3">
						<div className="flex items-center gap-2 mb-1">
							<FaCheckCircle size={14} className="text-white" />
							<span className="text-xs text-white uppercase">Fully Paid</span>
						</div>
						<p className="text-2xl font-bold text-white">
							{quickStats.fullyPaid}
						</p>
					</div>
					<div className="bg-linear-to-br from-yellow-500 to-yellow-600 rounded-xl p-3">
						<div className="flex items-center gap-2 mb-1">
							<FaExclamationCircle size={14} className="text-white" />
							<span className="text-xs text-white uppercase">Partial</span>
						</div>
						<p className="text-2xl font-bold text-white">
							{quickStats.partialPaid}
						</p>
					</div>
					<div className="bg-linear-to-br from-red-500/70 to-red-600/70 rounded-xl p-3">
						<div className="flex items-center gap-2 mb-1">
							<FaTimesCircle size={14} className="text-white" />
							<span className="text-xs text-white uppercase">Unpaid</span>
						</div>
						<p className="text-2xl font-bold text-white">{quickStats.noPaid}</p>
					</div>
				</div>

				{/* SEARCH - FUNCTIONALITY */}
				<div className="relative">
					<LuUserSearch
						size={20}
						className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400"
					/>
					<input
						type="text"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder="Search by name or class..."
						className="w-full pl-12 pr-4 py-3 bg-black border-2 border-white/10 rounded-full text-white placeholder-white/40 focus:border-blue-400 focus:outline-none TRANSITION"
					/>
					{searchQuery && (
						<button
							type="button"
							onClick={() => setSearchQuery("")}
							className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
						>
							<IoCloseCircle size={20} className="text-red-500" />
						</button>
					)}
				</div>
			</div>

			{/* STUDENT - CATEGORIZATION */}
			{groupedStudents.length === 0 ? (
				<div className="text-center py-10">
					<p className="text-white/60">
						No students found matching "{searchQuery}"
					</p>
					<button
						type="button"
						onClick={() => setSearchQuery("")}
						className="mt-3 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full TRANSITION"
					>
						CLEAR
					</button>
				</div>
			) : (
				<div className="space-y-8">
					{groupedStudents.map(([className, classStudents]) => (
						<div key={className}>
							{/* HEADER */}
							<div className="flex items-center gap-3 mb-4">
								<div className="relative">
									<div className="absolute inset-0 bg-purple-500/20 rounded-full blur-lg"></div>
									<div className="relative bg-linear-to-br from-purple-500 to-purple-600 px-4 py-2 rounded-full border-2 border-purple-400/50">
										<span className="text-white font-bold text-sm">
											CLASS {className}
										</span>
									</div>
								</div>
								<div className="flex-1 h-px bg-linear-to-r from-white/20 to-transparent"></div>
								<span className="text-sm text-white/40 font-medium">
									<span className="text-blue-400">{classStudents.length}</span>{" "}
									{classStudents.length === 1 ? "student" : "students"}
								</span>
							</div>

							{/* CARDS - GIRD */}
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
								{classStudents.map((student) => {
									const paidMonths = student.feeTracking[student.year] || [];
									const paymentStatus = getPaymentStatus(paidMonths.length);

									return (
										<button
											type="button"
											key={student.id}
											onClick={() => setSelectedStudent(student)}
											className="group relative bg-black border-2 border-purple-400/20 rounded-xl p-4 text-left TRANSITION cursor-pointer overflow-hidden"
										>
											{/* PAYMENT - STATUS - INDICATOR */}
											<div className="absolute top-3 right-3">
												{paymentStatus === "full" && (
													<div className="relative">
														<div className="absolute inset-0 animate-ping">
															<FaCheckCircle
																size={12}
																className="text-green-400/50"
															/>
														</div>
														<FaCheckCircle
															size={12}
															className="text-green-400"
														/>
													</div>
												)}
												{paymentStatus === "partial" && (
													<FaExclamationCircle
														size={12}
														className="text-yellow-400"
													/>
												)}
												{paymentStatus === "none" && (
													<FaTimesCircle size={12} className="text-red-400" />
												)}
											</div>
											{/* INFORMATION */}
											<div className="relative">
												<h3 className="text-blue-400 font-bold text-base mb-2 truncate pr-4">
													{student.name}
												</h3>

												{/* QUICK - INFORMATION */}
												<div className="space-y-1">
													<div className="flex items-center gap-2 text-xs">
														<span className="text-white/40">Year:</span>
														<span className="text-white/80 font-semibold">
															{student.year}
														</span>
													</div>
													<div className="flex items-center gap-2 text-xs">
														<span className="text-white/40">Fees:</span>
														<span className="text-white/80 font-semibold">
															<span className="text-green-500">₹</span>
															{student.fees} / mo
														</span>
													</div>
													<div className="flex items-center gap-2 text-xs">
														<span className="text-white/40">Paid:</span>
														<span
															className={`font-bold ${
																paymentStatus === "full"
																	? "text-green-400"
																	: paymentStatus === "partial"
																		? "text-yellow-400"
																		: "text-red-400"
															}`}
														>
															{paidMonths.length}/12
														</span>
													</div>
												</div>

												{/* FEES - PROGRESS BAR */}
												<div className="mt-3 w-full h-1 bg-white/10 rounded-full overflow-hidden">
													<div
														className={`h-full TRANSITION ${
															paymentStatus === "full"
																? "bg-green-400"
																: paymentStatus === "partial"
																	? "bg-yellow-400"
																	: "bg-red-400"
														}`}
														style={{
															width: `${(paidMonths.length / 12) * 100}%`,
														}}
													/>
												</div>
											</div>
										</button>
									);
								})}
							</div>
						</div>
					))}
				</div>
			)}

			{/* STUDENT - SELECTED - MODAL */}
			{selectedStudent && (
				<StudentDetailsModal
					student={selectedStudent}
					onClose={() => setSelectedStudent(null)}
				/>
			)}
		</div>
	);
};

export default Student;
