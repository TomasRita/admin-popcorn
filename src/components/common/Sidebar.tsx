import {
  LayoutDashboard,
  Rocket,
  BookOpen,
  BarChart2,
  Bell,
  Edit3,
  FileText,
  Settings,
  ExternalLink,
  LogOut,
  FileQuestion,
  Hourglass,
  MessageSquare,
  Inbox,
  CheckSquare,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo/logo-branco.svg";
import { useAuth } from "@/context/AuthContext";

type SidebarProps = {
  role: "user" | "admin" | "secretary" | "analysis";
};

const Sidebar = ({ role }: SidebarProps) => {
  const location = useLocation();
  const { logout } = useAuth();
  const settingsRoute =
    role === "admin"
      ? "/admin/settings"
      : role === "analysis"
      ? "/analysis/settings"
      : "/secretary/settings";

  let menuItems = [];

  if (role === "admin") {
    menuItems = [
      {
        name: "Painel",
        icon: <LayoutDashboard size={20} />,
        path: "/admin/dashboard",
      },

      {
        name: "Startups",
        icon: <Rocket size={20} />,
        path: "/admin/startups",
      },
      {
        name: "Gestão",
        icon: <BarChart2 size={20} />,
        path: "/admin/management",
      },
      {
        name: "Franquia",
        icon: <BookOpen size={20} />,
        path: "/admin/franchise",
      },
      {
        name: "Aprovação",
        icon: <Bell size={20} />,
        path: "/admin/approval",
        badge: 99,
      },
      {
        name: "Editar Site",
        icon: <Edit3 size={20} />,
        path: "/admin/edit-site",
      },
      {
        name: "Relatório",
        icon: <FileText size={20} />,
        path: "/admin/report",
      },
      {
        name: "Configurações",
        icon: <Settings size={20} />,
        path: settingsRoute,
      },
    ];
  } else if (role === "analysis") {
    menuItems = [
      {
        name: "Painel",
        icon: <LayoutDashboard size={20} />,
        path: "/analysis/dashboard",
      },

      {
        name: "Pendente",
        icon: <Hourglass size={20} />,
        path: "/analysis/pending",
      },
      // {
      //   name: "Empresa",
      //   icon: <Building2 size={20} />,
      //   path: "/analysis/company",
      // },
      {
        name: "Franquia",
        icon: <BookOpen size={20} />,
        path: "/analysis/franchise",
      },
      {
        name: "Startups",
        icon: <Rocket size={20} />,
        path: "/analysis/startups",
      },

      {
        name: "Notificações",
        icon: <Bell size={20} />,
        path: "/analysis/notifications",
      },
      {
        name: "Configurações",
        icon: <Settings size={20} />,
        path: settingsRoute,
      },
    ];
  } else {
    menuItems = [
      {
        name: "Painel",
        icon: <LayoutDashboard size={20} />,
        path: "/secretary/dashboard",
      },

      {
        name: "Recebidos",
        icon: <Inbox size={20} />,
        path: "/secretary/inbox",
      },
      {
        name: "Mensagens",
        icon: <MessageSquare size={20} />,
        path: "/secretary/messages",
      },
      {
        name: "Documentos",
        icon: <FileText size={20} />,
        path: "/secretary/documents",
      },
      {
        name: "Tarefas",
        icon: <CheckSquare size={20} />,
        path: "/secretary/tasks",
      },
      {
        name: "Notificações",
        icon: <Bell size={20} />,
        path: "/secretary/notifications",
      },
      {
        name: "Configurações",
        icon: <Settings size={20} />,
        path: settingsRoute,
      },
    ];
  }

  const mobileMenuItems = menuItems.filter((item) => item.name !== "Settings");
  const handleLogout = () => {
    logout();
  };
  return (
    <div className="flex flex-col z-50 h-full ">
      <aside className="hidden md:flex z-50 top-0 left-0 bg-[#07253A]  w-64 h-full   text-white flex-col justify-between ">
        <div className="bg-[#07253A]  p-6 ">
          {/* Logo */}
          <div className="mb-10 flex  items-center justify-center">
            <img src={logo} alt="PopCorn Logo" className="w-32 h-auto" />
          </div>
          {/* Navigation Menu */}
          <nav className="flex-1">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.name} className="relative">
                    <Link
                      to={item.path}
                      className={`flex items-center text-gray-100 gap-3 px-4 py-3 rounded-full transition-colors whitespace-nowrap text-base font-medium 
                      ${
                        isActive
                          ? "bg-[#1F628E] text-white"
                          : "hover:text-[#789CD6]"
                      }
                    `}
                    >
                      {item.icon}
                      <span className="flex-1">{item.name}</span>
                      {item.badge !== undefined && (
                        <span className="ml-auto bg-[#FF3B30] text-xs font-semibold min-w-[20px] text-center px-1 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Help Card & Logout */}
          <div className="mt-8 space-y-4">
            <div className="bg-white text-[#0C2340] p-4 rounded-2xl shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <FileQuestion size={16} />
                <span className="font-semibold text-sm">Precisa de ajuda?</span>
              </div>
              <p className="text-xs mb-3">Consulte por favor a documentação</p>
              <a
                href="/documentation"
                className="inline-flex items-center gap-1 p-3 w-full rounded-lg text-white justify-center text-xs font-medium bg-[#1F628E]"
              >
                DOCUMENTAÇÃO <ExternalLink size={12} />
              </a>
            </div>

            <button
              className="w-full flex items-center gap-2 justify-center cursor-pointer py-2 bg-[#FF3B30] hover:bg-[#E02A1E] rounded-lg transition-colors"
              onClick={handleLogout}
            >
              <LogOut size={16} /> Sair
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Menu */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 p-3 shadow-t-lg flex justify-around items-center z-40">
        {mobileMenuItems.map((item, idx) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={idx}
              to={item.path}
              className={`flex flex-col items-center text-[5px] p-2 transition-colors rounded-lg 
                ${
                  isActive
                    ? "bg-[#3683FF] text-white"
                    : "text-gray-500 hover:text-[#3683FF]"
                }`}
            >
              {item.icon}
              <span className="mt-1">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
