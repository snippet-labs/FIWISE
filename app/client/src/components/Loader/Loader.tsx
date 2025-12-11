import { LineSpinner } from "ldrs/react";
import "ldrs/react/LineSpinner.css";

const Loader: React.FC = () => {
	return <LineSpinner size="30" stroke="3" speed="1" color="#60A5FA" />;
};

export default Loader;
