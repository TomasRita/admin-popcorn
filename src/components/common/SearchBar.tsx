import React from "react";
import { Search, ChevronDown, ListFilter } from "lucide-react";
import { FilterOption } from "@/types/typeFavorites";

export interface SearchFilterBarProps<T extends string = string> {
  title: string;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  filterType: T;
  setFilterType: React.Dispatch<React.SetStateAction<T>>;
  filterOptions: FilterOption[];
  isFilterOpen: boolean;
  toggleFilterDropdown: () => void;
  closeFilterDropdown: () => void;
  filterLabel?: string;
}

function SearchFilterBar<T extends string = string>({
  title,
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType, // Certifique-se de desestruturar setFilterType!
  filterOptions,
  isFilterOpen,
  toggleFilterDropdown,
  closeFilterDropdown,
  filterLabel = "Tipo de Filtro",
}: SearchFilterBarProps<T>) {
  return (
    <div className="w-full mb-6 ">
      {/* Título principal */}
      <h1 className="text-2xl mb-4 text-gray-700">{title}</h1>

      {/* Container: Barra de pesquisa + Botão Filtrar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-end gap-4">
        {/* Barra de pesquisa com ícone */}
        <div className="relative w-full ">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 text-gray-700 focus:border-none rounded focus:outline-none focus:ring-1 focus:ring-[#1F628E]"
          />
        </div>

        {/* Botão "Filtrar" + Dropdown */}
        <div className="relative md:w-auto w-full">
          <button
            onClick={toggleFilterDropdown}
            className="flex items-center md:w-auto w-full justify-between md:justify-start gap-2 px-4 cursor-pointer py-3 bg-[#1F628E] text-white rounded hover:bg-[#17425f] transition-colors"
          >
            <div className="flex justify-center items-center space-x-2">
              <ListFilter className="w-4 h-4" />
              <span className="font-medium">Filtrar</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 transform transition-transform ${
                isFilterOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown de opções */}
          {isFilterOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded shadow z-10 py-2">
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
                  {/* Círculo de seleção */}
                  <div className="mr-3 flex items-center justify-center">
                    <div className="h-4 w-4 border-2 border-[#1F628E] rounded-full flex items-center justify-center">
                      {filterType === option.value && (
                        <div className="bg-[#1F628E] w-2 h-2 rounded-full" />
                      )}
                    </div>
                  </div>
                  <span
                    className={`text-sm dark:text-gray-500 ${
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

      {/* Linha divisória */}
      <div className="w-full border border-gray-100 my-6"></div>
    </div>
  );
}

export default SearchFilterBar;
