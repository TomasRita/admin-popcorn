import { ChevronDown, FileText, Search } from "lucide-react";
import React, { JSX, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Define the type for documentos
interface Documento {
  id: number;
  empresa: string;
  icon: JSX.Element;
  conteudo: string;
  detalhe: string;
  data: string;
  quantidade: string;
}

const dummyDocumentos: Documento[] = [
  {
    id: 1,
    empresa: "Agrobiz",
    icon: <FileText />,
    conteudo: "Agrobiz enviou novos documentos",
    detalhe: "Verificar documentos",
    data: "16:05 – 15/05/2025",
    quantidade: "6 ficheiros",
  },
  {
    id: 2,
    empresa: "Alcaal",
    icon: <FileText />,
    conteudo: "Alcaal enviou novos documentos",
    detalhe: "Verificar documentos",
    data: "16:05 – 15/05/2025",
    quantidade: "2 ficheiros",
  },
  {
    id: 3,
    empresa: "Fertiangola",
    icon: <FileText />,
    conteudo: "Fertiangola enviou novos documentos",
    detalhe: "Verificar documentos",
    data: "16:05 – 15/05/2025",
    quantidade: "2 ficheiros",
  },
  {
    id: 4,
    empresa: "Kima Kudi",
    icon: <FileText />,
    conteudo: "Kima Kudi enviou novos documentos",
    detalhe: "Verificar documentos",
    data: "16:05 – 15/05/2025",
    quantidade: "2 ficheiros",
  },
  {
    id: 5,
    empresa: "Socamia",
    icon: <FileText />,
    conteudo: "Socamia enviou novos documentos",
    detalhe: "Verificar documentos",
    data: "16:05 – 15/05/2025",
    quantidade: "2 ficheiros",
  },
  {
    id: 6,
    empresa: "Suelta",
    icon: <FileText />,
    conteudo: "Suelta enviou novos documentos",
    detalhe: "Verificar documentos",
    data: "16:05 – 15/05/2025",
    quantidade: "2 ficheiros",
  },
  {
    id: 7,
    empresa: "Tesla",
    icon: <FileText />,
    conteudo: "Tesla enviou novos documentos",
    detalhe: "Verificar documentos",
    data: "16:05 – 15/05/2025",
    quantidade: "2 ficheiros",
  },
];

const DocumentosPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterField, setFilterField] = useState<keyof Documento>("empresa");
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Filter options
  const filterOptions: { value: keyof Documento; label: string }[] = [
    { value: "empresa", label: "Empresa" },
    { value: "conteudo", label: "Conteúdo" },
  ];

  // Filter documentos based on search term and selected field
  const filteredDocumentos = dummyDocumentos.filter((documento) =>
    documento[filterField]
      ?.toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleAbrir = (empresa: string) => {
    const isAdmin = location.pathname.includes("admin");
    if (isAdmin) {
      navigate(`/admin/documents/profile/${encodeURIComponent(empresa)}`);
    } else {
      navigate(`/secretary/documents/profile/${encodeURIComponent(empresa)}`);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-800 space-y-8 p-6">
      <div className="flex flex-wrap items-center gap-4 mb-6">
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
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-medium"> Empresas Startups </h2>
            <p className="text-sm text-gray-500">
              Startups{" "}
              <span className="text-green-500">
                (+3 Documentos adicionados)
              </span>
            </p>
          </div>
          <div className="text-gray-500">≡ Setor</div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-3 overflow-auto w-60 md:w-99 min-w-full h-auto max-h-96">
          <table className="w-full text-left text-xs md:text-sm border-collapse">
            <thead className="bg-gray-100 border-b dark:bg-gray-900 dark:border-gray-800">
              <tr className="text-xs text-gray-500 dark:text-gray-400 uppercase border-b">
                <th className="py-2 px-4">Empresa</th>
                <th className="py-2 px-4">Conteúdo</th>
                <th className="py-2 px-4">Quantidade</th>
                <th className="py-2 px-4">Data de envio</th>
                <th className="py-2 px-4"></th>
                <th className="py-2 px-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredDocumentos.length > 0 ? (
                filteredDocumentos.map((d) => (
                  <tr
                    key={d.id}
                    className="border-b dark:border-gray-800 dark:text-gray-400 border-gray-100"
                  >
                    <td className="py-3 px-2 md:px-4 whitespace-nowrap flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      {React.cloneElement(d.icon, { size: 16 })}
                      <span className="capitalize">{d.empresa}</span>
                    </td>
                    <td className="py-3 px-2 md:px-4 whitespace-nowrap">
                      <span>{d.conteudo}</span>
                    </td>
                    <td className="py-3 px-2 md:px-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                      {d.quantidade}
                    </td>
                    <td className="py-3 px-2 md:px-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                      {d.data}
                    </td>
                    <td className="py-3 px-2 md:px-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                      {d.detalhe}
                    </td>
                    <td className="py-3 px-2 md:px-4 whitespace-nowrap text-xs relative">
                      <button
                        className="text-gray-500 dark:text-gray-600 cursor-pointer hover:text-gray-700 dark:hover:text-gray-400"
                        onClick={() => handleAbrir(d.empresa)}
                      >
                        Abrir
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="py-3 px-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    Nenhum documento encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DocumentosPage;
