import { User, Building } from "lucide-react";

interface TabMenuProps {
  selectedTab: "Cadastrar Sector" | "Cadastrar Administrador de sector";
  setSelectedTab: (tab: "Cadastrar Sector" | "Cadastrar Administrador de sector") => void;
}

const ManageMenuBar: React.FC<TabMenuProps> = ({ selectedTab, setSelectedTab }) => {
  return (
    <div className="relative px-3 h-auto my-6">
      <div className="relative border-b dark:border-gray-700">
        <div className="flex flex-wrap gap-4 md:gap-6">
          <button
            onClick={() => setSelectedTab("Cadastrar Sector")}
            className="relative py-4 cursor-pointer"
          >
            <span
              className={`flex items-center gap-2 text-lg font-medium transition-colors ${
                selectedTab === "Cadastrar Sector"
                  ? "text-[#FF9E01] dark:text-[#FFB347]"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              <Building className="h-5 w-5" />
              Setores
            </span>
            {selectedTab === "Cadastrar Sector" && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#FF9E01] dark:bg-[#FFB347] animate-slide-in" />
            )}
          </button>

          <button
            onClick={() => setSelectedTab("Cadastrar Administrador de sector")}
            className="relative py-4 cursor-pointer"
          >
            <span
              className={`flex items-center gap-2 text-lg font-medium transition-colors ${
                selectedTab === "Cadastrar Administrador de sector"
                  ? "text-[#FF9E01] dark:text-[#FFB347]"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              <User className="h-5 w-5" />
              Administrador
            </span>
            {selectedTab === "Cadastrar Administrador de sector" && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#FF9E01] dark:bg-[#FFB347] animate-slide-in" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageMenuBar;
