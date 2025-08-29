// src/pages/shared/Login.tsx
import { useState, useEffect, FormEvent } from "react";
import { Lock, ArrowLeft, Mail, AlertTriangle } from "lucide-react";
import ComponentInput from "@/components/common/FormInput";
import ComponetButton from "@/components/common/button";
import logo from "../../assets/logo/logo-azul.svg";
import { Link, useNavigate } from "react-router-dom";
import SliderComponent from "@/components/SliderComponent";
import { loginSchema } from "@/types/type";
import { useAuth } from "@/context/AuthContext";
import { setCache } from "@/lib/Cache";

// import Facebook from "../../assets/icons/Facebook.svg";
// import apple from "../../assets/icons/apple.svg";
// import google from "../../assets/icons/google.svg";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login, updateLastPath } = useAuth();

  const handleLogin = async (e?: FormEvent) => {
    e?.preventDefault();
    setIsLoading(true);
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const newErrors = result.error.format();
      setErrors({
        email: newErrors.email?._errors[0] || "",
        password: newErrors.password?._errors[0] || "",
      });
      setIsLoading(false);
      return;
    }

    try {
      setLoginError("");
      const userData = await login(email, password);
      let route = "";
   if (Number(password) === 123 || Number(password) === 1234 || Number(password) === 12345) {
        const userData = await login(email, password);
        let route = "";
        switch (Number(password)) {
        case 123:
          route = "/admin/dashboard";
          break;
        case 1234:
          route = "/secretary/dashboard";
          break;
        case 12345:
          route = "/analysis/dashboard";
          break;
        default:
          route = "/user/not-found";
      }

        updateLastPath(route);
        navigate(route);
        setErrors({ email: "", password: "" });
      } else {
        setLoginError("Email ou senha incorretos");
      }
      // Exemplo de redirecionamento conforme tipo de usuário
    
    
  
    } catch (error: any) {
      setLoginError("Email ou senha incorretos");
      setTimeout(() => {
        setLoginError("");
        setErrors({ email: "", password: "" });
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setCache("Change_Resert_Password", null);
    setCache("Change_Email_Register", null);
    setCache("Change_Email_Resert_Password", null);
  }, []);

  useEffect(() => {
    setErrors((prev) => ({ ...prev, email: "" }));
  }, [email]);

  useEffect(() => {
    setErrors((prev) => ({ ...prev, password: "" }));
  }, [password]);

  return (
    <div className="flex min-h-screen">
      <SliderComponent />
      <button
        onClick={() => (window.location.href = "/")}
        className="absolute bg-white top-5 left-5 text-black p-2 hover:bg-gray-200 rounded-full z-50 cursor-pointer"
      >
        <ArrowLeft size={24} />
      </button>
      <div className="w-full lg:w-1/2 flex items-center relative justify-center overflow-y-auto h-auto px-4 md:px-8">
        <div className="px-4 md:px-8 w-full">
          <div className="flex justify-center">
            <img src={logo} alt="Logo" className="w-auto" />
          </div>
          <div className="mb-8 my-8">
            <h2 className="text-2xl mb-2">Acesso ao Sistema Administrativo</h2>
            <p className="text-sm">
              Bem-vindo! Faça login para gerenciar serviços, notícias e
              compromissos
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-4 flex items-center gap-2 border border-red-500 text-red-600 rounded bg-red-50">
              <AlertTriangle className="w-6 h-6" />
              <span>Erro ao efetuar login: {loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <ComponentInput
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={Mail}
                label="Email"
                name="email"
                error={errors.email}
                underline
              />
            </div>
            <div className="mb-6">
              <ComponentInput
                type="password"
                placeholder="Digite a sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={Lock}
                label="Senha"
                name="senha"
                underline
                error={errors.password}
              />
            </div>
            <div className="flex justify-between my-6 items-center mt-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Lembre-me
              </label>
              <Link
                to="/recover-password/change-email"
                className="text-[#1F628E] hover:underline"
              >
                Esqueci minha senha?
              </Link>
            </div>

            <ComponetButton
              type="submit"
              variant="outline"
              className="w-full"
              loading={isLoading}
            >
              Log in
            </ComponetButton>
          </form>

          {/* <p className="text-center text-gray-400 mt-6">ou continue com</p>
          <div className="flex justify-center space-x-6 mt-4">
            <button className="cursor-pointer">
              <img className="cursor-default" src={Facebook} alt="" />
            </button>
            <button className="cursor-pointer">
              <img className="cursor-default" src={apple} alt="" />
            </button>
            <button className="cursor-pointer">
              <img className="cursor-default" src={google} alt="" />
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
