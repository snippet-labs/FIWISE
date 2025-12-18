import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoCloseCircle } from "react-icons/io5";
import {
	studentFormSchema,
	type StudentFormData,
} from "../../../../validations/Form.validations";
import { useState } from "react";
import { DAYS_OF_WEEK, AVAILABLE_SUBJECTS } from "../../../../utils/Form.utils";
import { useStudentStore } from "../../../../store/useStudentStore";

interface StudentModalProps {
	onStudentFormModalClose: () => void;
}

const StudentModal: React.FC<StudentModalProps> = ({
	onStudentFormModalClose,
}) => {
	const { addStudent } = useStudentStore();
	const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
	const [selectedDays, setSelectedDays] = useState<string[]>([]);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm({
		resolver: zodResolver(studentFormSchema),
		mode: "onChange",
		reValidateMode: "onChange",
		defaultValues: {
			subjects: [] as string[],
			days: [] as string[],
		},
	});

	const handleToggleSubject = (subject: string) => {
		const newSubjects = selectedSubjects.includes(subject)
			? selectedSubjects.filter((s) => s !== subject)
			: [...selectedSubjects, subject];

		setSelectedSubjects(newSubjects);
		setValue("subjects", newSubjects, {
			shouldValidate: true,
			shouldDirty: true,
		});
	};

	const handleToggleDay = (day: string) => {
		const newDays = selectedDays.includes(day)
			? selectedDays.filter((d) => d !== day)
			: [...selectedDays, day];

		setSelectedDays(newDays);
		setValue("days", newDays, { shouldValidate: true, shouldDirty: true });
	};

	const handleNewStudentRegistration = (data: StudentFormData) => {
		try {
			const validatedData = studentFormSchema.parse({
				...data,
				subjects: selectedSubjects,
				days: selectedDays,
			});

			addStudent(validatedData);
			onStudentFormModalClose();

			reset();
			setSelectedSubjects([]);
			setSelectedDays([]);
		} catch (error) {
			console.error(`INTERNAL ERROR ${error}`);
		}
	};

	return (
		<div className="fixed inset-0 z-3000 flex items-center justify-center p-4 overflow-y-auto">
			<div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

			<motion.div
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.9, opacity: 0 }}
				className="relative z-5000 bg-black rounded-xl shadow-2xl p-4 w-full max-w-xl border-2 border-blue-400 my-4"
			>
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-lg font-bold text-white">NEW STUDENT RECORD</h2>
					<button
						type="button"
						onClick={onStudentFormModalClose}
						aria-label="close-modal"
						className="text-white hover:text-red-400 hover:cursor-pointer TRANSITION"
					>
						<IoCloseCircle size={22} />
					</button>
				</div>

				<form
					onSubmit={handleSubmit(handleNewStudentRegistration)}
					className="space-y-3"
				>
					{/* NAME */}
					<div>
						<label
							htmlFor="name"
							className="block text-xs font-medium text-white mb-1"
						>
							Student Name <span className="text-red-400">*</span>
						</label>
						<input
							id="name"
							type="text"
							{...register("name")}
							className="w-full px-3 py-1.5 text-sm bg-black/50 border border-white/30 rounded-lg text-white placeholder-white/50 focus:border-blue-400 focus:outline-none TRANSITION"
							placeholder="Enter student name"
						/>
						{errors.name && (
							<p className="mt-0.5 text-xs text-red-400">
								{errors.name.message}
							</p>
						)}
					</div>

					{/* LEVEL */}
					<div>
						<label
							htmlFor="level"
							className="block text-xs font-medium text-white mb-1"
						>
							Level/Class <span className="text-red-400">*</span>
						</label>
						<input
							id="level"
							type="text"
							{...register("level")}
							className="w-full px-3 py-1.5 text-sm bg-black/50 border border-white/30 rounded-lg text-white placeholder-white/50 focus:border-blue-400 focus:outline-none TRANSITION"
							placeholder="e.g., 10, 12, ug, pg"
						/>
						{errors.level && (
							<p className="mt-0.5 text-xs text-red-400">
								{errors.level.message}
							</p>
						)}
					</div>

					{/* YEAR & JOINED DATE ROW */}
					<div className="grid grid-cols-2 gap-3">
						<div>
							<label
								htmlFor="year"
								className="block text-xs font-medium text-white mb-1"
							>
								Year <span className="text-red-400">*</span>
							</label>
							<input
								id="year"
								type="number"
								{...register("year", { valueAsNumber: true })}
								className="w-full px-3 py-1.5 text-sm bg-black/50 border border-white/30 rounded-lg text-white placeholder-white/50 focus:border-blue-400 focus:outline-none TRANSITION"
								placeholder="2024"
							/>
							{errors.year && (
								<p className="mt-0.5 text-xs text-red-400">
									{errors.year.message}
								</p>
							)}
						</div>

						<div>
							<label
								htmlFor="joined"
								className="block text-xs font-medium text-white mb-1"
							>
								Month <span className="text-red-400">*</span>
							</label>
							<input
								id="joined"
								type="number"
								min="1"
								max="12"
								{...register("joined", { valueAsNumber: true })}
								className="w-full px-3 py-1.5 text-sm bg-black/50 border border-white/30 rounded-lg text-white placeholder-white/50 focus:border-blue-400 focus:outline-none TRANSITION"
								placeholder="1-12"
							/>
							{errors.joined && (
								<p className="mt-0.5 text-xs text-red-400">
									{errors.joined.message}
								</p>
							)}
						</div>
					</div>

					{/* SUBJECTS */}
					<div>
						<label
							htmlFor="subjects"
							className="block text-xs font-medium text-white mb-1"
						>
							Subjects <span className="text-red-400">*</span>
						</label>
						<div className="flex flex-wrap gap-1.5">
							{AVAILABLE_SUBJECTS.map((subject) => (
								<button
									key={subject}
									type="button"
									onClick={() => handleToggleSubject(subject)}
									className={`px-2.5 py-1 rounded-md font-medium text-xs TRANSITION ${
										selectedSubjects.includes(subject)
											? "bg-emerald-500 text-white border border-emerald-400"
											: "bg-black/50 text-white/60 border border-white/30 hover:border-emerald-400"
									}`}
								>
									{subject}
								</button>
							))}
						</div>
						{errors.subjects && (
							<p className="mt-0.5 text-xs text-red-400">
								{errors.subjects.message as string}
							</p>
						)}
					</div>

					{/* DAYS */}
					<div>
						<label
							htmlFor="days-attending"
							className="block text-xs font-medium text-white mb-1"
						>
							Days Attending <span className="text-red-400">*</span>
						</label>
						<div className="flex flex-wrap gap-1.5">
							{DAYS_OF_WEEK.map((day) => (
								<button
									key={day}
									type="button"
									onClick={() => handleToggleDay(day)}
									className={`px-2.5 py-1 rounded-md font-medium text-xs TRANSITION ${
										selectedDays.includes(day)
											? "bg-blue-500 text-white border border-blue-400"
											: "bg-black/50 text-white/60 border border-white/30 hover:border-blue-400"
									}`}
								>
									{day}
								</button>
							))}
						</div>
						{errors.days && (
							<p className="mt-0.5 text-xs text-red-400">
								{errors.days.message as string}
							</p>
						)}
					</div>

					{/* FEES */}
					<div>
						<label
							htmlFor="fees"
							className="block text-xs font-medium text-white mb-1"
						>
							Monthly Fees (₹) <span className="text-red-400">*</span>
						</label>
						<input
							id="fees"
							type="number"
							step="0.01"
							{...register("fees", { valueAsNumber: true })}
							className="w-full px-3 py-1.5 text-sm bg-black/50 border border-white/30 rounded-lg text-white placeholder-white/50 focus:border-blue-400 focus:outline-none TRANSITION"
							placeholder="Enter monthly fees"
						/>
						{errors.fees && (
							<p className="mt-0.5 text-xs text-red-400">
								{errors.fees.message}
							</p>
						)}
					</div>

					{/* SUBMISSION */}
					<div className="flex gap-2 pt-2">
						<button
							type="submit"
							className="flex-1 px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold hover:cursor-pointer TRANSITION"
						>
							ADD
						</button>
					</div>
				</form>
			</motion.div>
		</div>
	);
};

export default StudentModal;
