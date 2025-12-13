import { useMemo } from "react";
import { useStudentStore } from "../../../store/useStudentStore";
import { IoCalendarSharp, IoTimeSharp } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";
import { DAYS, GROUPS } from "../../../utils/Form.utils";

const Routine: React.FC = () => {
	const { students } = useStudentStore();

	// CURRENT - DAY - OF - THE - WEEK
	const currentDay = useMemo(() => {
		return DAYS[new Date().getDay()];
	}, []);

	// STUDENT - FILTER - ATTENDING - CLASS - TODAY
	const todaysStudents = useMemo(() => {
		return students.filter((student) => student.days.includes(currentDay));
	}, [students, currentDay]);

	// GROUP - STUDENTS - BY - CLASS
	const groupedStudents = useMemo(() => {
		todaysStudents.forEach((student) => {
			const level = student.level.toUpperCase();
			if (GROUPS[level]) {
				GROUPS[level].push(student);
			}
		});

		// EMPTY - CLASSES
		return Object.entries(GROUPS).filter(
			([_, students]) => students.length > 0,
		);
	}, [todaysStudents]);

	// DAY - NAME
	const getDayName = (day: string) => {
		const dayNames: Record<string, string> = {
			Sun: "Sunday",
			Mon: "Monday",
			Tue: "Tuesday",
			Wed: "Wednesday",
			Thu: "Thursday",
			Fri: "Friday",
			Sat: "Saturday",
		};
		return dayNames[day] || day;
	};

	if (students.length === 0) {
		return (
			<div className="mt-50 flex flex-col items-center justify-center py-20">
				<div className="relative">
					<div className="absolute inset-0 animate-ping">
						<IoCalendarSharp size={80} className="text-blue-400/20" />
					</div>
					<IoCalendarSharp size={80} className="text-blue-400" />
				</div>
				<div className="text-white font-bold text-xl mt-6">NO CLASSES</div>
				<p className="text-white/60 text-sm mt-2">
					"ADD STUDENT" in the menu to get started
				</p>
			</div>
		);
	}

	if (todaysStudents.length === 0) {
		return (
			<div>
				{/* HEADER */}
				<div className="mb-6">
					<div className="flex items-center gap-3 mb-5">
						<IoCalendarSharp size={28} className="text-blue-400" />
						<h1 className="text-2xl font-bold text-white">ROUTINE</h1>
					</div>

					{/* CURRENT - DAY - BANNER */}
					<div className="grid grid-cols-1 gap-3">
						<div className="grid sm:grid-cols-2 gap-3">
							{/* DAY - CARD */}
							<div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-xl p-4 border-2 border-blue-400/50">
								<div className="flex items-center gap-3">
									<div className="p-2 rounded-lg">
										<IoTimeSharp size={30} className="text-white" />
									</div>
									<div>
										<p className="text-white/70 text-xs uppercase">Today</p>
										<p className="text-white text-xl font-bold">
											{getDayName(currentDay)}
										</p>
									</div>
								</div>
							</div>
							{/* STUDENTS - CARD - COUNT */}
							<div className="bg-linear-to-br from-purple-500 to-purple-600 rounded-xl p-4 border-2 border-purple-400/50">
								<div className="flex items-center gap-3">
									<div className="p-2 rounded-lg">
										<MdPeopleAlt size={30} className="text-white" />
									</div>
									<div>
										<p className="text-white/70 text-xs uppercase">Students</p>
										<p className="text-white text-xl font-bold">
											{todaysStudents.length}
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* DATE - CARD */}
						<div className="bg-linear-to-br from-green-500 to-green-600 rounded-xl p-4 border-2 border-green-400/50 sm:col-span-2 lg:col-span-1">
							<div className="flex items-center gap-3">
								<div className="p-2 rounded-lg">
									<IoCalendarSharp size={30} className="text-white" />
								</div>
								<div>
									<p className="text-white/70 text-xs uppercase">Date</p>
									<p className="text-white text-sm font-bold">
										{new Date().toLocaleDateString("en-US", {
											month: "short",
											day: "numeric",
											year: "numeric",
										})}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* NO - SCHEDULED - CLASSES */}
				<div className="flex flex-col items-center justify-center py-20">
					<div className="relative">
						<IoCalendarSharp size={80} className="text-white/20" />
					</div>
					<div className="text-white font-bold text-xl mt-6">
						NO CLASSES TODAY
					</div>
					<p className="text-white/60 text-sm mt-2">
						No classes scheduled for {getDayName(currentDay)}
					</p>
				</div>
			</div>
		);
	}

	return (
		<div>
			{/* HEADER */}
			<div className="mb-6">
				<div className="flex items-center gap-3 mb-5">
					<IoCalendarSharp size={28} className="text-blue-400" />
					<h1 className="text-2xl font-bold text-white">ROUTINE</h1>
				</div>

				{/* COMPACT - STUDENT - CARD - GRID */}
				<div className="grid grid-cols-1 gap-3">
					<div className="grid grid-cols-2 gap-3">
						{/* DAY - CARD */}
						<div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-xl p-4 border-2 border-blue-400/50">
							<div className="flex items-center gap-3">
								<div className="p-2 rounded-lg">
									<IoTimeSharp size={30} className="text-white" />
								</div>
								<div>
									<p className="text-white/70 text-xs uppercase">Today</p>
									<p className="text-white text-xl font-bold">
										{getDayName(currentDay)}
									</p>
								</div>
							</div>
						</div>
						{/* STUDENTS - CARD - COUNT */}
						<div className="bg-linear-to-br from-purple-500 to-purple-600 rounded-xl p-4 border-2 border-purple-400/50">
							<div className="flex items-center gap-3">
								<div className="p-2 rounded-lg">
									<MdPeopleAlt size={30} className="text-white" />
								</div>
								<div>
									<p className="text-white/70 text-xs uppercase">Students</p>
									<p className="text-white text-xl font-bold">
										{todaysStudents.length}
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* DATE - CARD */}
					<div className="bg-linear-to-br from-green-500 to-green-600 rounded-xl p-4 border-2 border-green-400/50 sm:col-span-2 lg:col-span-1">
						<div className="flex items-center gap-3">
							<div className="p-2 rounded-lg">
								<IoCalendarSharp size={30} className="text-white" />
							</div>
							<div>
								<p className="text-white/70 text-xs uppercase">Date</p>
								<p className="text-white text-sm font-bold">
									{new Date().toLocaleDateString("en-US", {
										month: "short",
										day: "numeric",
										year: "numeric",
									})}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* STUDENTS - BY - CLASS - CATEGORIZATION */}
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
							<div className="flex-1 h-px Bg-linear-to-r from-white/20 to-transparent"></div>
							<span className="text-sm text-white/40 font-medium">
								<span className="text-blue-400">{classStudents.length}</span>{" "}
								{classStudents.length === 1 ? "student" : "students"}
							</span>
						</div>

						{/* STUDENTS - CARD - GRID */}
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
							{classStudents.map((student) => (
								<button
									type="button"
									key={student.id}
									className="group relative bg-black border-2 border-blue-400/30 rounded-xl p-4 text-left hover:border-blue-400 hover:shadow-lg hover:shadow-blue-400/20 hover:scale-105 TRANSITION cursor-pointer overflow-hidden"
								>
									{/* STUDENT - INFORMATION */}
									<div className="relative">
										{/* NAME */}
										<h3 className="text-white font-bold text-base mb-3 truncate">
											{student.name}
										</h3>

										{/* SUBJECTS */}
										<div>
											<div className="flex items-center gap-2 mb-2">
												<FaBookOpen size={12} className="text-blue-400" />
												<span className="text-white/60 text-xs uppercase">
													Subjects
												</span>
											</div>
											<div className="flex flex-wrap gap-1.5">
												{student.subjects.map((subject) => (
													<span
														key={subject}
														className="bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium border border-emerald-400/30"
													>
														{subject}
													</span>
												))}
											</div>
										</div>
									</div>
								</button>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Routine;
