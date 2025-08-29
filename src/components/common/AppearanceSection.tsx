import { useTheme } from "@/context/ThemeProvider";
import { DollarSign } from "lucide-react"; // Ícone financeiro da biblioteca Lucide

// Componente de ilustração do tema com tema de investimento
const ThemeIllustration = ({ dark = false }: { dark?: boolean }) => (
  <div
    className={`p-4 rounded-xl ${
      dark ? "bg-[#07253A]" : "bg-gray-50"
    } shadow-md`}
  >
    <div className="flex justify-between items-center mb-3">
      <DollarSign
        className={`w-6 h-6 ${dark ? "text-[#1F628E]" : "text-[#07253A]"}`}
      />
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-[#1F628E]" />
        <div className="w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-600" />
        <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-500" />
      </div>
    </div>
    <div
      className={`h-20 rounded-lg ${
        dark ? "bg-[#1F628E]/20" : "bg-white"
      } border ${dark ? "border-[#1F628E]/50" : "border-gray-200"}`}
    >
      <div className="p-3 space-y-2">
        <div
          className={`h-2 w-1/2 ${
            dark ? "bg-[#1F628E]" : "bg-[#07253A]/50"
          } rounded`}
        />
        <div
          className={`h-2 w-3/4 ${
            dark ? "bg-[#1F628E]/70" : "bg-[#07253A]/30"
          } rounded`}
        />
        <div
          className={`h-4 w-full ${
            dark ? "bg-[#1F628E]/50" : "bg-[#1F628E]/20"
          } rounded`}
        />
      </div>
    </div>
  </div>
);

// Componente principal da seção de aparência
export const AppearanceSection = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6  p-4   dark:bg-gray-900">
      {/* Seção de Configurações */}
      <div className="space-y-6">
        {/* Toggle de Temas */}
        <div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Opção Claro */}
            <div
              onClick={() => darkMode && toggleDarkMode()}
              className={`cursor-pointer p-4 sm:p-5 rounded-xl transition-all duration-300 ${
                !darkMode
                  ? "bg-white ring-2 ring-[#1F628E] shadow-lg"
                  : "bg-gray-100 dark:bg-[#1F628E]/10 hover:bg-gray-200 dark:hover:bg-[#1F628E]/20"
              }`}
            >
              <ThemeIllustration />
              <div
                className={`mt-3 text-center font-semibold text-sm sm:text-base ${
                  !darkMode
                    ? "text-[#07253A]"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                Tema Claro
              </div>
            </div>
            {/* Opção Escuro */}
            <div
              onClick={() => !darkMode && toggleDarkMode()}
              className={`cursor-pointer p-4 sm:p-5 rounded-xl transition-all duration-300 ${
                darkMode
                  ? "bg-[#07253A] ring-2 ring-[#1F628E] shadow-lg"
                  : "bg-gray-100 dark:bg-[#1F628E]/10 hover:bg-gray-200 dark:hover:bg-[#1F628E]/20"
              }`}
            >
              <ThemeIllustration dark />
              <div
                className={`mt-3 text-center font-semibold text-sm sm:text-base ${
                  darkMode
                    ? "text-gray-100"
                    : "text-[#07253A] dark:text-gray-300"
                }`}
              >
                Tema Escuro
              </div>
            </div>
          </div>
        </div>
        {/* Seletor de Cores */}
        <div className="p-4 sm:p-6 rounded-xl bg-white dark:bg-[#07253A]/50 shadow-lg border border-gray-200 dark:border-[#1F628E]/50">
          <h4 className="text-lg sm:text-xl font-semibold text-[#07253A] dark:text-gray-100 mb-4">
            Cor de Destaque
          </h4>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            {["#1F628E", "#07253A", "#3B82F6", "#059669"].map((color) => (
              <button
                key={color}
                style={{ backgroundColor: color }}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg shadow-md hover:shadow-xl transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#1F628E] focus:ring-offset-2"
                aria-label={`Selecionar cor ${color}`}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Preview do Tema */}
      <div className="flex justify-center items-center">
        <div className="relative w-full max-w-[16rem] sm:max-w-[20rem] h-48 sm:h-64">
          <div className="absolute inset-0 bg-[#1F628E]/10 rounded-2xl blur-2xl" />
          <div className="relative p-4 sm:p-6 bg-white dark:bg-[#07253A] rounded-2xl shadow-xl border border-gray-200 dark:border-[#1F628E]/50">
            <div className="flex justify-between items-center mb-4">
              <DollarSign
                className={`w-6 h-6 ${
                  darkMode ? "text-[#1F628E]" : "text-[#07253A]"
                }`}
              />
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#1F628E]" />
                <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600" />
                <div className="w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-500" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-2 w-full bg-gray-200 dark:bg-[#1F628E]/50 rounded-full" />
              <div className="h-2 w-2/3 bg-gray-200 dark:bg-[#1F628E]/50 rounded-full" />
              <div className="h-6 bg-[#1F628E]/30 dark:bg-[#1F628E]/50 rounded-lg mt-4 flex items-center justify-center">
                <span className="text-xs font-semibold text-[#07253A] dark:text-gray-100">
                  R$ 10.000,00
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
