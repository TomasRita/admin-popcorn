import React, { useEffect, useState } from "react";
import {
  User,
  Lock,
  Paintbrush,
  Globe,
  Trash2,
  Camera,
  AlertTriangle,
  Menu,
  X,
} from "lucide-react";
import ComponentInput from "@/components/common/FormInput";
import { useAuth } from "@/context/AuthContext";
import { useDeleteUser, useGetUser } from "@/hooks/DynamicApiHooks";
import { UserSectionProps } from "@/types/services";
import ComponentsButton from "@/components/common/buttoncomponent";
import LanguageSection from "@/components/common/LanguageSection";
import { SecuritySection } from "@/components/common/SecuritySection";
import { AppearanceSection } from "@/components/common/AppearanceSection";

type UserData = {
  id_user?: number | string;
  name?: string;
  role?: string;
  phone?: string;
  category?: string;
  idNumber?: string;
  avatarUrl?: string;
  headerUrl?: string;
};

function DeleteAccountSection({ userData }: UserSectionProps) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { logout } = useAuth();
  const { mutate: deleteUser } = useDeleteUser();
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => {
        setStatusMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  const handleDeleteAccount = () => {
    if (!userData) return;
    setIsConfirmed(false);
    setIsLoading(true);
    deleteUser(
      { id_user: String(userData.id_user) },
      {
        onSuccess: () => {
          setStatusMessage({
            text: "Excluído com sucesso!",
            type: "success",
          });
          logout();
        },
        onError: () => {
          setIsLoading(false);
          setStatusMessage({
            text: "Erro ao excluir usuário. Tente novamente!",
            type: "error",
          });
        },
      }
    );
    setIsLoading(false);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-start gap-3 text-red-600 dark:text-red-400">
        <div>
          <h2 className="text-2xl font-medium">
            Excluir Conta Permanentemente
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Ação irreversível - leia atentamente as consequências
          </p>
        </div>
      </div>

      <div className="space-y-4 p-6 bg-red-50/50 border border-red-100 rounded-xl dark:bg-red-900/20 dark:border-red-800/80">
        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1 dark:text-red-400" />
          <div className="space-y-3">
            <p className="font-medium text-red-700 dark:text-red-200">
              Antes de continuar, esteja ciente que:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-red-600 dark:text-red-300">
              <li>Todos os seus dados serão permanentemente removidos</li>
              <li>Não será possível recuperar nenhuma informação</li>
              <li>Qualquer assinatura ativa será cancelada imediatamente</li>
              <li>Esta ação não pode be desfeita</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <input
            type="checkbox"
            id="confirmDelete"
            checked={isConfirmed}
            onChange={(e) => setIsConfirmed(e.target.checked)}
            className="w-4 h-4 border-red-300 rounded text-red-600 focus:ring-red-500 dark:bg-red-900/50"
          />
          <label
            htmlFor="confirmDelete"
            className="text-sm text-red-600 dark:text-red-300"
          >
            Eu compreendo todas as consequências e desejo excluir minha conta
            permanentemente
          </label>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <ComponentsButton
          disabled={!isConfirmed}
          loading={isLoading}
          variant="secondary"
          className="bg-red-600 w-full sm:w-auto text-white hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 dark:bg-red-700 dark:hover:bg-red-800"
          onClick={handleDeleteAccount}
        >
          Confirmar Exclusão da Conta
        </ComponentsButton>
        <ComponentsButton
          variant="secondary"
          className="w-full sm:w-auto"
          onClick={() => setIsConfirmed(false)}
        >
          Cancelar
        </ComponentsButton>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const { data } = useGetUser();
  const userData = data?.result;
  const defaultUser: UserData = {
    name: "Ronaldo Quita",
    role: "Admin de supervisão",
    phone: "+244 999 999 999",
    category: "Administrador de Supervisão",
    idNumber: "903420874",
    avatarUrl: userData?.photo,
    headerUrl: userData?.photo,
  };

  const [activeMenu, setActiveMenu] = useState<string>("profile");
  const [activeTab, setActiveTab] = useState<string>("details");
  const [editedUser, setEditedUser] = useState<UserData>({
    ...defaultUser,
    ...(userData || {}),
  });
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [headerPreview, setHeaderPreview] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for mobile sidebar

  const menuItems = [
    { id: "profile", icon: <User size={18} />, label: "Perfil" },
    { id: "security", icon: <Lock size={18} />, label: "Segurança" },
    { id: "appearance", icon: <Paintbrush size={18} />, label: "Aparência" },
    { id: "language", icon: <Globe size={18} />, label: "Idioma" },
    { id: "delete", icon: <Trash2 size={18} />, label: "Excluir Conta" },
  ];

  const u = { ...defaultUser, ...(userData || {}) };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "avatar" | "header"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "avatar") setAvatarPreview(reader.result as string);
        else setHeaderPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log("Saving:", {
      ...editedUser,
      avatarUrl: avatarPreview,
      headerUrl: headerPreview,
    });
  };

  const renderAvatarFallback = () => (
    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full ring-4 ring-white dark:ring-gray-800 bg-gray-200 flex items-center justify-center">
      <User size={48} className="text-gray-400" />
    </div>
  );

  const renderHeaderFallback = () => (
    <div className="w-full h-32 sm:h-40 md:h-48 bg-gray-200 flex items-center justify-center">
      <User size={48} className="text-gray-400" />
    </div>
  );

  return (
    <div className="min-h-screen  dark:bg-gray-800 text-gray-800 dark:text-gray-100">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Mobile Sidebar Toggle */}
        <div className="lg:hidden flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Configurações</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md bg-gray-200 dark:bg-gray-700"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4 sm:gap-8">
          {/* Sidebar */}
          <aside
            className={`bg-[#07253A] text-white rounded-2xl p-6 flex flex-col gap-6 h-fit lg:block ${
              isSidebarOpen ? "block" : "hidden"
            }`}
          >
            <nav className="space-y-2">
              {menuItems.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setActiveMenu(m.id);
                    setIsSidebarOpen(false); // Close sidebar on mobile after selection
                  }}
                  className={`w-full flex items-center gap-3 p-3 cursor-pointer rounded-xl transition-all text-sm font-medium
                    ${
                      activeMenu === m.id
                        ? "bg-[#1F628E]/10 text-[#1F628E] border-l-4 border-[#1F628E] pl-4"
                        : "text-gray-200 hover:bg-white/5"
                    }`}
                >
                  <span
                    className={
                      activeMenu === m.id ? "opacity-100" : "opacity-80"
                    }
                  >
                    {m.icon}
                  </span>
                  <span className="truncate">{m.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Main */}
          <main className="bg-white dark:bg-gray-900 rounded-2xl shadow p-0 overflow-hidden border border-gray-100/60 dark:border-gray-700/60">
            {/* Header image */}
            <div
              className="relative h-32 sm:h-40 md:h-48 bg-cover bg-center"
              style={{
                backgroundImage:
                  headerPreview || u.headerUrl
                    ? `url(${headerPreview || u.headerUrl})`
                    : undefined,
              }}
            >
              {!headerPreview && !u.headerUrl && renderHeaderFallback()}
              <label className="absolute right-4 top-4 bg-white/80 dark:bg-gray-700/80 p-2 rounded-full cursor-pointer hover:bg-white/90 dark:hover:bg-gray-700/90">
                <Camera size={18} />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, "header")}
                />
              </label>
              {/* Avatar overlapping */}
              <div className="absolute left-4 sm:left-8 -bottom-12 flex items-center gap-4 sm:gap-6">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full ring-4 ring-white dark:ring-gray-800 overflow-hidden bg-gray-200 relative">
                  {avatarPreview || u.avatarUrl ? (
                    <img
                      src={avatarPreview || u.avatarUrl}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    renderAvatarFallback()
                  )}
                  <label className="absolute bottom-2 right-2 bg-white/80 dark:bg-gray-700/80 p-1.5 rounded-full cursor-pointer hover:bg-white/90 dark:hover:bg-gray-700/90">
                    <Camera size={16} />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, "avatar")}
                    />
                  </label>
                </div>
                <div className="ml-2 dark:text-white drop-shadow-lg">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-tight">
                    {u.name}
                  </h1>
                  <p className="text-sm md:text-base opacity-90">{u.role}</p>
                </div>
              </div>
            </div>

            {/* Content area */}
            <div className="p-4 sm:p-8 pt-16 sm:pt-16">
              {activeMenu === "profile" && (
                <>
                  {/* Tabs */}
                  <div className="flex items-end justify-start gap-4 sm:gap-6 border-b pb-4">
                    <button
                      onClick={() => setActiveTab("details")}
                      className={`pb-3 text-sm font-semibold cursor-pointer ${
                        activeTab === "details"
                          ? "text-gray-900 dark:text-white border-b-2 border-[#1F628E]"
                          : "text-gray-500"
                      }`}
                    >
                      Detalhes da conta
                    </button>
                    <button
                      onClick={() => setActiveTab("edit")}
                      className={`pb-3 text-sm font-medium cursor-pointer ${
                        activeTab === "edit"
                          ? "text-gray-900 dark:text-white border-b-2 border-[#1F628E]"
                          : "text-gray-400"
                      }`}
                    >
                      Editar perfil
                    </button>
                  </div>

                  {/* Body */}
                  <div className="mt-8">
                    {activeTab === "details" && (
                      <div>
                        <h3 className="text-lg font-medium">
                          Informações pessoais
                        </h3>
                        <div className="mt-4 bg-gray-50 dark:bg-gray-900 rounded-lg p-6 border border-gray-100/50 dark:border-gray-700/50">
                          <div className="space-y-6">
                            <div>
                              <p className="text-xs text-gray-500">Nome</p>
                              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                {u.name}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Telefone</p>
                              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                {u.phone}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Categoria</p>
                              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                {u.category}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">
                                Número de ID
                              </p>
                              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                {u.idNumber}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {activeTab === "edit" && (
                      <div>
                        <h3 className="text-lg font-medium">Editar Perfil</h3>
                        <div className="mt-4 bg-gray-50 dark:bg-gray-900 rounded-lg p-6 border border-gray-100/50 dark:border-gray-700/50">
                          <div className="space-y-6">
                            <div>
                              <ComponentInput
                                type="text"
                                name="name"
                                label="Nome"
                                value={editedUser.name || ""}
                                onChange={(e) =>
                                  setEditedUser({
                                    ...editedUser,
                                    name: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div>
                              <ComponentInput
                                type="text"
                                name="phone"
                                label="Telefone"
                                value={editedUser.phone || ""}
                                onChange={(e) =>
                                  setEditedUser({
                                    ...editedUser,
                                    phone: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div>
                              <ComponentInput
                                type="text"
                                name="category"
                                label="Categoria"
                                value={editedUser.category || ""}
                                onChange={(e) =>
                                  setEditedUser({
                                    ...editedUser,
                                    category: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div>
                              <ComponentInput
                                type="text"
                                name="idNumber"
                                label="Número de ID"
                                value={editedUser.idNumber || ""}
                                onChange={(e) =>
                                  setEditedUser({
                                    ...editedUser,
                                    idNumber: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div>
                              <ComponentsButton
                                variant="outline"
                                className="w-full"
                                onClick={handleSave}
                              >
                                Salvar Alterações
                              </ComponentsButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
              {activeMenu === "security" && <SecuritySection />}
              {activeMenu === "appearance" && <AppearanceSection />}

              {activeMenu === "language" && (
                <LanguageSection userData={userData} />
              )}
              {activeMenu === "delete" && (
                <DeleteAccountSection userData={userData} />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
