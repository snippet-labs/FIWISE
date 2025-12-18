import type { IconType } from "react-icons";

interface EmptyStateProps {
	icon: IconType;
	title: string;
	message: string;
	iconSize?: number;
}

const EmptyState: React.FC<EmptyStateProps> = ({
	icon: Icon,
	title,
	message,
	iconSize = 64,
}) => {
	return (
		<div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center px-4">
			<div className="mb-4 opacity-20">
				<Icon size={iconSize} />
			</div>
			<h3 className="text-xl font-semibold text-white/80 mb-2">{title}</h3>
			<p className="text-sm text-white/50 max-w-md">{message}</p>
		</div>
	);
};

export default EmptyState;
