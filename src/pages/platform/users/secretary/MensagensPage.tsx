import ComponentsButton from "@/components/common/buttoncomponent";
import DynamicModal from "@/components/common/DynamicModal";
import ComponentextArea from "@/components/common/FormTextArea";
import {
  ChevronDown,
  MoreVertical,
  Search,
  Menu,
  CheckCircle,
  Trash2,
  Send,
  ArrowLeft,
  Mail,
  Edit,
} from "lucide-react";
import React, { useState } from "react";

// Define the type for messages
interface Message {
  id: number;
  name: string;
  text: string;
  unread: boolean;
}

// Define the type for chat messages
interface ChatMessage {
  id: number;
  sender: "user" | "other";
  text: string;
}

const dummyMessages: Message[] = [
  {
    id: 1,
    name: "Agrobiz",
    text: "Olá, Obrigado pelo trabalho contínuo na organização das startups recebidas. A partir desta semana, gostaríamos de reforçar ...",
    unread: true,
  },
  {
    id: 2,
    name: "Tis",
    text: "Olá, Obrigado pelo trabalho contínuo na organização das startups recebidas. A partir desta semana, gostaríamos de reforçar ...",
    unread: true,
  },
  {
    id: 3,
    name: "Kima Kudi",
    text: "Olá, Obrigado pelo trabalho contínuo na organização das startups recebidas. A partir desta semana, gostaríamos de reforçar ...",
    unread: true,
  },
  {
    id: 4,
    name: "Suelta",
    text: "Olá, Obrigado pelo trabalho contínuo na organização das startups recebidas. A partir desta semana, gostaríamos de reforçar ...",
    unread: true,
  },
  {
    id: 5,
    name: "Kima Kudi",
    text: "Olá, Obrigado pelo trabalho contínuo na organização das startups recebidas. A partir desta semana, gostaríamos de reforçar ...",
    unread: true,
  },
];

const dummyChatHistory: { [key: number]: ChatMessage[] } = {
  1: [
    {
      id: 1,
      sender: "other",
      text: 'Olá (Nome da Secretaria),\nObrigado pelo trabalho contínuo na organização das startups recebidas.\nA partir desta semana, gostaríamos de reforçar alguns pontos no processo:\n✔ Verificar se todos os documentos estão completos e com "Pendentes de Correção".\n✔ Atualizar o startup com data de submissão anterior a [data].\n✔ Usar os modelos de mensagens padrão dispoíveis na aba "Mensagens" ao notificar os\nfundadores.\nCaso encontre qualquer inconsistência nos formulários, por favor, registre uma nota interna\npara os analistas.\nQualquer dúvida, estamos disponíveis.\nAtenciosamente.',
    },
    { id: 2, sender: "user", text: "Olá!\nEsta bem." },
  ],
  // Add more dummy histories if needed
};

