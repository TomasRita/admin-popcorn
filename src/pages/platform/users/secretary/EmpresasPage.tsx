import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronDown, ImageOff } from "lucide-react";

const registrosHoje = 5;

// Define the type for empresa
interface Empresa {
  id: number;
  nome: string;
  data: string;
  sector: string;
  market: string;
  formStatus: string;
  photoUrl: string | null;
}

const dummyEmpresas: Empresa[] = [
  {
    id: 1,
    nome: "Agrobiz",
    data: "16:05 – 15/05/2025",
    sector: "Agricultura",
    market: "$14,000",
    formStatus: "Preenchido",
    photoUrl: "https://example.com/agrobiz.jpg",
  },
  {
    id: 2,
    nome: "Arpla",
    data: "16:05 – 15/05/2025",
    sector: "Agricultura",
    market: "$14,000",
    formStatus: "Preenchido",
    photoUrl: null,
  },
  {
    id: 3,
    nome: "Fertiangola",
    data: "16:05 – 15/05/2025",
    sector: "Agricultura",
    market: "$14,000",
    formStatus: "Preenchido",
    photoUrl: "https://example.com/fertiangola.jpg",
  },
  {
    id: 4,
    nome: "Kima Kudi",
    data: "16:05 – 15/05/2025",
    sector: "Agricultura",
    market: "$14,000",
    formStatus: "Preenchido",
    photoUrl: null,
  },
  {
    id: 5,
    nome: "Socamia",
    data: "16:05 – 15/05/2025",
    sector: "Agricultura",
    market: "$14,000",
    formStatus: "Preenchido",
    photoUrl: "https://example.com/socamia.jpg",
  },
  {
    id: 6,
    nome: "Sodioa",
    data: "16:05 – 15/05/2025",
    sector: "Agricultura",
    market: "$14,000",
    formStatus: "Preenchido",
    photoUrl: null,
  },
];

const EmpresasPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterField, setFilterField] = useState<keyof Empresa>("nome"); // Use keyof Empresa
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleVerDetalhes = (nome: string) => {
    navigate(`/secretary/startup/profile/${encodeURIComponent(nome)}`);
  };

  // Filter options (only include fields that are strings for simplicity)
  const filterOptions: { value: keyof Empresa; label: string }[] = [
    { value: "nome", label: "Nome" },
    { value: "sector", label: "Setor" },
    { value: "formStatus", label: "Formulário" },
  ];

  // Filter companies based on search term and selected field
  const filteredEmpresas = dummyEmpresas.filter((empresa) =>
    empresa[filterField]
      ?.toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-800 space-y-8 p-6">
      <p className="text-sm text-green-500 mb-4 sm:mb-6">
        (+{registrosHoje}) registros do que ontem
      </p>
      <div className="flex flex-wrap items-center gap-4 mb-4 sm:mb-6">
        <div className="flex items-center bg-white dark:bg-gray-900 rounded-lg shadow px-4 py-3 w-full sm:w-auto">
          <Search className="text-gray-400 dark:text-gray-500 mr-2" size={20} />
          <input
            type="text"
            placeholder={`Pesquisar por ${filterOptions
              .find((opt) => opt.value === filterField)
              ?.label.toLowerCase()}...`}
            className="bg-transparent outline-none text-sm w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative w-full sm:w-auto">
          <button
            className="flex items-center bg-white dark:bg-gray-900 rounded-lg shadow px-4 py-3 w-full sm:w-auto"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {filterOptions.find((opt) => opt.value === filterField)?.label}{" "}
            <ChevronDown className="ml-2" size={20} />
          </button>
          {isDropdownOpen && (
            <div className="absolute mt-2 w-full bg-white dark:bg-gray-900 rounded-lg shadow-lg z-10">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    setFilterField(option.value);
                    setIsDropdownOpen(false);
                    setSearchTerm(""); // Clear search term when changing filter
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="bg-white dark:bg-gray-900 p-3 rounded-lg shadow overflow-auto w-60 md:w-99 min-w-full  h-auto">
        <table className="w-full text-left text-xs md:text-sm border-collapse">
          <thead className="bg-gray-100 border-b dark:bg-gray-900 dark:border-gray-800">
            <tr className="text-xs text-gray-500 dark:text-gray-400 uppercase border-b">
              <th className="py-2 px-2">Photo</th>
              <th className="py-2 px-2">Nome</th>
              <th className="py-2 px-2">Data de envio</th>
              <th className="py-2 px-2">Sector</th>
              <th className="py-2 px-2">Valor de mercado</th>
              <th className="py-2 px-2">Formulário</th>
              <th className="py-2 px-2">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredEmpresas.length > 0 ? (
              filteredEmpresas.map((e) => (
                <tr
                  key={e.id}
                  className="border-b dark:border-gray-800 dark:text-gray-400 border-gray-100"
                >
                  <td className="py-3 px-2 md:px-4 whitespace-nowrap">
                    {e.photoUrl ? (
                      <img
                        src={e.photoUrl}
                        alt={e.nome}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <ImageOff className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                    )}
                  </td>
                  <td className="py-3 px-2 md:px-4 whitespace-nowrap font-medium">
                    {e.nome}
                  </td>
                  <td className="py-3 px-2 md:px-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                    {e.data}
                  </td>
                  <td className="py-3 px-2 md:px-4 whitespace-nowrap">
                    {e.sector}
                  </td>
                  <td className="py-3 px-2 md:px-4 whitespace-nowrap font-semibold">
                    {e.market}
                  </td>
                  <td className="py-3 px-2 md:px-4 whitespace-nowrap">
                    {e.formStatus}
                  </td>
                  <td className="py-3 px-2 md:px-4 whitespace-nowrap flex items-center gap-2 sm:gap-4">
                    <button className="bg-teal-500 text-white cursor-pointer px-3 py-2 rounded-full hover:bg-teal-600">
                      Aceitar
                    </button>
                    <button
                      onClick={() => handleVerDetalhes(e.nome)}
                      className="text-gray-500 dark:text-gray-600 cursor-pointer hover:underline"
                    >
                      Ver detalhes
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="py-3 px-2 text-center text-gray-500 dark:text-gray-400"
                >
                  Nenhuma empresa encontrada
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmpresasPage;
