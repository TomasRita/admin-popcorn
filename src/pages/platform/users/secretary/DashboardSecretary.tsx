import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  ArrowUpRight,
  BookOpen,
  Users,
  Clock,
  Plus,
  MoreVertical,
  Search,
  ChevronDown,
  X,
  Trash2,
  CheckCircle,
} from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import ComponentsButton from "@/components/common/buttoncomponent";
import ComponentInput from "@/components/common/FormInput";
import { truncateText } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Define the type for table rows
interface TableRow {
  name: string;
  content: string;
  sent: string;
  sector: string;
}

// Define the allowed filter field keys
type FilterField = keyof TableRow;

// Modal component
const DynamicModal: React.FC<{
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        onClose={onClose}
        className="fixed inset-0 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
      >
        <div
          className="absolute inset-0 bg-black/30 transition-opacity"
          onClick={onClose}
        />
        <div className="bg-white dark:bg-gray-900 py-6 px-2 rounded-lg shadow-lg w-full max-w-xl relative transform transition-all z-50">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1 rounded-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          </button>
          <div className="flex justify-between items-center mb-4 px-2">
            <h2 className="text-xl my-6 px-4 text-gray-700 dark:text-white">
              {title}
            </h2>
          </div>
          <div className="mb-4 px-4">{children}</div>
          <div className="flex justify-end"></div>
        </div>
      </Dialog>
    </Transition>
  );
};

