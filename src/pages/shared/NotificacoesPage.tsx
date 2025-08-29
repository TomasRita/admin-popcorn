import {
  AlertCircle,
  Bell,
  ChevronDown,
  Mail,
  MoreVertical,
  Search,
} from "lucide-react";
import React, { JSX, useState } from "react";

// Define the type for notifications
interface Notificacao {
  id: number;
  tipo: string;
  icon: JSX.Element;
  conteudo: string;
  detalhe: string;
  data: string;
  acao: string;
}

const dummyNotificacoes: Notificacao[] = [
  {
    id: 1,
    tipo: "Correção",
    icon: <Bell />,
    conteudo: "Fertiangola enviou novos documentos",
    detalhe: "Verificar documentos",
    data: "16:05 – 15/05/2025",
    acao: "Abrir",
  },
  {
    id: 2,
    tipo: "Mensagem",
    icon: <Mail />,
    conteudo: "Comentário da equipe recebido",
    detalhe: "Marcar como lida",
    data: "16:05 – 15/05/2025",
    acao: "Abrir",
  },
  {
    id: 3,
    tipo: "Correção",
    icon: <Bell />,
    conteudo: "Fertiangola enviou um novo documento",
    detalhe: "Verificar documentos",
    data: "16:05 – 15/05/2025",
    acao: "Abrir",
  },
  {
    id: 4,
    tipo: "Correção",
    icon: <Bell />,
    conteudo: "KimaKudi enviou um novo documento",
    detalhe: "Verificar documentos",
    data: "16:05 – 15/05/2025",
    acao: "Abrir",
  },
  {
    id: 5,
    tipo: "Correção",
    icon: <Bell />,
    conteudo: "Agrobiz enviou novos documentos",
    detalhe: "Verificar documentos",
    data: "16:05 – 15/05/2025",
    acao: "Abrir",
  },
  {
    id: 6,
    tipo: "Alerta",
    icon: <AlertCircle />,
    conteudo: "Formulário submetido não completo",
    detalhe: "Não adicionou o perfil de investidor",
    data: "16:05 – 15/05/2025",
    acao: "Abrir",
  },
];

const NotificacoesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterField, setFilterField] = useState<keyof Notificacao>("tipo");
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [openActionDropdownId, setOpenActionDropdownId] = useState<
    number | null
  >(null);

  // Filter options
  const filterOptions: { value: keyof Notificacao; label: string }[] = [
    { value: "tipo", label: "Tipo" },
    { value: "conteudo", label: "Conteúdo" },
  ];

  // Filter notifications based on search term and selected field
  const filteredNotificacoes = dummyNotificacoes.filter((notificacao) =>
    notificacao[filterField]
      ?.toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Handle action dropdown actions
  const handleMarkAsRead = (id: number) => {
    console.log(`Marcar notificação ${id} como lida`);
    setOpenActionDropdownId(null);
  };

  const handleViewDocument = (id: number) => {
    console.log(`Visualizar documento da notificação ${id}`);
    setOpenActionDropdownId(null);
  };

  const handleMarkAllAsRead = () => {
    console.log("Marcar todas as notificações como lida");
    setOpenActionDropdownId(null);
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
            {filterOptions.find((opt) => opt.value === filterField)?.label}{" "}
            <ChevronDown className="ml-2" size={20} />
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
      <div className="bg-white dark:bg-gray-900 p-3  rounded-lg shadow overflow-auto w-60 md:w-99 min-w-full h-auto">
        <h2 className="text-lg font-medium mb-4">Caixa de entrada</h2>
        <table className="w-full text-left text-xs md:text-sm border-collapse">
          <thead className="bg-gray-100 border-b dark:bg-gray-900 dark:border-gray-800">
            <tr className="text-xs text-gray-500 dark:text-gray-400 uppercase border-b">
              <th className="py-2 px-4">Tipo</th>
              <th className="py-2 px-4">Conteúdo</th>
              <th className="py-2 px-4">Data de envio</th>
              <th className="py-2 px-4">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredNotificacoes.length > 0 ? (
              filteredNotificacoes.map((n) => (
                <tr
                  key={n.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="py-3 px-2 md:px-4 whitespace-nowrap flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    {React.cloneElement(n.icon, { size: 16 })}
                    <span className="capitalize">{n.tipo}</span>
                  </td>
                  <td className="py-3 px-2 md:px-4 whitespace-nowrap">
                    <span>{n.conteudo}</span>
                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">
                      {n.detalhe}
                    </div>
                  </td>
                  <td className="py-3 px-2 md:px-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                    {n.data}
                  </td>
                  <td className="py-3 px-2 md:px-4 whitespace-nowrap text-xs relative">
                    <button
                      className="text-gray-500 dark:text-gray-600 cursor-pointer hover:text-gray-700 dark:hover:text-gray-400"
                      onClick={() =>
                        setOpenActionDropdownId(
                          openActionDropdownId === n.id ? null : n.id
                        )
                      }
                    >
                      <MoreVertical size={20} />
                    </button>
                    {openActionDropdownId === n.id && (
                      <div className="absolute right-4 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg z-10">
                        <button
                          className="block w-full text-left px-4 cursor-pointer py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => handleMarkAsRead(n.id)}
                        >
                          Marcar como lida
                        </button>
                        {n.tipo === "Correção" && (
                          <button
                            className="block w-full text-left px-4 py-2 cursor-pointer text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => handleViewDocument(n.id)}
                          >
                            Visualizar documento
                          </button>
                        )}
                        <button
                          className="block w-full text-left px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={handleMarkAllAsRead}
                        >
                          Marcar todas como lida
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="py-3 px-4 text-center text-gray-500 dark:text-gray-400"
                >
                  Nenhuma notificação encontrada
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotificacoesPage;
