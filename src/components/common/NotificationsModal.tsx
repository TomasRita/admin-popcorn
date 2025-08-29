import { X, MoreVertical } from "lucide-react";
import { useState } from "react";

interface Notification {
  id: number;
  description: string;
  date: string;
}

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationsModal = ({ isOpen, onClose }: NotificationsModalProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, description: "Nova franquia adicionada!", date: "2025-07-01" },
    { id: 2, description: "Seu perfil foi atualizado.", date: "2025-06-30" },
    { id: 3, description: "Oferta especial disponível!", date: "2025-06-29" },
  ]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClearAll = () => {
    setNotifications([]);
    setIsMenuOpen(false);
  };

  const handleClearOld = () => {
    const currentDate = new Date();
    const filteredNotifications = notifications.filter((notification) => {
      const notificationDate = new Date(notification.date);
      const diffDays =
        (currentDate.getTime() - notificationDate.getTime()) /
        (1000 * 3600 * 24);
      return diffDays <= 7;
    });
    setNotifications(filteredNotifications);
    setIsMenuOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50">
      <div className="bg-white dark:bg-gray-900  w-full max-w-md h-full  p-6 flex flex-col">
        <div className="flex justify-between items-center mb-4  ">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
            Notificações
          </h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-500 hover:text-[#1F628E] cursor-pointer"
              >
                <MoreVertical size={24} />
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48  bg-white dark:bg-gray-700 border border-gray-200 rounded-md shadow-lg z-10">
                  <button
                    onClick={handleClearAll}
                    className="block w-full text-left px-4 dark:text-white cursor-pointer py-2 text-sm text-gray-700 dark:hover:bg-gray-500 hover:bg-gray-100 hover:text-[#1F628E]"
                  >
                    Limpar todas
                  </button>
                  <button
                    onClick={handleClearOld}
                    className="block w-full text-left px-4 py-2 cursor-pointer dark:hover:bg-gray-500 text-sm dark:text-white text-gray-700 hover:bg-gray-100 hover:text-[#1F628E]"
                  >
                    Limpar antigas
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-[#1F628E] cursor-pointer"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="p-4 border-b border-gray-200"
              >
                <p className="text-gray-700 dark:text-white">{notification.description}</p>
                <p className="text-sm text-gray-500">{notification.date}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">Nenhuma notificação</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsModal;
