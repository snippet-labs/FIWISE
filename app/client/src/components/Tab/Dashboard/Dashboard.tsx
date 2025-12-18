import { useMemo, useState } from "react";
import { useStudentStore } from "../../../store/useStudentStore";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { MdPeopleAlt } from "react-icons/md";
import { FaRupeeSign, FaCalendarCheck } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { FiPlus, FiMinus } from "react-icons/fi";
import { MONTHS_PER_YEAR, CURRENCY_SYMBOL } from "../../../constants";
import {
	formatCurrency,
	formatPercentage,
	formatMonthShort,
} from "../../../utils/formatters";
import EmptyState from "../../EmptyState/EmptyState";

const Dashboard: React.FC = () => {
	const { students } = useStudentStore();
	const currentYear = new Date().getFullYear();
	const currentMonth = formatMonthShort();
	const [selectedYear, setSelectedYear] = useState(currentYear);

	// STATISTICAL - ANALYSIS
	const stats = useMemo(() => {
		const totalStudents = students.length;

		// STUDENTS - BY - CLASS
		const classCounts: Record<string, number> = {};
		students.forEach((student) => {
			const level = student.level.toUpperCase();
			classCounts[level] = (classCounts[level] || 0) + 1;
		});

		// FEE - COLLETION - STATUS - CURRENT MONTH WITH SELECTED YEAR
		let currentMonthRevenue = 0;
		let studentsWithFeesPaid = 0;
		let totalMonthlyCapacity = 0;
		let yearlyRevenue = 0;
		let totalYearlyCapacity = 0;
		let studentsFullyPaid = 0;
		let studentsPartialPaid = 0;
		let studentsNoPaid = 0;

		students.forEach((student) => {
			totalMonthlyCapacity += student.fees;
			totalYearlyCapacity += student.fees * MONTHS_PER_YEAR;

			const paidMonths = student.feeTracking[selectedYear] || [];
			yearlyRevenue += paidMonths.length * student.fees;

			// MONTH - STATUS
			if (paidMonths.includes(currentMonth)) {
				studentsWithFeesPaid++;
				currentMonthRevenue += student.fees;
			}

			// YEARLY - PAYMENT - STATUS
			if (paidMonths.length === MONTHS_PER_YEAR) {
				studentsFullyPaid++;
			} else if (paidMonths.length > 0) {
				studentsPartialPaid++;
			} else {
				studentsNoPaid++;
			}
		});

		const currentMonthPaymentRate =
			totalStudents > 0
				? formatPercentage((studentsWithFeesPaid / totalStudents) * 100)
				: 0;

		const yearlyPaymentRate =
			totalYearlyCapacity > 0
				? formatPercentage((yearlyRevenue / totalYearlyCapacity) * 100)
				: 0;

		const outstandingThisMonth = totalMonthlyCapacity - currentMonthRevenue;
		const outstandingThisYear = totalYearlyCapacity - yearlyRevenue;

		// TOTAL - REVENUE
		let totalAnnualRevenue = 0;
		students.forEach((student) => {
			Object.entries(student.feeTracking).forEach(([, months]) => {
				totalAnnualRevenue += months.length * student.fees;
			});
		});

		// NEW STUDENTS
		const recentStudents = [...students]
			.sort((a, b) => {
				return b.joined - a.joined;
			})
			.slice(0, 5);

		return {
			totalStudents,
			classCounts,
			currentMonthRevenue,
			studentsWithFeesPaid,
			currentMonthPaymentRate,
			outstandingThisMonth,
			yearlyRevenue,
			yearlyPaymentRate,
			outstandingThisYear,
			studentsFullyPaid,
			studentsPartialPaid,
			studentsNoPaid,
			totalAnnualRevenue,
			recentStudents,
		};
	}, [students, selectedYear, currentMonth]);

	if (students.length === 0) {
		return (
			<EmptyState
				icon={TbLayoutDashboardFilled}
				title="NO ANALYSIS"
				message='"ADD STUDENT" in the menu to get started'
			/>
		);
	}

	return (
		<div className="text-white">
			{/* HEADER */}
			<div className="flex items-center justify-between mb-5">
				<div className="flex items-center gap-3">
					<TbLayoutDashboardFilled size={28} className="text-blue-400" />
					<h1 className="text-2xl font-bold">DASHBOARD</h1>
				</div>
				<div />
			</div>

			<div className="relative">
				{/* STATISTIC - GRID */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
					{/* YEAR - SCHEDULAR */}
					<div className="bg-linear-to-br from-black/60 to-zinc-500 rounded-xl p-3 border-2 border-zinc-500 relative overflow-hidden shadow-lg">
						<div className="relative flex items-center justify-between gap-3">
							<div>
								<span className="text-xs text-white/80 font-semibold uppercase tracking-wide">
									Year
								</span>
							</div>
							<div className="flex items-center gap-2">
								<button
									type="button"
									onClick={() => setSelectedYear(selectedYear - 1)}
									className="bg-blue-400 hover:bg-blue-800 text-white p-1.5 rounded-full transition"
									aria-label="Previous year"
								>
									<FiMinus size={16} />
								</button>
								<span className="text-white text-2xl font-bold min-w-20 text-center">
									{selectedYear}
								</span>
								<button
									type="button"
									onClick={() => setSelectedYear(selectedYear + 1)}
									className="bg-blue-400 hover:bg-blue-800 text-white p-1.5 rounded-full transition"
									aria-label="Next year"
								>
									<FiPlus size={16} />
								</button>
							</div>
						</div>
					</div>
					{/* TOTAL - STUDENTS - DETAILS */}
					<div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-xl p-4 border-2 border-blue-400/50 relative overflow-hidden">
						<div className="absolute top-0 right-5 opacity-10">
							<MdPeopleAlt size={120} />
						</div>
						<div className="relative">
							<div className="flex items-center justify-between mb-1">
								<span className="text-xs text-white/80 font-semibold uppercase tracking-wide">
									Total Students
								</span>
								<MdPeopleAlt size={24} className="text-white/80" />
							</div>
							<p className="text-4xl font-black mb-2">{stats.totalStudents}</p>
							<div className="flex items-center gap-2 text-xs">
								<div className="flex items-center gap-1">
									<div className="w-2 h-2 rounded-full bg-green-300"></div>
									<span className="text-white/90">
										{stats.studentsFullyPaid} Full
									</span>
								</div>
								<div className="flex items-center gap-1">
									<div className="w-2 h-2 rounded-full bg-yellow-300"></div>
									<span className="text-white/90">
										{stats.studentsPartialPaid} Partial
									</span>
								</div>
								<div className="flex items-center gap-1">
									<div className="w-2 h-2 rounded-full bg-red-300"></div>
									<span className="text-white/90">
										{stats.studentsNoPaid} None
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* OUTSTANDING - FEES */}
					<div className="bg-linear-to-br from-red-500/70 to-red-600/70 rounded-xl p-4 border-2 border-red-400/50 relative overflow-hidden">
						<div className="absolute top-5 right-5 opacity-10">
							<FaCalendarCheck size={100} />
						</div>
						<div className="relative">
							<div className="flex items-center justify-between mb-1">
								<span className="text-xs text-white/80 font-semibold uppercase tracking-wide">
									Outstanding {selectedYear}
								</span>
								<FaCalendarCheck size={20} className="text-white/80" />
							</div>
							<p className="text-3xl font-black mb-1">
								₹{stats.outstandingThisYear.toLocaleString()}
							</p>
							<div className="text-xs text-white/90 mb-2">
								{stats.studentsPartialPaid + stats.studentsNoPaid} students
								pending
							</div>
							<div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
								<div
									className="h-full bg-white/90 transition-all duration-500"
									style={{ width: `${100 - stats.yearlyPaymentRate}%` }}
								/>
							</div>
							<p className="text-[10px] text-white/70 mt-1">
								{100 - stats.yearlyPaymentRate}% uncollected
							</p>
						</div>
					</div>

					{/* YEARLY - REVENUE - STATUS */}
					<div className="bg-linear-to-br from-purple-500 to-purple-600 rounded-xl p-4 border-2 border-purple-400/50 relative overflow-hidden">
						<div className="absolute top-5 right-5 opacity-10">
							<IoStatsChart size={100} />
						</div>
						<div className="relative">
							<div className="flex items-center justify-between mb-1">
								<span className="text-xs text-white/80 font-semibold uppercase tracking-wide">
									{selectedYear} Revenue
								</span>
								<IoStatsChart size={20} className="text-white/80" />
							</div>
							<p className="text-3xl font-black mb-1">
								{formatCurrency(stats.yearlyRevenue)}
							</p>
							<div className="text-xs text-white/90 mb-2">
								{stats.yearlyPaymentRate}% of capacity
							</div>
							<div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
								<div
									className="h-full bg-white transition-all duration-500"
									style={{ width: `${stats.yearlyPaymentRate}%` }}
								/>
							</div>
							<p className="text-[10px] text-white/70 mt-1">
								{formatCurrency(stats.outstandingThisYear)} remaining
							</p>
						</div>
					</div>

					{/* ALL - TIME - REVENUE */}
					<div className="bg-linear-to-br from-orange-500 to-orange-600 rounded-xl p-4 border-2 border-orange-400/50 relative overflow-hidden">
						<div className="absolute top-5 right-5 opacity-10">
							<FaRupeeSign size={100} />
						</div>
						<div className="relative">
							<div className="flex items-center justify-between mb-1">
								<span className="text-xs text-white/80 font-semibold uppercase tracking-wide">
									All-Time Total
								</span>
								<FaRupeeSign size={20} className="text-white/80" />
							</div>
							<p className="text-3xl font-black mb-1">
								{formatCurrency(stats.totalAnnualRevenue)}
							</p>
							<div className="text-xs text-white/90 mb-2">
								Lifetime collections
							</div>
							<div className="flex items-center gap-3 text-xs mt-2">
								<div>
									<p className="text-white/70">Avg/Student</p>
									<p className="font-bold text-sm">
										₹
										{stats.totalStudents > 0
											? Math.round(
													stats.totalAnnualRevenue / stats.totalStudents,
												).toLocaleString()
											: 0}
									</p>
								</div>
								<div className="h-8 w-px bg-white/20"></div>
								<div>
									<p className="text-white/70">This Year</p>
									<p className="font-bold text-sm">
										{stats.totalAnnualRevenue > 0
											? Math.round(
													(stats.yearlyRevenue / stats.totalAnnualRevenue) *
														100,
												)
											: 0}
										%
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* LAYOUT */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{/* STUDENTS - BY - CLASS */}
					<div className="bg-black/50 border-2 border-blue-400/20 rounded-xl p-5">
						<h2 className="text-md font-bold mb-4 flex items-center gap-2">
							ALL STUDENTS
						</h2>
						<div className="space-y-3">
							{Object.entries(stats.classCounts)
								.sort((a, b) => {
									const order = [
										"1",
										"2",
										"3",
										"4",
										"5",
										"6",
										"7",
										"8",
										"9",
										"10",
										"11",
										"12",
										"UG",
										"PG",
									];
									return order.indexOf(a[0]) - order.indexOf(b[0]);
								})
								.map(([className, count]) => (
									<div
										key={className}
										className="flex items-center justify-between"
									>
										<div className="flex items-center gap-3">
											<span className="bg-purple-500 px-3 py-1 rounded-full text-xs font-semibold">
												CLASS {className}
											</span>
										</div>
										<div className="flex items-center gap-2">
											<div className="w-32 h-2 bg-black/50 rounded-full overflow-hidden">
												<div
													className="h-full bg-linear-to-br from-blue-400 to-purple-500"
													style={{
														width: `${(count / stats.totalStudents) * 100}%`,
													}}
												/>
											</div>
											<span className="text-lg font-bold w-8 text-right">
												{count}
											</span>
										</div>
									</div>
								))}
						</div>
					</div>

					{/* RECENT - STUDENTS  */}
					<div className="bg-black/50 border-2 border-blue-400/20 rounded-xl p-5">
						<h2 className="text-md font-bold mb-4 flex items-center gap-2">
							NEW REGISTRATIONS
						</h2>
						<div className="space-y-3">
							{stats.recentStudents.length > 0 ? (
								stats.recentStudents.map((student, index) => (
									<div
										key={student.id}
										className="bg-black/30 border border-white/10 rounded-lg p-3 hover:border-blue-400/50 transition"
									>
										<div className="flex items-center justify-between">
											<div>
												<p className="font-semibold">{student.name}</p>
												<p className="text-sm text-white/60">
													Class {student.level.toUpperCase()} • Joined{" "}
													{student.joined}
												</p>
											</div>
											<span className="text-xs text-white/40">
												#{index + 1}
											</span>
										</div>
									</div>
								))
							) : (
								<p className="text-white/60 text-center py-4">
									No recent students
								</p>
							)}
						</div>
					</div>
				</div>

				{/* MONTHLY - STATUS - FEE */}
				<div className="mt-6 bg-black/50 border-2 border-blue-400/20 rounded-xl p-5">
					<h2 className="text-md font-bold mb-4 flex items-center justify-between gap-2">
						FEE COLLECTION STATUS{" "}
						<span className="text-blue-400">{selectedYear}</span>
					</h2>
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead>
								<tr className="border-b border-white/20">
									<th className="text-left py-2 px-2 text-xs font-semibold text-orange-300">
										Student
									</th>
									<th className="text-left py-2 px-2 text-xs font-semibold text-orange-300">
										Class
									</th>
									<th className="text-center py-2 px-2 text-xs font-semibold text-orange-300">
										Months
									</th>
									<th className="text-right py-2 px-2 text-xs font-semibold text-orange-300">
										{CURRENCY_SYMBOL}/Month
									</th>
									<th className="text-right py-2 px-2 text-xs font-semibold text-orange-300">
										Total
									</th>
								</tr>
							</thead>
							<tbody>
								{students.map((student) => {
									const paidMonths = student.feeTracking[selectedYear] || [];
									const totalPaid = paidMonths.length * student.fees;
									return (
										<tr
											key={student.id}
											className="border-b border-white/10 hover:bg-white/5"
										>
											<td className="py-2 px-2 text-[12px]">{student.name}</td>
											<td className="py-2 px-2 text-[12px]">
												<span className="bg-purple-500 px-2 py-0.5 rounded-full text-xs">
													{student.level.toUpperCase()}
												</span>
											</td>
											<td className="py-2 px-2 text-[12px] text-center">
												<span
													className={`font-semibold ${paidMonths.length >= 6 ? "text-green-400" : paidMonths.length >= 3 ? "text-yellow-400" : "text-red-400"}`}
												>
													{paidMonths.length}/12
												</span>
											</td>
											<td className="py-2 px-2 text-[12px] text-right">
												₹{student.fees}
											</td>
											<td className="py-2 px-2 text-[12px] text-right font-semibold">
												₹{totalPaid}
											</td>
										</tr>
									);
								})}
							</tbody>
							<tfoot>
								<tr className="border-t-2 border-white/30">
									<td
										colSpan={4}
										className="py-3 px-2 text-sm font-bold text-right"
									>
										Total Revenue :
									</td>
									<td className="py-3 px-2 text-lg font-bold text-right text-green-400">
										₹
										{students.reduce(
											(sum, s) =>
												sum +
												(s.feeTracking[selectedYear] || []).length * s.fees,
											0,
										)}
									</td>
								</tr>
							</tfoot>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