const Dashboard: React.FC = () => {
  const { darkMode } = useTheme?.() ?? { darkMode: false };

  const cards = [
    {
      label: "Total Startups",
      value: "32,984",
      icon: <ArrowUpRight />,
      diff: "+23%",
    },
    { label: "Cliques", value: "2,42m", icon: <BookOpen />, diff: "+8%" },
    {
      label: "Investimentos",
      value: "2.400 kz",
      icon: <Users />,
      diff: "+12%",
    },
    { label: "Ações", value: "320", icon: <Clock />, diff: "+1%" },
  ];

  const tableRows: TableRow[] = new Array(9).fill(0).map((_, i) => ({
    name:
      [
        "Agrobiz",
        "Alcaal",
        "Fertiangola",
        "Kima kudi",
        "Socamia",
        "Suelta",
        "Tesla",
        "Telekom",
        "Outra",
      ][i] || `Empresa ${i}`,
    content: `${i % 2 === 0 ? 6 : 2} ficheiros`,
    sent: "16:05 - 15/05/2025",
    sector: ["Agricultura", "Beleza", "Cloud e rede"][i % 3],
  }));

  const [searchTerm, setSearchTerm] = useState("");
  const [filterField, setFilterField] = useState<FilterField>("name");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filterOptions: { value: FilterField; label: string }[] = [
    { value: "name", label: "Nome" },
    { value: "content", label: "Conteúdo" },
    { value: "sent", label: "Data de Envio" },
    { value: "sector", label: "Sector" },
  ];

  const filteredRows = tableRows.filter((row) =>
    row[filterField].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [tasks, setTasks] = useState<{ description: string }[]>([
    { description: 'Verificar Documentação da Startup "AgroPay"' },
    { description: "Atualizar Status de Startups Submetidas" },
    { description: 'Agendar Reunião Fundador da Startup "EduChain"' },
  ]);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [newTask, setNewTask] = useState("");

  const [messages, setMessages] = useState<
    { name: string; text: string; unread: boolean }[]
  >([
    {
      name: "Agrobiz",
      text: "Olá, Obrigado pelo trabalho contínuo na organização...",
      unread: true,
    },
    {
      name: "Tis",
      text: "Olá, Obrigado pelo trabalho contínuo na organização...",
      unread: true,
    },
  ]);

  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const unreadCount = messages.filter((m) => m.unread).length;

  const markAsRead = (index: number) => {
    const newMessages = [...messages];
    newMessages[index].unread = false;
    setMessages(newMessages);
  };

  const deleteMessage = (index: number) => {
    const newMessages = messages.filter((_, i) => i !== index);
    setMessages(newMessages);
  };
  const activeUsersMetrics = [
    {
      label: "Usuários",
      value: 32984,
      progress: 75,
    },
    {
      label: "Cliques",
      value: 2420000,
      progress: 60,
    },
    {
      label: "Investimentos",
      value: 2400,
      unit: "kz",
      progress: 85,
    },
    {
      label: "Ações",
      value: 320,
      progress: 45,
    },
  ];
  const AnimatedNumber: React.FC<{
    value: number;
    duration?: number;
  }> = ({ value, duration = 1.5 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const end = value;
      const timer = setInterval(() => {
        start += Math.ceil(end / (duration * 60));
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }, [value, duration]);

    return <span>{count.toLocaleString()}</span>;
  };
  const chartData = {
    labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],
    datasets: [
      {
        label: "Visitas",
        data: [120, 240, 180, 300, 420, 360, 280],
        barThickness: 10,
        borderRadius: 6,
        backgroundColor: darkMode
          ? "rgba(255,255,255,0.95)"
          : "rgba(255,255,255,0.95)",
        borderColor: "rgba(255,255,255,0.95)",
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="min-h-screen dark:bg-gray-800 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top metric cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {cards.map((c) => (
            <div
              key={c.label}
              className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100/60 dark:border-gray-700/50 flex items-center justify-between"
            >
              <div>
                <p className="text-xs text-gray-400">{c.label}</p>
                <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">
                  {c.value}
                </h3>
                <p
                  className={`text-xs mt-2 ${
                    c.diff.startsWith("+") ? "text-emerald-500" : "text-red-500"
                  }`}
                >
                  {c.diff} desde ontem
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                {React.cloneElement(c.icon, {
                  size: 20,
                  className: "text-emerald-600 dark:text-emerald-200",
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Main grid: table + right column */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Table area */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100/60 dark:border-gray-700/50">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                  Empresas
                </h2>
                <p className="text-sm text-emerald-500">
                  (+3) Documentos adicionados
                </p>
              </div>
              <div className="text-sm text-gray-400">Sector</div>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-4 sm:mb-6">
              <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg shadow px-4 py-3 w-full sm:w-auto">
                <Search
                  className="text-gray-400 dark:text-gray-500 mr-2"
                  size={20}
                />
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
                  className="flex items-center bg-white dark:bg-gray-800 rounded-lg shadow px-4 py-3 w-full sm:w-auto"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {
                    filterOptions.find((opt) => opt.value === filterField)
                      ?.label
                  }{" "}
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
                          setSearchTerm("");
                        }}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-3 overflow-auto w-60 md:w-99 min-w-full h-auto max-h-96">
              <table className="w-full text-left text-xs md:text-sm border-collapse">
                <thead className="bg-gray-100 border-b dark:bg-gray-900 dark:border-gray-800">
                  <tr className="text-xs text-gray-400 uppercase">
                    <th className="py-3">Tipo</th>
                    <th className="py-3">Conteúdo</th>
                    <th className="py-3">Data de envio</th>
                    <th className="py-3">Sector</th>
                    <th className="py-3">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredRows.map((r, idx) => (
                    <tr
                      key={idx + 1}
                      className="border-b dark:border-gray-800 dark:text-gray-400 border-gray-100"
                    >
                      <td className="py-3 px-2 md:px-4 whitespace-nowrap flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center text-xs font-semibold text-gray-600 dark:text-gray-100">
                          {r.name[0]}
                        </div>
                        <div>
                          <div className="font-medium text-gray-600 dark:text-white">
                            {r.name}
                          </div>
                          <div className="text-xs text-gray-400">
                            Fertiangola enviou novos documentos
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2 md:px-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                        {r.content}
                      </td>
                      <td className="py-3 px-2 md:px-4 whitespace-nowrap text-gray-600">
                        {r.sent}
                      </td>
                      <td className="py-3 px-2 md:px-4 whitespace-nowrap text-gray-600">
                        {r.sector}
                      </td>
                      <td className="py-3 px-2 md:px-4 whitespace-nowrap text-gray-600">
                        <div className="flex items-center gap-4 text-sm">
                          <button className="text-gray-600">
                            Verificar documentos
                          </button>
                          <button className="text-gray-400 cursor-pointer">
                            Abrir
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100/60 dark:border-gray-700/50">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-slate-800 dark:text-white">
                  Minhas Tarefas
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">
                    ({tasks.length.toString().padStart(2, "0")})
                  </span>
                  <button
                    onClick={() => setIsTaskModalOpen(true)}
                    className="cursor-pointer "
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
              <ul className="text-sm space-y-3">
                {tasks.map((task, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-emerald-200 rounded-full" />
                      <div className="text-slate-700 dark:text-gray-200">
                        {truncateText(task.description, 25, "end")}
                      </div>
                    </div>
                    <button className="text-slate-700 dark:text-white">
                      Ver detalhes
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100/60 dark:border-gray-700/50">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-slate-800 dark:text-white">
                  Caixa de mensagens
                </h3>
                <span className="text-xs text-emerald-500">
                  {unreadCount > 0 ? `(+${unreadCount}) Novas` : ""}
                </span>
              </div>
              <ul className="space-y-3 text-sm">
                {messages.map((message, index) => (
                  <li key={index} className="flex items-start gap-3 relative">
                    <div className="w-7 h-7 rounded bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs">
                      {message.name[0]}
                    </div>
                    <div className="flex-1">
                      <div
                        className={`font-medium ${
                          message.unread
                            ? "text-slate-800 dark:text-white"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {message.name}
                      </div>
                      <div
                        className={`text-xs ${
                          message.unread ? "text-gray-400" : "text-gray-300"
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === index ? null : index)
                      }
                    >
                      <MoreVertical
                        className="text-gray-300 cursor-pointer"
                        size={16}
                      />
                    </button>
                    <AnimatePresence>
                      {openDropdown === index && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-0 top-8 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg z-10"
                        >
                          <button
                            className="flex items-center w-full text-left cursor-pointer px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => {
                              markAsRead(index);
                              setOpenDropdown(null);
                            }}
                          >
                            <CheckCircle className="mr-2" size={16} />
                            Marcar como lido
                          </button>
                          <button
                            className="flex items-center w-full text-left px-4 cursor-pointer py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => {
                              deleteMessage(index);
                              setOpenDropdown(null);
                            }}
                          >
                            <Trash2 className="mr-2" size={16} />
                            Excluir
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bottom summary + chart */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100/60 dark:border-gray-700/50">
            <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-white">
              Usuários Activos
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {activeUsersMetrics.map((metric, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg text-center"
                >
                  <div className="text-xs text-gray-400">{metric.label}</div>
                  <div className="text-2xl font-bold mt-2 text-slate-900 dark:text-white">
                    <AnimatedNumber value={metric.value} />
                    {metric.unit && <span className="ml-1">{metric.unit}</span>}
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <motion.div
                        className="bg-[#1F628E] h-1.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.progress}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 shadow text-white">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold">Resumo</h4>
              <span className="text-xs text-white/70">Últimos 7 dias</span>
            </div>
            <div style={{ height: 160 }}>
              <Bar
                data={chartData}
                options={{
                  plugins: { legend: { display: false } },
                  scales: {
                    x: { display: false, grid: { display: false } },
                    y: {
                      display: false,
                      beginAtZero: true,
                      grid: { display: false },
                    },
                  },
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <DynamicModal
        title="Adicionar Tarefa"
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
      >
        <div>
          <ComponentInput
            name="terefa"
            label="Terefa"
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Descrição da tarefa"
          />
          <div className="flex flex-wrap-reverse justify-end mt-4 gap-2">
            <ComponentsButton
              variant="secondary"
              className="w-full md:w-auto"
              onClick={() => setIsTaskModalOpen(false)}
            >
              Cancelar
            </ComponentsButton>
            <ComponentsButton
              variant="outline"
              onClick={() => {
                if (newTask.trim()) {
                  setTasks([...tasks, { description: newTask }]);
                  setNewTask("");
                  setIsTaskModalOpen(false);
                }
              }}
              className="w-full md:w-auto"
            >
              Adicionar
            </ComponentsButton>
          </div>
        </div>
      </DynamicModal>
    </div>
  );
};

export default Dashboard;
