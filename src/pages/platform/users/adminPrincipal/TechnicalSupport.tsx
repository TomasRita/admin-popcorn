import { useState } from "react";
import SearchFilterBar from "@/components/common/SearchBar";
import { useDeleteContact, useGetContacts } from "@/hooks/DynamicApiHooks";
import { Contact } from "@/types/services";
import { formatDate, truncateText } from "@/lib/utils";
import { DataStatusHandler } from "@/components/ui/DataStatusHandler";

export default function TechnicalSupportScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  // Removemos o filtro por status; caso deseje filtrar por outros campos, mantenha filterType.
  const [filterType, setFilterType] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const toggleFilterDropdown = () => setIsFilterOpen(!isFilterOpen);
  const closeFilterDropdown = () => setIsFilterOpen(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Contact | null>(null);

  // Busca os contatos via API
  const { data, isLoading, error, refetch } = useGetContacts();
  const { mutateAsync: deleteContact } = useDeleteContact();

  const supportRequests: Contact[] = data?.result || [];

  // Opcional: podemos manter apenas o filtro "Todos" se não houver outros critérios
  const filterOptions = [{ value: "", label: "Todos" }];

  // Filtra os dados com base no searchTerm (por e-mail ou descrição)
  const filteredRequests = supportRequests.filter((req) => {
    const matchSearchTerm =
      req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchSearchTerm;
  });

  const handleOpenModal = (request: Contact) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleSaveResponse = (response: string) => {
    console.log("Resposta:", response);
    setTimeout(() => {
      if (selectedRequest) {
        handleDelete(selectedRequest.id_contact);
        setSelectedRequest(null);
      }
    }, 30000); // 30000 milissegundos = 30 segundos
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteContact({ id_contact: id });
      refetch();
    } catch (error) {
      console.error("Erro ao deletar contato:", error);
    }
  };

  return (
    <div className="p-6 w-full h-screen dark:bg-gray-800 dark:text-white text-gray-800">
      {/* Barra de pesquisa */}
      <SearchFilterBar
        title="Lista de contactos"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterType={filterType}
        setFilterType={setFilterType}
        filterOptions={filterOptions}
        isFilterOpen={isFilterOpen}
        toggleFilterDropdown={toggleFilterDropdown}
        closeFilterDropdown={closeFilterDropdown}
      />

      {/* Tabela de solicitações */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow overflow-auto w-full md:h-[55vh] h-auto">
        <DataStatusHandler
          isLoading={isLoading}
          error={error}
          onRetry={refetch}
        >
          <table className="w-full text-left text-xs md:text-sm border-collapse">
            <thead className="bg-gray-100 border-b dark:bg-gray-900 dark:border-gray-800">
              <tr>
                <th className="py-3 px-2 md:px-4 whitespace-nowrap">Id</th>
                <th className="py-3 px-2 md:px-4 whitespace-nowrap">Nome</th>
                <th className="py-3 px-2 md:px-4 whitespace-nowrap">E-mail</th>
                <th className="py-3 px-2 md:px-4 whitespace-nowrap min-w-[160px]">
                  Data e Horário
                </th>
                <th className="py-3 px-2 md:px-4 whitespace-nowrap">Assunto</th>
                <th className="py-3 px-2 md:px-4 whitespace-nowrap">Ação</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((item) => (
                <tr
                  key={item.id_contact}
                  className="border-b dark:border-gray-800 dark:text-gray-400 border-gray-100"
                >
                  <td className="py-2 px-2 md:px-4 md:py-3 whitespace-nowrap">
                    {item.id_contact}
                  </td>
                  <td className="py-2 px-2 md:px-4 md:py-3 whitespace-nowrap">
                    {item.name}
                  </td>
                  <td className="py-2 px-2 md:px-4 md:py-3 whitespace-nowrap">
                    {item.email}
                  </td>
                  <td className="py-2 px-2 md:px-4 md:py-3 whitespace-nowrap">
                    {formatDate(item.created_in)}
                  </td>
                  <td className="py-2 px-2 md:px-4 md:py-3">
                    {" "}
                    {truncateText(item.description, 25, "middle")}
                  </td>
                  <td className="py-2 px-2 md:px-4 md:py-3">
                    <button
                      onClick={() => handleOpenModal(item)}
                      className="px-3 py-1.5 md:px-4 md:py-2 bg-[#FF9E01] cursor-pointer text-white rounded hover:opacity-90 transition text-xs md:text-sm"
                    >
                      Visualizar
                    </button>
                  </td>
                </tr>
              ))}
              {filteredRequests.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-6 px-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    Nenhum resultado encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </DataStatusHandler>
      </div>
    </div>
  );
}
