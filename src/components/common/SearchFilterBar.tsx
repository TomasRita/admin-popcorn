import React from "react";
import { Search, ChevronDown, ListFilter } from "lucide-react";
import { FilterOption } from "@/types/typeFavorites";

export interface SearchFilterBarProps<T extends string = string> {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  filterType: T;
  setFilterType: React.Dispatch<React.SetStateAction<T>>;
  filterOptions: FilterOption[];
  isFilterOpen: boolean;
  toggleFilterDropdown: () => void;
  closeFilterDropdown: () => void;
  filterLabel?: string;
  className?: string; // Optional custom styling
}

function FilterSearchBar<T extends string = string>({
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  filterOptions,
  isFilterOpen,
  toggleFilterDropdown,
  closeFilterDropdown,
  filterLabel = "Franchise Category",
  className = "",
}: SearchFilterBarProps<T>) {
  // Ensure "all" or first option is the default filterType if not set
  React.useEffect(() => {
    if (!filterType && filterOptions.length > 0) {
      setFilterType(filterOptions[0].value as T);
    }
  }, [filterType, setFilterType, filterOptions]);

  return (
    <div className={`w-full ${className}`}>
      {/* Container: Search Bar + Filter Button */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        {/* Search bar with icon */}
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Pesquisar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-white text-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1F628E] placeholder-gray-400 text-lg"
          />
        </div>

        {/* Filter Button + Dropdown */}
        <div className="relative">
          <button
            onClick={toggleFilterDropdown}
            className="flex items-center justify-between gap-2 cursor-pointer px-6 py-3 bg-[#1F628E] text-white rounded-full hover:bg-[#17425f] transition-colors"
          >
            <div className="flex justify-center items-center space-x-2">
              <ListFilter className="w-5 h-5" />
              <span className="font-medium text-lg">Filters</span>
            </div>
            <ChevronDown
              className={`w-5 h-5 transform transition-transform ${
                isFilterOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown options */}
          {isFilterOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-2">
              <p className="px-4 pb-2 text-sm text-gray-500 font-medium">
                {filterLabel}
              </p>
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setFilterType(option.value as T);
                    closeFilterDropdown();
                  }}
                  className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  <div className="mr-3 flex items-center justify-center">
                    <div className="h-4 w-4 border-2 border-[#1F628E] rounded-full flex items-center justify-center">
                      {filterType === option.value && (
                        <div className="bg-[#1F628E] w-2 h-2 rounded-full" />
                      )}
                    </div>
                  </div>
                  <span
                    className={`text-sm text-gray-700 ${
                      filterType === option.value ? "font-semibold" : ""
                    }`}
                  >
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FilterSearchBar;
