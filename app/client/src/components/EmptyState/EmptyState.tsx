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
  iconSize = 80,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-[75vh] text-center px-4">
      <div className="mb-4 flex items-center justify-center">
        <Icon size={iconSize} className="text-blue-400" />
      </div>
      <h3 className="text-xl font-semibold text-white/80 mb-2">{title}</h3>
      <p className="text-sm text-white/50 max-w-md">{message}</p>
    </div>
  );
};

export default EmptyState;
