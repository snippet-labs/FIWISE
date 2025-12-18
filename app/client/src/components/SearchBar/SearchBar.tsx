import { MdClear } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import Loader from "../Loader/Loader";

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  isSearching?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onClear,
  placeholder = "Tokenized searching mechanism",
  isSearching = false,
}) => {
  const handleClear = () => {
    if (onClear) {
      onClear();
    } else {
      onChange("");
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex flex-col sm:flex-row w-full max-w-[1440px] gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="text-white bg-black font-bold w-full px-4 py-2 border-2 border-white/30
                               rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {value ? (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white
                                   transition active:scale-95"
              aria-label="Clear search"
            >
              <MdClear
                size={20}
                className="text-red-500 hover:cursor-pointer"
              />
            </button>
          ) : (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white
							   transition active:scale-95"
              aria-label="Clear search"
            >
              <FiSearch
                size={20}
                className="text-blue-400 hover:cursor-pointer"
              />
            </button>
          )}
        </div>

        <div className="mt-1 flex items-center justify-center">
          {isSearching && <Loader />}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
