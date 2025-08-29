import { Menu, Search } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Define the type for startups
interface Startup {
  id: number;
  nome: string;
  dataEnvio: string;
  sector: string;
  valorMercado: string;
  porcentagem: string;
  status: string;
}

const dummyStartups: Startup[] = [
  {
    id: 1,
    nome: "Agrobiz",
    dataEnvio: "16:05 - 15/05/2025",
    sector: "Agricultura",
    valorMercado: "$14.000",
    porcentagem: "+20%",
    status: "Activa",
  },
  {
    id: 2,
    nome: "Alcaal",
    dataEnvio: "16:05 - 15/05/2025",
    sector: "Agricultura",
    valorMercado: "$14.000",
    porcentagem: "+20%",
    status: "Activa",
  },
  {
    id: 3,
    nome: "Fertiangola",
    dataEnvio: "16:05 - 15/05/2025",
    sector: "Agricultura",
    valorMercado: "$14.000",
    porcentagem: "+20%",
    status: "Activa",
  },
  {
    id: 4,
    nome: "Kima Kudi",
    dataEnvio: "16:05 - 15/05/2025",
    sector: "Agricultura",
    valorMercado: "$14.000",
    porcentagem: "+20%",
    status: "Activa",
  },
  {
    id: 5,
    nome: "Socamia",
    dataEnvio: "16:05 - 15/05/2025",
    sector: "Beleza",
    valorMercado: "$14.000",
    porcentagem: "+20%",
    status: "Activa",
  },
  {
    id: 6,
    nome: "Suelta",
    dataEnvio: "16:05 - 15/05/2025",
    sector: "Cloud e rede",
    valorMercado: "$14.000",
    porcentagem: "+20%",
    status: "Activa",
  },
];

const RecebidasPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleVerDetalhes = (nome: string) => {
    const url = location.pathname.includes("admin");
    const url2 = location.pathname.includes("analysis");
    if (url) {
      navigate(`/admin/startup/profile/${encodeURIComponent(nome)}`);
    } else if (url2) {
      navigate(`/analysis/startup/profile/${encodeURIComponent(nome)}`);
    } else {
      navigate(`/secretary/startup/profile/${encodeURIComponent(nome)}`);
    }
  };

  // Filter startups based on search term (searching by name)
  const filteredStartups = dummyStartups.filter((startup) =>
    startup.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-800 space-y-8 p-6">
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center bg-white dark:bg-gray-900 rounded-lg shadow px-4 py-3 w-full sm:w-auto">
          <Search className="text-gray-400 dark:text-gray-500 mr-2" size={20} />
          <input
            type="text"
            placeholder="Pesquisar startup..."
            className="bg-transparent outline-none text-sm w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="bg-white dark:bg-gray-900 p-3 rounded-lg shadow overflow-auto w-60 md:w-99 min-w-full h-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-medium">Empresas</h2>
            <p className="text-sm text-gray-500">
              Startups &gt;{" "}
              <span className="text-green-500">(+5) Registos desde ontem</span>
            </p>
          </div>
          <div className="flex items-center text-gray-500">
            <Menu size={16} className="mr-1" />
            Sector
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 p-3 overflow-auto w-60 md:w-99 min-w-full h-auto max-h-96">
          <table className="w-full text-left text-xs md:text-sm border-collapse">
            <thead className="bg-gray-100 border-b dark:bg-gray-900 dark:border-gray-800">
              <tr className="text-xs text-gray-500 dark:text-gray-400 uppercase border-b">
                <th className="py-2 px-4">Nome</th>
                <th className="py-2 px-4">Data de envio</th>
                <th className="py-2 px-4">Sector</th>
                <th className="py-2 px-4">Valor de mercado</th>
                <th className="py-2 px-4"></th>
                <th className="py-2 px-4"></th>
                <th className="py-2 px-4"> </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredStartups.length > 0 ? (
                filteredStartups.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b dark:border-gray-800 dark:text-gray-400 border-gray-100"
                  >
                    <td className="py-3 px-2 md:px-4 whitespace-nowrap flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center text-xs font-semibold text-gray-600 dark:text-gray-100">
                        {s.nome[0]}
                      </div>
                      <span className="font-medium">{s.nome}</span>
                    </td>
                    <td className="py-3 px-2 md:px-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                      {s.dataEnvio}
                    </td>
                    <td className="py-3 px-2 md:px-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                      {s.sector}
                    </td>
                    <td className="py-3 px-2 md:px-4 whitespace-nowrap text-gray-700 dark:text-gray-300 font-medium">
                      {s.valorMercado}
                    </td>
                    <td className="py-3 px-2 md:px-4 whitespace-nowrap text-green-500">
                      {s.porcentagem}
                    </td>
                    <td className="py-3 px-2 md:px-4 whitespace-nowrap">
                      <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded">
                        {s.status}
                      </span>
                    </td>
                    <td className="py-3 px-2 md:px-4 whitespace-nowrap text-xs">
                      <button
                        onClick={() => handleVerDetalhes(s.nome)}
                        className="text-gray-500 hover:text-gray-700 cursor-pointer"
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
                    className="py-3 px-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    Nenhuma startup encontrada
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

export default RecebidasPage;
