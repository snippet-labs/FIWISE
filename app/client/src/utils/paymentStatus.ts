import { PAYMENT_STATUS } from "../constants";

export type PaymentStatus = "full" | "partial" | "none";

export function getPaymentStatus(paidMonths: number): PaymentStatus {
	if (paidMonths === PAYMENT_STATUS.FULL) return "full";
	if (paidMonths >= PAYMENT_STATUS.PARTIAL_MIN) return "partial";
	return "none";
}

export function getPaymentStatusColor(status: PaymentStatus): string {
	const colors = {
		full: "text-green-400",
		partial: "text-yellow-400",
		none: "text-red-400",
	};
	return colors[status];
}

export function getPaymentStatusBgColor(status: PaymentStatus): string {
	const colors = {
		full: "bg-green-500/20",
		partial: "bg-yellow-500/20",
		none: "bg-red-500/20",
	};
	return colors[status];
}

export function getPaymentStatusBorderColor(status: PaymentStatus): string {
	const colors = {
		full: "border-green-400",
		partial: "border-yellow-400",
		none: "border-red-400",
	};
	return colors[status];
}

export function getPaymentStatusLabel(status: PaymentStatus): string {
	const labels = {
		full: "Fully Paid",
		partial: "Partially Paid",
		none: "Not Paid",
	};
	return labels[status];
}
