import { useState, useEffect, useRef } from "react";
import { Bell, LogOut, Settings } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import { pageTitles } from "@/types/topBar";
import NotificationsModal from "../ui/NotificationsModal";
import { useAuth } from "@/context/AuthContext";
import { getEntityName } from "@/lib/utils";
import {
  useGetUser,
  useGetNotifications,
  useReadNotifications,
  useDeleteNotification,
} from "@/hooks/DynamicApiHooks";
import { Notification as ApiNotification } from "@/types/services";

// Define o tipo local esperado para as notificações
type LocalNotification = {
  id: number;
  text: string;
  time: string;
  timestamp: number;
  unread: boolean;
};

const TopBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { data: userData } = useGetUser();
  const { data: apiNotificationsData } = useGetNotifications();

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState<LocalNotification[]>([]);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Hooks para marcar como lida e excluir notificações
  const { mutateAsync: readNotifications } = useReadNotifications();
  const { mutateAsync: deleteNotification } = useDeleteNotification();
  const currentPath = location.pathname;
  let currentPage = pageTitles[currentPath];

  // Handle dynamic routes and provide a fallback
  if (!currentPage) {
    const startupPrefixes = [
      "/admin/startup/profile/",
      "/analysis/startup/profile/",
      "/secretary/startup/profile/",
    ];

    const documentProfilePrefixes = [
      "/admin/documents/profile/",
      "/analysis/documents/profile/",
      "/secretary/documents/profile/",
    ];

    if (startupPrefixes.some((p) => currentPath.startsWith(p))) {
      currentPage = pageTitles["/analysis/startup/profile"] ||
        pageTitles["/admin/startup/profile"] ||
        pageTitles["/secretary/startup/profile"] || {
          title: "Perfil da Startup",
          description: "Cadastro e gestão das informações da Startup.",
        };
    } else if (documentProfilePrefixes.some((p) => currentPath.startsWith(p))) {
      currentPage = pageTitles["/analysis/documents/profile/:id"] ||
        pageTitles["/admin/documents/profile/:id"] ||
        pageTitles["/secretary/documents/profile/:id"] || {
          title: "Documento",
          description: "Visualize os detalhes do documento.",
        };
    } else {
      currentPage = {
        title: "Dados Não Encontrados",
        description: "Aguarde os teus dados carregar!",
      };
    }
  }
  const settingsRoute = location.pathname.includes("secretary")
    ? "/secretary/settings"
    : location.pathname.includes("admin")
    ? "/admin/settings"
    : "/analysis/settings";

  const handleLogout = () => {
    logout();
  };

  // Converte as notificações da API para o formato local
  useEffect(() => {
    if (apiNotificationsData && apiNotificationsData.result) {
      const converted: LocalNotification[] = apiNotificationsData.result.map(
        (notif: ApiNotification) => {
          const date = new Date(notif.created_in);
          return {
            id: notif.id_notification,
            text: `${notif.title}: ${notif.description}`,
            time: date.toLocaleString(),
            timestamp: date.getTime(),
            unread: !notif.read,
          };
        }
      );
      setNotifications(converted);
    }
  }, [apiNotificationsData]);

  // Quando o modal é aberto, marque todas as notificações como lidas
  useEffect(() => {
    if (isNotificationOpen) {
      // Para cada notificação não lida, chama o endpoint PUT /notifications com seu id_notification
      notifications.forEach((notif) => {
        if (notif.unread) {
          readNotifications({ id_notification: notif.id })
            .then(() => {
              setNotifications((prev) =>
                prev.map((n) =>
                  n.id === notif.id ? { ...n, unread: false } : n
                )
              );
            })
            .catch((error) =>
              console.error("Erro ao marcar notificação como lida", error)
            );
        }
      });
    }
  }, [isNotificationOpen, notifications, readNotifications]);

  // Exemplo para limpar notificações antigas (mantém apenas as notificações com menos de 24h)
  const handleClearOld = () => {
    const filtered = notifications.filter((n) => {
      // Calcula a diferença entre agora e o timestamp da notificação
      const difference = Date.now() - n.timestamp;
      return difference < 86400000; // menos de 24 horas
    });
    setNotifications(filtered);
  };

  // Função para deletar todas as notificações (ou as desejadas) usando a API
  const handleClearAll = async () => {
    try {
      // Se a API não suporta deleção em massa, você pode iterar sobre as notificações.
      for (const notif of notifications) {
        await deleteNotification({ id_notification: notif.id });
      }
      setNotifications([]);
    } catch (error) {
      console.error("Erro ao deletar notificações", error);
    }
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const entityName = userData
    ? getEntityName(Number(userData.result.type))
    : "";

  return (
    <header className="flex flex-col-reverse md:flex-row md:items-center justify-between bg-white dark:bg-gray-800 p-6 md:p-8 py-4 w-full">
      {/* Título da Página */}
      <div>
        <h1 className="text-2xl font-bold">{currentPage.title}</h1>
        <p className="text-gray-500 dark:text-gray-400">
          {currentPage.description}
        </p>
      </div>

      {/* Área do Usuário */}
      <div className="flex items-center justify-end">
        <button
          onClick={() => setIsNotificationOpen(true)}
          className="relative p-2 rounded-full hover:bg-gray-100 hover:dark:bg-gray-800 cursor-pointer"
        >
          <Bell className="text-gray-600 dark:text-white" size={24} />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {unreadCount}
            </span>
          )}
        </button>

        <div className="z-[990]">
          <NotificationsModal
            isOpen={isNotificationOpen}
            onClose={() => setIsNotificationOpen(false)}
            notifications={notifications}
            onClearAll={handleClearAll}
            onClearOld={handleClearOld}
          />
        </div>

        <div className="relative" ref={profileMenuRef}>
          <div className="flex items-center gap-2 p-4">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="bg-white dark:bg-gray-800 rounded"
            >
              <Avatar src={userData?.result.photo || undefined} />
            </button>
            <div>
              <span className="hidden md:block text-gray-700 dark:text-white font-medium text-sm truncate">
                {userData?.result.name}
              </span>
              <span className="hidden md:block text-gray-500 dark:text-gray-400 text-xs">
                {entityName}
              </span>
            </div>
          </div>

          {isProfileMenuOpen && (
            <div className="absolute top-16 right-0 w-55 md:w-48 bg-white dark:bg-gray-900 shadow-lg rounded-md border border-gray-200 dark:border-gray-800 z-[99]">
              <button
                onClick={() => {
                  setIsProfileMenuOpen(false);
                  navigate(settingsRoute);
                }}
                className="w-full text-left cursor-pointer px-4 py-2 hover:bg-gray-100 hover:dark:bg-gray-800 flex items-center gap-2"
              >
                <Settings className="w-5 h-5" />
                Configurações
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-800 flex items-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                Terminar Sessão
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