const MessageList: React.FC<{
  messages: Message[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isFilterDropdownOpen: boolean;
  setIsFilterDropdownOpen: (open: boolean) => void;
  openDropdown: number | null;
  setOpenDropdown: (id: number | null) => void;
  unreadCount: number;
  onSelectMessage: (id: number) => void;
  markAsRead: (id: number) => void;
  deleteMessage: (id: number) => void;
}> = ({
  messages,
  searchTerm,
  openDropdown,
  setOpenDropdown,
  unreadCount,
  onSelectMessage,
  markAsRead,
  deleteMessage,
}) => {
  const filteredMessages = messages.filter(
    (message) =>
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-900 p-3 rounded-lg shadow overflow-hidden h-[600px]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-medium">Caixa de mensagens</h2>
          <p className="text-sm text-green-500">
            {unreadCount > 0 ? `(+${unreadCount}) Novas mensagens` : ""}
          </p>
        </div>
        <div className="flex items-center text-gray-500">
          <Menu size={16} className="mr-1" />
          Recentes
        </div>
      </div>
      <div className="overflow-y-auto h-[calc(100%-4rem)] pr-2">
        <div className="space-y-4">
          {filteredMessages.length > 0 ? (
            filteredMessages.map((message) => (
              <div
                key={message.id}
                className="flex items-start justify-between border-b pb-4 last:border-b-0 cursor-pointer"
                onClick={() => onSelectMessage(message.id)}
              >
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center text-xs font-semibold text-gray-600 dark:text-gray-100">
                    {message.name[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div
                        className={`font-medium ${
                          message.unread
                            ? "text-gray-800 dark:text-white"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {message.name}
                      </div>
                      {message.unread && (
                        <div className="ml-2 w-2 h-2 bg-[#1F628E] rounded-full" />
                      )}
                    </div>
                    <div
                      className={`text-sm ${
                        message.unread
                          ? "text-gray-600 dark:text-gray-300"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenDropdown(
                        openDropdown === message.id ? null : message.id
                      );
                    }}
                  >
                    <MoreVertical
                      className="text-gray-500 cursor-pointer"
                      size={20}
                    />
                  </button>
                  {openDropdown === message.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg z-10">
                      <button
                        className="flex items-center cursor-pointer w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(message.id);
                        }}
                      >
                        <CheckCircle className="mr-2" size={16} />
                        Marcar como lida
                      </button>
                      <button
                        className="flex items-center w-full cursor-pointer text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteMessage(message.id);
                        }}
                      >
                        <Trash2 className="mr-2" size={16} />
                        Excluir
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400">
              <Mail
                size={48}
                className="mb-4 text-gray-300 dark:text-gray-600"
              />
              <p>Sem mensagens</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ChatView: React.FC<{
  selectedMessage: Message;
  chatHistory: ChatMessage[];
  chatInput: string;
  setChatInput: (input: string) => void;
  sendMessage: () => void;
  onBack: () => void;
  onDeleteChatMessage: (msgId: number) => void;
  onEditChatMessage: (msgId: number, newText: string) => void;
}> = ({
  selectedMessage,
  chatHistory,
  chatInput,
  setChatInput,
  sendMessage,
  onBack,
  onDeleteChatMessage,
  onEditChatMessage,
}) => {
  const [openChatDropdown, setOpenChatDropdown] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMessage, setEditingMessage] = useState<ChatMessage | null>(
    null
  );
  const [editedText, setEditedText] = useState<string>("");

  const startEditing = (msg: ChatMessage) => {
    setEditingMessage(msg);
    setEditedText(msg.text);
    setIsModalOpen(true);
    setOpenChatDropdown(null);
  };

  const saveEdit = () => {
    if (editedText.trim() && editingMessage) {
      onEditChatMessage(editingMessage.id, editedText);
    }
    setIsModalOpen(false);
    setEditingMessage(null);
    setEditedText("");
  };

  const cancelEdit = () => {
    setIsModalOpen(false);
    setEditingMessage(null);
    setEditedText("");
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-3 rounded-lg shadow overflow-auto h-[600px]">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft size={20} className="mr-2" />
          Voltar
        </button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center text-xs font-semibold text-gray-600 dark:text-gray-100">
            {selectedMessage.name[0]}
          </div>
          <div>
            <div className="font-medium text-gray-800 dark:text-white">
              {selectedMessage.name}
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4 mb-4 overflow-y-auto h-[calc(100%-8rem)]">
        {chatHistory.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            } items-start group`}
          >
            <div
              className={`max-w-2xl p-3 rounded-lg ${
                msg.sender === "user"
                  ? "bg-[#1F628E] text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
              }`}
            >
              {msg.text.split("\n").map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
            {msg.sender === "user" && (
              <div className="ml-2 relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenChatDropdown(
                      openChatDropdown === msg.id ? null : msg.id
                    );
                  }}
                >
                  <MoreVertical
                    className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer"
                    size={20}
                  />
                </button>
                {openChatDropdown === msg.id && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg z-10 overflow-hidden">
                    <button
                      className="flex items-center w-full text-left px-4 cursor-pointer py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => startEditing(msg)}
                    >
                      <Edit className="mr-2 " size={16} />
                      Editar
                    </button>
                    <button
                      className="flex items-center w-full text-left px-4 cursor-pointer py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => {
                        onDeleteChatMessage(msg.id);
                        setOpenChatDropdown(null);
                      }}
                    >
                      <Trash2 className="mr-2 " size={16} />
                      Excluir
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center border-t pt-4">
        <input
          type="text"
          placeholder="Escrever mensagem"
          className="flex-1 bg-transparent outline-none text-sm"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <button onClick={sendMessage}>
          <Send className="text-[#1F628E] cursor-pointer" size={20} />
        </button>
      </div>
      {isModalOpen && (
        <DynamicModal
          title="Editar Mensagem"
          isOpen={isModalOpen}
          onClose={() => cancelEdit()}
        >
          <ComponentextArea
            name="comment"
            label=""
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            rows={4}
          />
          <div className="flex flex-wrap-reverse justify-end mt-4 gap-2">
            <ComponentsButton
              variant="secondary"
              className="w-full md:w-auto"
              onClick={() => cancelEdit()}
            >
              Cancelar
            </ComponentsButton>
            <ComponentsButton
              variant="outline"
              onClick={saveEdit}
              className="w-full md:w-auto"
            >
              Salvar
            </ComponentsButton>
          </div>
        </DynamicModal>
      )}
    </div>
  );
};

const MensagensPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [selectedMessageId, setSelectedMessageId] = useState<number | null>(
    null
  );
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<{
    [key: number]: ChatMessage[];
  }>(dummyChatHistory);
  const [messages, setMessages] = useState<Message[]>(dummyMessages);

  const unreadCount = messages.filter((m) => m.unread).length;

  const markAsRead = (id: number) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, unread: false } : m))
    );
    setOpenDropdown(null);
  };

  const deleteMessage = (id: number) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    setOpenDropdown(null);
    if (selectedMessageId === id) {
      setSelectedMessageId(null);
    }
  };

  const sendMessage = () => {
    if (chatInput.trim() && selectedMessageId !== null) {
      const newMessage: ChatMessage = {
        id: (chatHistory[selectedMessageId]?.length || 0) + 1,
        sender: "user",
        text: chatInput,
      };
      setChatHistory((prev) => ({
        ...prev,
        [selectedMessageId]: [...(prev[selectedMessageId] || []), newMessage],
      }));
      setChatInput("");
    }
  };

  const deleteChatMessage = (msgId: number) => {
    if (selectedMessageId !== null) {
      setChatHistory((prev) => ({
        ...prev,
        [selectedMessageId]: (prev[selectedMessageId] || []).filter(
          (msg) => msg.id !== msgId
        ),
      }));
    }
  };

  const editChatMessage = (msgId: number, newText: string) => {
    if (selectedMessageId !== null) {
      setChatHistory((prev) => ({
        ...prev,
        [selectedMessageId]: (prev[selectedMessageId] || []).map((msg) =>
          msg.id === msgId ? { ...msg, text: newText } : msg
        ),
      }));
    }
  };

  const selectedMessage = messages.find((m) => m.id === selectedMessageId);
  const currentChat = selectedMessageId
    ? chatHistory[selectedMessageId] || []
    : [];

  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-800 space-y-8 p-6">
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center bg-white dark:bg-gray-900 rounded-lg shadow px-4 py-3 w-full sm:w-auto">
          <Search className="text-gray-400 dark:text-gray-500 mr-2" size={20} />
          <input
            type="text"
            placeholder="Pesquisar mensagem..."
            className="bg-transparent outline-none text-sm w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative w-full sm:w-auto">
          <button
            className="flex items-center bg-white dark:bg-gray-900 rounded-lg shadow px-4 py-3 text-gray-500"
            onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
          >
            Filtrar
            <ChevronDown className="ml-2" size={20} />
          </button>
          {isFilterDropdownOpen && (
            <div className="absolute mt-2 w-full bg-white dark:bg-gray-900 rounded-lg shadow-lg z-10">
              <button
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => {
                  // Filter logic for Recentes
                  setIsFilterDropdownOpen(false);
                }}
              >
                Recentes
              </button>
              {/* Add more filter options if needed */}
            </div>
          )}
        </div>
      </div>
      {selectedMessageId === null ? (
        <MessageList
          messages={messages}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isFilterDropdownOpen={isFilterDropdownOpen}
          setIsFilterDropdownOpen={setIsFilterDropdownOpen}
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
          unreadCount={unreadCount}
          onSelectMessage={setSelectedMessageId}
          markAsRead={markAsRead}
          deleteMessage={deleteMessage}
        />
      ) : (
        selectedMessage && (
          <ChatView
            selectedMessage={selectedMessage}
            chatHistory={currentChat}
            chatInput={chatInput}
            setChatInput={setChatInput}
            sendMessage={sendMessage}
            onBack={() => setSelectedMessageId(null)}
            onDeleteChatMessage={deleteChatMessage}
            onEditChatMessage={editChatMessage}
          />
        )
      )}
    </div>
  );
};

export default MensagensPage;
