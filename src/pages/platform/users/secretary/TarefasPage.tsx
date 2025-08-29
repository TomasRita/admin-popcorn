import { JSX, useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  CheckCircle,
  Plus,
  Pencil,
} from "lucide-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type PageKey =
  | "dashboard"
  | "recebidas"
  | "mensagens"
  | "documentos"
  | "tarefas"
  | "definicoes";

type Tarefa = {
  id: number;
  nome: string;
  status: string;
  description: string;
  deadline: string;
};

export default function TarefasPage(): JSX.Element {
  const [active, setActive] = useState<PageKey>("tarefas");
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [filterField, setFilterField] = useState("tarefa");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Tarefa | null>(null);

  const filterOptions = [
    { value: "tarefa", label: "Tarefa" },
    { value: "status", label: "Status" },
    { value: "data", label: "Data" },
  ];

  const tarefas: Tarefa[] = [
    {
      id: 1,
      nome: `Verificar Documentação da Startup "AgroPay"`,
      status: "Concluído",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      deadline: "10/05/2025",
    },
    {
      id: 2,
      nome: "Atualizar Status de Startups Submetidas",
      status: "Concluído",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      deadline: "19/05/2025",
    },
    {
      id: 3,
      nome: `Agendar Reunião com Fundador da Startup "EduChain"`,
      status: "Concluído",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      deadline: "20/05/2025",
    },
  ];

  function renderContent() {
    if (active !== "tarefas") {
      return (
        <div className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-2xl font-semibold text-gray-800 capitalize">
            {active}
          </h2>
          <p className="text-gray-500 mt-3">
            Conteúdo de exemplo para a página <b>{active}</b>. Clique em
            "Tarefas" para ver a tela de tarefas.
          </p>
        </div>
      );
    }

    if (selectedTask) {
      return (
        <div className="bg-white rounded-lg p-6">
          <button
            onClick={() => setSelectedTask(null)}
            className="text-gray-600 mb-4 flex cursor-pointer items-center gap-1"
          >
            <ChevronLeft size={16} /> Voltar
          </button>
          <h3 className="text-xl font-semibold flex justify-between items-center">
            {selectedTask.nome}
            <Pencil size={16} className="text-gray-500 cursor-pointer" />
          </h3>
          <p className="text-gray-600 mt-6 font-medium">Descrição</p>
          <p className="text-gray-800 mt-2">{selectedTask.description}</p>
          <p className="text-gray-600 mt-6 font-medium">Deadline</p>
          <p className="text-gray-800 mt-2">{selectedTask.deadline}</p>
        </div>
      );
    }

    return (
      <section>
        <div className="flex flex-wrap items-center gap-4 mb-4 sm:mb-6">
          <div className="flex items-center bg-white dark:bg-gray-900 rounded-lg shadow px-4 py-3 w-full sm:w-auto">
            <Search
              className="text-gray-400 dark:text-gray-500 mr-2"
              size={20}
            />
            <input
              type="text"
              placeholder="Pesquisar Tarefa.."
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
              Filtrar
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
        <div className="mt-6 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-700">
              Minhas Tarefas <span className="text-sm text-gray-400">(03)</span>
            </h3>
            <button
              onClick={() =>
                setSelectedTask({
                  id: 0,
                  nome: "Nova Tarefa",
                  status: "Pendente",
                  description: "",
                  deadline: "",
                })
              }
              className="flex items-center gap-2  text-gray-700 px-4 py-2  cursor-pointer "
            >
              <Plus size={16} />
              Adicionar
            </button>
          </div>

          <div className="divide-y divide-gray-100">
            {tarefas.map((t, idx) => (
              <div
                key={t.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-400 w-8">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-gray-700">{t.nome}</div>
                    <CheckCircle size={18} className="text-green-600" />
                  </div>
                </div>

                <button
                  className="cursor-pointer text-gray-700 hover:underline"
                  onClick={() => setSelectedTask(t)}
                >
                  Ver detalhes
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 bg-white relative">
        <div className="p-8 flex gap-8">
          <div className="flex-1 space-y-6">{renderContent()}</div>

          {/* <-- Mostrar o aside apenas quando NÃO estivermos vendo detalhes e estivermos na página "tarefas" */}
          {!selectedTask && active === "tarefas" && (
            <aside className="w-80">
              <div className="bg-[#07253A] text-white rounded-2xl p-5 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold">Fevereiro</h2>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <ChevronLeft size={16} />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                <div className="react-calendar-wrapper bg-[#07253A] rounded-lg p-1">
                  <Calendar
                    onChange={(v) => v instanceof Date && setDate(v)}
                    value={date}
                    nextLabel={null}
                    prevLabel={null}
                    tileClassName={() => "text-white/90"}
                  />
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
      <style>{`
        .react-calendar { 
          background: transparent;
          border: none;
          width: 100%;
        }
        .react-calendar__navigation { display: none; }
        .react-calendar__month-view__weekdays { color: rgba(255,255,255,0.8); font-weight:600; }
        .react-calendar__tile {
          background: transparent !important;
          border-radius: 6px;
          padding: 6px 4px;
          height: auto;
        }
        .react-calendar__tile:enabled:hover,
        .react-calendar__tile:enabled:focus { background: rgba(255,255,255,0.06); }
        .react-calendar__tile--now { background: rgba(255,255,255,0.12) !important; border-radius: 6px; }
        .react-calendar__tile--active { background: rgba(255,255,255,0.2) !important; color: white !important; border-radius: 6px; }
      `}</style>
    </div>
  );
}
