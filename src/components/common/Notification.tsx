import { Bell, Mail, Smartphone } from "lucide-react";
import { useState } from "react";

export const NotificationsSection = () => {
  const [settings, setSettings] = useState([
    {
      type: "Email",
      description: "Notificações por e-mail",
      enabled: true,
      icon: <Mail className="w-6 h-6" />,
    },
    {
      type: "Push",
      description: "Notificações no dispositivo",
      enabled: true,
      icon: <Bell className="w-6 h-6" />,
    },
    {
      type: "SMS",
      description: "Alertas por mensagem",
      enabled: false,
      icon: <Smartphone className="w-6 h-6" />,
    },
  ]);

  const handleToggle = (index: number) => {
    setSettings((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  return (
    <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
      {/* Lista de Notificações */}
      <div className="space-y-6">
        {settings.map((item, index) => (
          <div
            key={item.type}
            onClick={() => handleToggle(index)}
            className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800  hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="p-3 bg-[#3683FF]/10 rounded-lg">{item.icon}</div>
              <div className="flex-1">
                <h3 className="text-lg font-bold">{item.type}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
              <div
                className={`ml-auto w-12 h-6 rounded-full p-1 ${
                  item.enabled ? "bg-[#3683FF]" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${
                    item.enabled ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Preview de Notificações */}
      <div className="flex justify-center items-center">
        <div className="relative w-56 h-56 sm:w-64 sm:h-64">
          <div className="absolute inset-0 bg-[#3683FF]/10 rounded-full blur-3xl" />
          <div className="relative p-4 sm:p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl">
            <Bell className="w-12 h-12 text-[#3683FF] mx-auto mb-4" />
            <div className="space-y-2 text-center">
              <div className="h-2 w-full bg-gray-200 rounded-full" />
              <div className="h-2 w-3/4 bg-gray-200 rounded-full mx-auto" />
              <div className="h-4 bg-[#3683FF] rounded-full mt-4 w-3/4 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
