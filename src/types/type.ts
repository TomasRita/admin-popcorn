import { z } from "zod";

// Validação para Login
export const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z
    .string()
    .nonempty("A senha é obrigatória")
    .max(16, "A senha deve ter no máximo 16 caracteres"),
});

export const registerSchema = z
  .object({
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    email: z.string().email("E-mail inválido"),
    password: z
      .string()
      .min(6, "A senha deve ter no mínimo 6 caracteres")
      .max(16, "A senha deve ter no máximo 16 caracteres"),
    confirmPassword: z.string(),
    dateOfBirth: z
      .string()
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        "Data de nascimento inválida (formato: YYYY-MM-DD)"
      ),
    gender: z.enum(["Masculino", "Feminino", "Outro"], {
      errorMap: () => ({ message: "Selecione um gênero válido" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  })
  .refine(
    (data) => {
      const birthDate = new Date(data.dateOfBirth);
      const now = new Date();
      const twelveYearsAgo = new Date(
        now.getFullYear() - 12,
        now.getMonth(),
        now.getDate()
      );
      return birthDate <= twelveYearsAgo;
    },
    {
      message: "A idade mínima é 12 anos",
      path: ["dateOfBirth"],
    }
  );

// Validação para Redefinir Senha
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, "A senha deve ter no mínimo 6 caracteres")
      .max(16, "A senha deve ter no máximo 16 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

// Validação para Código de Confirmação
export const confirmationCodeSchema = z.object({
  code: z
    .string()
    .length(4, "O código deve ter exatamente 4 dígitos")
    .regex(/^\d+$/, "O código deve conter apenas números"),
});

// Validação para Formulário de Contato
export const contactFormSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  description: z
    .string()
    .min(10, "A descrição deve ter pelo menos 10 caracteres"),
});

// Campos Individuais Reutilizáveis
export const fields = {
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  password: z
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .max(16, "A senha deve ter no máximo 16 caracteres"),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Data de nascimento inválida"),
  code: z
    .string()
    .length(4, "O código deve ter exatamente 4 dígitos")
    .regex(/^\d+$/, "O código deve conter apenas números"),
  description: z
    .string()
    .min(10, "A descrição deve ter pelo menos 10 caracteres"),
};
// Schema de validação com Zod
export const employeeSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  cargo: z.string().min(1, "Cargo é obrigatório"),
  license: z.string().min(1, "Licença é obrigatória"),
  // O input date retorna no formato "yyyy-mm-dd"
  expirationDate: z.string().min(1, "Data de expiração é obrigatória"),
  institution: z.string().min(1, "Instituição é obrigatória"),
});
export const sectorAdminSchema = z.object({
  adminName: z.string().min(1, { message: "O nome é obrigatório" }),
  email: z.string().email({ message: "E-mail inválido" }),
  sectorResponsavel: z
    .string()
    .min(1, { message: "O setor responsável é obrigatório" }),
  license: z.string().min(1, { message: "A licença é obrigatória" }),
  expirationDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Data de expiração deve estar no formato yyyy-mm-dd",
    })
    .transform((val) => {
      // Converte de "yyyy-mm-dd" para "dd-mm-yyyy"
      const [year, month, day] = val.split("-");
      return `${day}-${month}-${year}`;
    }),
});

export const institutionSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  latitude: z.string().min(1, "Latitude é obrigatória"),
  longitude: z.string().min(1, "Longitude é obrigatória"),
  address: z.string().min(1, "Endereço é obrigatório"),
  opening_hours: z.string().min(1, "Horário de funcionamento é obrigatório"),
  service_days: z.string().min(1, "Dias de serviço são obrigatórios"),
  icon: z.string().min(1, "Ícone é obrigatório"),
  status: z
    .union([z.literal("Ativo"), z.literal("Inativo")])
    .transform((val) => (val === "Ativo" ? 1 : 0)),
  id_sector: z.number(),
  daily_customer_number: z.number(),
});

export const registrationSchema = z.object({
  selectedServiceId: z.string().min(1, "Selecione um serviço"),
  patientName: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  phoneNumber: z
    .string()
    .regex(
      /^(\+?\d{1,3})?\d{9,12}$/,
      "Número inválido. Deve ter o código do país e entre 9 e 12 dígitos"
    ),
});
