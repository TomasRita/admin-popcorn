import { useState, useRef, useEffect } from "react";
import {
  User,
  Mail,
  Smartphone,
  Loader2,
  Camera,
  AlertTriangle,
  CheckCircle,
  Lock,
} from "lucide-react";
import ComponetButton from "./button";
import { UserSectionProps } from "@/types/services";
import {
  useChangeEmail,
  useReceiveCode,
  useUpdateUser,
  useUploadPhoto,
} from "@/hooks/DynamicApiHooks";
import { confirmationCodeSchema } from "@/types/type";
import ComponentSelect from "./ComponentSelect";
import LocationSelect from "./LocationSelectComponent";

export default function ProfileSection({ userData }: UserSectionProps) {
  // Estado para atualização dos dados básicos (nome, telefone, gênero e localização)
  const [updateData, setUpdateData] = useState({
    name: userData?.name || "",
    telephone: userData?.telephone ? String(userData.telephone) : "",
    gender: userData?.gender || "",
    location: userData?.Settings?.location
      ? String(userData.Settings.location)
      : "",
    lat: userData?.latitude || "",
    lng: userData?.longitude || "",
  });

  // Hook para atualizar os dados do usuário (nome, telefone, gênero e localização)
  const { mutateAsync: updateUser } = useUpdateUser();

  // Estados para gerenciamento de mudança de e-mail e upload de avatar
  const [loading, setLoading] = useState({
    email: false,
    avatar: false,
    code: false,
  });
  const { mutateAsync: receiveCode } = useReceiveCode();
  const { mutateAsync: changeEmail } = useChangeEmail();

  const [emailEdit, setEmailEdit] = useState({
    newEmail: "",
    code: "",
    password: "",
    step: 1, // 1 = edição, 2 = verificação do código
  });
  const [codeError, setCodeError] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);
  const { mutateAsync: uploadPhoto } = useUploadPhoto();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [statusMessage, setStatusMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // Verifica se o novo e-mail é igual ao atual
  const emailIsSame = emailEdit.newEmail === userData?.email;

  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => {
        setStatusMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCountdown > 0) {
      timer = setInterval(() => {
        setResendCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCountdown]);

  // Função para envio do código de verificação para o novo e-mail
  const sendVerificationCode = async () => {
    if (!emailEdit.newEmail || !emailEdit.password) {
      setCodeError("Preencha o novo e-mail e a senha para continuar.");
      return;
    }
    if (emailIsSame) {
      setCodeError(
        "Você não pode usar o mesmo e-mail. Informe um novo e-mail."
      );
      return;
    }
    if (resendCountdown > 0) return;
    setLoading((prev) => ({ ...prev, email: true }));
    try {
      const response = await receiveCode({ email: emailEdit.newEmail });
      if (response.message === "Verification email sent successfully") {
        setEmailEdit((prev) => ({ ...prev, step: 2 }));
        setResendCountdown(60);
        setCodeError("");
      } else if (response.message.includes("already in use")) {
        setCodeError("Esse e-mail já está em uso.");
      } else {
        setCodeError(response.message || "Erro inesperado.");
      }
    } catch (error) {
      setCodeError("Erro ao enviar o código.");
      console.error("Erro ao enviar o código:", error);
    } finally {
      setLoading((prev) => ({ ...prev, email: false }));
    }
  };

  const verifyCode = async () => {
    setLoading((prev) => ({ ...prev, code: true }));
    const result = confirmationCodeSchema.safeParse({ code: emailEdit.code });
    if (!result.success) {
      const message =
        result.error.format().code?._errors[0] || "Código inválido";
      setCodeError(message);
      setLoading((prev) => ({ ...prev, code: false }));
      return;
    }
    try {
      const response = await changeEmail({
        newEmail: emailEdit.newEmail,
        code: emailEdit.code,
        password: emailEdit.password,
      });
      if (response.message === "Email updated successfully") {
        setCodeError("");
        setEmailEdit({ newEmail: "", code: "", password: "", step: 1 });
      } else if (response.message.includes("incorrect code")) {
        setCodeError("Código incorreto. Verifique e tente novamente.");
      } else if (response.message.includes("already in use")) {
        setCodeError("Esse e-mail já está em uso.");
      } else {
        setCodeError(response.message || "Erro ao alterar o e-mail.");
      }
    } catch (error: any) {
      setCodeError(error.message || "Erro ao verificar o código");
    } finally {
      setLoading((prev) => ({ ...prev, code: false }));
    }
  };

  const handleImageUpload = async (file: File) => {
    const MAX_SIZE = 6 * 1024 * 1024; // 6 MB em bytes
    if (file.size > MAX_SIZE) {
      setStatusMessage({
        text: "Arquivo muito grande! O limite é 6 MB.",
        type: "error",
      });
      return;
    }

    setLoading((prev) => ({ ...prev, avatar: true }));
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await uploadPhoto(formData);

      if (response.message === "File successfully saved") {
        setStatusMessage({
          text: "Foto carregada com sucesso!",
          type: "success",
        });
      } else {
        setStatusMessage({
          text: "Erro ao salvar alterações. Tente novamente!",
          type: "error",
        });
      }
    } catch (error) {
      setStatusMessage({
        text: "Erro Desconhecido. Tente novamente mais tarde.",
        type: "error",
      });
    }

    // Atualiza o preview da imagem
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
      setLoading((prev) => ({ ...prev, avatar: false }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveUpdate = async () => {
    setIsLoading(true);
    const locationValue =
      updateData.location?.trim() ||
      userData?.Settings?.location?.trim() ||
      "não disponivel";
    if (!locationValue) {
      setIsLoading(false);
      setStatusMessage({
        text: "O campo 'Localização' é obrigatório.",
        type: "error",
      });
      return;
    }

    try {
      const response = await updateUser({
        name: updateData.name
          ? String(updateData.name)
          : String(userData?.name || ""),
        telephone: updateData.telephone
          ? String(updateData.telephone)
          : String(userData?.telephone || ""),
        email: String(userData?.email),
        password: String(userData?.password),
        language: String(userData?.Settings?.language),
        photo: String(userData?.photo),
        gender: updateData.gender
          ? String(updateData.gender)
          : String(userData?.gender || ""),
        latitude: String(userData?.latitude),
        longitude: String(userData?.longitude),
        theme: 0,
        location: locationValue,
        subscriber: true,
      });

      if (response.message === "User updated successfully") {
        setIsLoading(false);
        setStatusMessage({
          text: "Actualizado com sucesso",
          type: "success",
        });
      } else {
        setIsLoading(false);
        setStatusMessage({
          text: "Erro ao salvar alterações. Tente novamente!",
          type: "error",
        });
      }
    } catch (error) {
      setIsLoading(false);
      setStatusMessage({
        text: "Erro Desconhecido. Tente novamente mais tarde.",
        type: "error",
      });
    }
  };

  return (
    <div className="w-full p-4 md:p-6 ">
      {statusMessage && (
        <div
          className={`p-4 mb-6 rounded-lg transition-all duration-300 ${
            statusMessage.type === "success"
              ? "bg-green-100 border-l-4 border-green-500"
              : "bg-red-100 border-l-4 border-red-500"
          }`}
        >
          <p className="text-sm flex items-center gap-2">
            {statusMessage.type === "success" ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-600" />
            )}
            <span
              className={
                statusMessage.type === "success"
                  ? "text-green-800"
                  : "text-red-800"
              }
            >
              {statusMessage.text}
            </span>
          </p>
        </div>
      )}

      <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
        <div className="relative group w-24 h-24">
          {imagePreview || userData?.photo ? (
            <img
              src={imagePreview ?? userData?.photo ?? undefined}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-2 border-gray-200 dark:border-gray-700 transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center border-2 border-gray-200 dark:border-gray-700">
              <User className="w-12 h-12 text-gray-400" />
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 bg-gray-800/50 rounded-full"
            >
              {loading.avatar ? (
                <Loader2 className="w-6 h-6 text-white animate-spin" />
              ) : (
                <Camera className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            hidden
            accept="image/*"
            onChange={(e) =>
              e.target.files?.[0] && handleImageUpload(e.target.files[0])
            }
          />
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            {userData?.name}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">{userData?.email}</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Nome Completo
          </label>
          <div className="relative">
            <User className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={updateData.name || String(userData?.name)}
              onChange={(e) =>
                setUpdateData({ ...updateData, name: e.target.value })
              }
              className="w-full pl-8 pr-3 py-2 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-indigo-500 outline-none transition-colors duration-300 text-gray-800 dark:text-gray-100"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Número de Telefone
          </label>
          <div className="relative">
            <Smartphone className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="tel"
              value={updateData.telephone}
              onChange={(e) =>
                setUpdateData({ ...updateData, telephone: e.target.value })
              }
              placeholder="Adicionar telefone"
              className="w-full pl-8 pr-3 py-2 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-indigo-500 outline-none transition-colors duration-300 text-gray-800 dark:text-gray-100"
            />
          </div>
        </div>
        {userData?.type !== 0 && (
          <div className="space-y-2">
            <ComponentSelect
              label="Gênero"
              name="gender"
              value={updateData.gender || String(userData?.gender)}
              onChange={(e) =>
                setUpdateData({ ...updateData, gender: e.target.value })
              }
              options={[
                { value: "", label: "Selecionar" },
                { value: "Masculino", label: "Masculino" },
                { value: "Feminino", label: "Feminino" },
                { value: "Outro", label: "Outro" },
              ]}
              required
            />
          </div>
        )}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Localização
          </label>
          <LocationSelect
            value={String(updateData.location)}
            onChange={(value, lat, lng) =>
              setUpdateData((prev) => ({ ...prev, location: value, lat, lng }))
            }
          />
        </div>
      </div>

      <div className="space-y-6 my-8">
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
          Alterar E-mail
        </h3>
        <div className="relative">
          {/* Campo para E-mail e verificação (já implementado) */}
          <div className="space-y-3 my-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Endereço de E-mail
            </label>
            <div className="flex flex-col md:w-auto w-full md:flex-row items-center gap-2 p-2 rounded border border-gray-200 focus-within:border-[#3683FF]">
              <Mail className="text-gray-400" />
              <input
                placeholder={userData?.email || String(userData?.email)}
                type="email"
                value={
                  emailEdit.step === 2 ? userData?.email : emailEdit.newEmail
                }
                onChange={(e) => {
                  if (emailEdit.step === 1) {
                    setEmailEdit({ ...emailEdit, newEmail: e.target.value });
                  }
                }}
                disabled={emailEdit.step === 2}
                className="flex-1 dark:bg-gray-900 py-2 focus:outline-none disabled:opacity-50 md:w-auto w-full"
                autoComplete="email"
              />
              {emailEdit.step === 1 &&
                emailEdit.newEmail !== userData?.email && (
                  <button
                    onClick={sendVerificationCode}
                    disabled={loading.email || resendCountdown > 0}
                    className="ml-auto px-4 py-2 bg-[#3683FF] text-white rounded cursor-pointer hover:bg-blue-300 disabled:opacity-50"
                  >
                    {loading.email ? (
                      <Loader2 className="animate-spin" />
                    ) : resendCountdown > 0 ? (
                      `Reenviar em ${resendCountdown}s`
                    ) : (
                      "Alterar E-mail"
                    )}
                  </button>
                )}
            </div>
            {emailEdit.step === 1 &&
              emailEdit.newEmail === userData?.email &&
              emailEdit.newEmail && (
                <p className="text-sm text-red-500">
                  Você não pode usar o mesmo e-mail. Informe um novo e-mail.
                </p>
              )}
          </div>

          {/* Campo para Senha (apenas na etapa 1) */}
          {emailEdit.step === 1 && (
            <div className="space-y-3">
              <label className="text-gray-700 dark:text-white text-sm w-32">
                Senha Atual:
              </label>
              <div className="flex flex-col md:flex-row items-center gap-2 p-2 rounded border border-gray-200 focus-within:border-[#3683FF] mt-4">
                <input
                  type="password"
                  value={emailEdit.password}
                  onChange={(e) =>
                    setEmailEdit({ ...emailEdit, password: e.target.value })
                  }
                  autoComplete="current-password"
                  placeholder="Informe sua senha"
                  className="flex-1 dark:bg-gray-900 py-2 focus:outline-none md:w-auto w-full"
                />
              </div>
            </div>
          )}

          {!emailEdit.password && (
            <p className="text-sm text-red-500 my-3">
              Informe sua senha para continuar.
            </p>
          )}
          {/* Verificação de Código */}
          {emailEdit.step === 2 && (
            <div className="space-y-4 mt-4 pl-4 border-l-4 border-[#3683FF]">
              <div className="flex flex-col md:flex-row items-center gap-3">
                <input
                  type="text"
                  value={emailEdit.code}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    if (value.length <= 4) {
                      setEmailEdit({ ...emailEdit, code: value });
                      if (codeError) setCodeError("");
                    }
                  }}
                  placeholder="Código de verificação"
                  className={`flex-1 p-2 border-b-2 outline-none ${
                    codeError
                      ? "border-red-500"
                      : "border-gray-200 focus:border-[#3683FF]"
                  }`}
                />
                <button
                  onClick={verifyCode}
                  disabled={loading.code || emailEdit.code.length !== 4}
                  className="px-4 py-2 bg-[#3683FF]  text-white rounded cursor-pointer hover:bg-blue-300 disabled:opacity-50"
                >
                  {loading.code ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Verificar Código"
                  )}
                </button>
              </div>
              {codeError && (
                <p className="text-sm text-red-500">
                  <AlertTriangle className="w-4 h-4 inline mr-1" />
                  {codeError}
                </p>
              )}
              <p className="text-sm text-gray-500 dark:text-white">
                Enviamos um código de verificação para{" "}
                <strong className="text-blue-300">{emailEdit.newEmail}</strong>
              </p>
              <button
                onClick={() =>
                  setEmailEdit({
                    ...emailEdit,
                    step: 1,
                    code: "",
                    password: "",
                  })
                }
                className="text-sm text-blue-600 hover:underline mt-2 cursor-pointer"
              >
                Alterar novo e-mail
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Botão para salvar alterações */}
      <ComponetButton
        variant="primary"
        className="w-full"
        onClick={handleSaveUpdate}
        loading={isLoading}
      >
        Salvar Alterações
      </ComponetButton>
    </div>
  );
}
