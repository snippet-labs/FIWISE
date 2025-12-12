import { motion } from "motion/react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";
import { useStudentStore } from "../../../store/useStudentStore";
import { useInvoiceStore } from "../../../store/useInvoiceStore";

interface ConfirmationTypes {
	title: string;
	onDeleteConfirmationModalClose: () => void;
	targetSelection: string;
}

const Confirmation: React.FC<ConfirmationTypes> = ({
	title,
	targetSelection,
	onDeleteConfirmationModalClose,
}) => {
	const { deleteStudent } = useStudentStore();
	const { deleteInvoice } = useInvoiceStore();

	const handleDeletion = (id: string) => {
		deleteStudent(id);
		deleteInvoice(id);
		onDeleteConfirmationModalClose();
	};

	return (
		<div className="fixed inset-0 z-3000 flex items-center justify-center p-4">
			<div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

			<motion.div
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				className="relative z-5000 bg-black rounded-2xl shadow-2xl p-3 w-full max-w-lg border-2 border-blue-400"
			>
				<div className="flex items-center justify-between">
					<div className="text-white">{title}</div>
					<div className="flex gap-2">
						<button
							type="button"
							aria-label="confirmation-modal-check-button"
							onClick={() => handleDeletion(targetSelection as string)}
						>
							<IoIosCheckmarkCircle
								size={30}
								className="text-red-500/70 TRANSITION"
							/>
						</button>
						<button
							type="button"
							aria-label="confirmation-modal-close-button"
							onClick={onDeleteConfirmationModalClose}
						>
							<IoCloseCircle size={30} className=" text-green-500 TRANSITION" />
						</button>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default Confirmation;

/**
 * @description This confirmation modal should be dynamic for both edit confirmation and delete confirmation of the application.
 */
