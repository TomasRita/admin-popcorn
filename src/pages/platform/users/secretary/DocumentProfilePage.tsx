import { ChevronDown, Search, ArrowLeft, File } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Define the type for individual documents
interface IndividualDocumento {
  id: number;
  nome: string;
  tipo: string;
  data: string;
  tamanho: string;
}

const getDocumentsForEmpresa = (_empresa: string): IndividualDocumento[] => {
  return [];
};

const DocumentProfilePage: React.FC = () => {
  const { empresa } = useParams<{ empresa: string }>();
  const decodedEmpresa = decodeURIComponent(empresa || "");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterField, setFilterField] = useState<"nome" | "tipo">("nome");
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  const navigate = useNavigate();

  // Filter options
  const filterOptions: { value: "nome" | "tipo"; label: string }[] = [
    { value: "nome", label: "Nome" },
    { value: "tipo", label: "Tipo" },
  ];

  const documents = getDocumentsForEmpresa(decodedEmpresa);

  // Filter documents based on search term and selected field
  const filteredDocuments = documents.filter((doc) =>
    doc[filterField].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-800 space-y-8 p-6">
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center bg-white dark:bg-gray-900 rounded-lg shadow px-4 py-3 w-full sm:w-auto">
          <Search className="text-gray-400 dark:text-gray-500 mr-2" size={20} />
          <input
            type="text"
            placeholder="Pesquisar consulta..."
            className="bg-transparent outline-none text-sm w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative w-full sm:w-auto">
          <button
            className="flex items-center bg-white dark:bg-gray-900 rounded-lg shadow px-4 py-3"
            onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
          >
            Filtrar <ChevronDown className="ml-2" size={20} />
          </button>
          {isFilterDropdownOpen && (
            <div className="absolute mt-2 w-full bg-white dark:bg-gray-900 rounded-lg shadow-lg z-10">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    setFilterField(option.value);
                    setIsFilterDropdownOpen(false);
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
      <div className="bg-white dark:bg-gray-900 p-3 rounded-lg shadow overflow-auto min-w-full h-auto">
        <button
          onClick={handleBack}
          className="flex items-center my-4 cursor-pointer text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft size={20} className="mr-2" />
          Voltar
        </button>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center text-white font-bold">
            KK {/* Placeholder for logo */}
          </div>
          <h2 className="text-lg font-medium">{decodedEmpresa}</h2>
        </div>
        <p className="text-green-500 text-sm mb-8">
          Todos documentos adicionados
        </p>
        {filteredDocuments.length > 0 ? (
          <div className="bg-white dark:bg-gray-900 p-3 overflow-auto w-60 md:w-99 min-w-full h-auto max-h-96">
            <table className="w-full text-left text-xs md:text-sm border-collapse">
              <thead className="bg-gray-100 border-b dark:bg-gray-900 dark:border-gray-800">
                <tr className="text-xs text-gray-500 dark:text-gray-400 uppercase border-b">
                  <th className="py-2 px-4">Nome</th>
                  <th className="py-2 px-4">Tipo</th>
                  <th className="py-2 px-4">Data</th>
                  <th className="py-2 px-4">Tamanho</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredDocuments.map((doc) => (
                  <tr
                    key={doc.id}
                    className="border-b dark:border-gray-800 dark:text-gray-400 border-gray-100"
                  >
                    <td className="py-3 px-4">{doc.nome}</td>
                    <td className="py-3 px-4">{doc.tipo}</td>
                    <td className="py-3 px-4">{doc.data}</td>
                    <td className="py-3 px-4">{doc.tamanho}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <File className="text-gray-300 mb-4" size={64} />
            <p className="text-gray-500">Nenhum documento adicionado</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentProfilePage;
