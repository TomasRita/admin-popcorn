export const pageTitles: Record<
  string,
  { title: string; description: string }
> = {
  // Rotas para Administradores (atualizadas com base em menuItems)
  "/admin/dashboard": {
    title: "Painel",
    description: "Visão geral e principais indicadores da administração.",
  },
  "/admin/startups": {
    title: "Startups",
    description: "Gerencie as startups registradas na plataforma.",
  },
  "/admin/franchise": {
    title: "Franquia",
    description: "Administre as franquias e suas configurações.",
  },
  "/admin/management": {
    title: "Gestão",
    description: "Ferramentas para gestão administrativa da plataforma.",
  },
  "/admin/approval": {
    title: "Aprovação",
    description: "Revise e aprove solicitações pendentes.",
  },
  "/admin/edit-site": {
    title: "Editar Site",
    description: "Personalize e edite o conteúdo do site.",
  },
  "/admin/report": {
    title: "Relatório",
    description: "Acesse relatórios detalhados da plataforma.",
  },
  "/admin/settings": {
    title: "Configurações",
    description: "Gerencie as configurações e preferências da sua conta.",
  },
  "/admin/contact": {
    title: "Contacto",
    description: "Gerencie mensagens, respostas e envios de SMS dos contactos.",
  },

  //
  // Rotas Secretary
  //
  "/secretary/dashboard": {
    title: "Painel",
    description: "Visão geral e principais indicadores da secretaria.",
  },
  "/secretary/pending": {
    title: "Pendente",
    description: "Visualize e gerencie tarefas pendentes.",
  },
  // rota dinâmica: perfil da empresa (usar startsWith para resolver)
  "/secretary/company/profile/:id": {
    title: "Perfil da Empresa",
    description: "Detalhes e edição do perfil da empresa.",
  },
  "/secretary/notifications": {
    title: "Notificações",
    description: "Acompanhe notificações e alertas da plataforma.",
  },
  "/secretary/messages": {
    title: "Mensagens",
    description: "Converse e gerencie mensagens recebidas e enviadas.",
  },
  "/secretary/inbox": {
    title: "Recebidos",
    description: "Lista de itens recebidos e pendentes de processamento.",
  },
  "/secretary/documents": {
    title: "Documentos",
    description: "Lista de documentos, pesquisas e ficheiros administrativos.",
  },
  "/secretary/tasks": {
    title: "Tarefas",
    description: "Gerencie e acompanhe as tarefas atribuídas.",
  },
  "/secretary/settings": {
    title: "Configurações",
    description: "Gerencie as configurações e preferências da sua conta.",
  },

  //
  // Rotas Analysis
  //
  "/analysis/dashboard": {
    title: "Painel",
    description: "Visão geral e principais indicadores da análise.",
  },
  "/analysis/notifications": {
    title: "Notificações",
    description: "Acompanhe notificações e alertas do setor de análise.",
  },
  "/analysis/pending": {
    title: "Pendente",
    description: "Visualize e gerencie tarefas pendentes de análise.",
  },
  "/analysis/company": {
    title: "Empresa",
    description: "Cadastro e gestão das informações da empresa (análise).",
  },
  "/analysis/company/profile/:id": {
    title: "Perfil da Empresa",
    description: "Detalhes e histórico da empresa para análise.",
  },
  "/analysis/franchise": {
    title: "Franquia",
    description: "Administre franquias no contexto de análise.",
  },
  "/analysis/startups": {
    title: "Startups",
    description: "Lista e métricas de startups para análise.",
  },
  "/analysis/settings": {
    title: "Configurações",
    description:
      "Gerencie as configurações e preferências da conta de análise.",
  },
};
