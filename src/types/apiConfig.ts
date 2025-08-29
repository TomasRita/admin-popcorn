// apiConfig.ts
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface EndpointConfig {
  method: HttpMethod;
  path: string;
}
export const endpoints = {
  users: {
    register: { method: "POST" as const, path: "/users/register" },
    authenticate: { method: "POST" as const, path: "/users/authenticate" },
    receiveCode: { method: "POST" as const, path: "/users/receive-code" },
    recoverPassword: { method: "POST" as const, path: "/users/recover-password" },
    changeEmail: { method: "POST" as const, path: "/users/change-email" },
    passwordEdit: { method: "POST" as const, path: "/users/password-edit" },
    update: { method: "PUT" as const, path: "/users/update" },
    delete: { method: "DELETE" as const, path: "/users" },
    getView: { method: "GET" as const, path: "/users" },
    getAll: { method: "GET" as const, path: "/users/view-a" },
    uploadPhoto: { method: "POST" as const, path: "/users/upload-photo" },
  },
  settings: {
    update: { method: "PUT" as const, path: "/settings" },
    get: { method: "GET" as const, path: "/settings" },
  },
  notifications: {
    update: { method: "PUT" as const, path: "/notifications" },
    delete: { method: "DELETE" as const, path: "/notifications" },
    get: { method: "GET" as const, path: "/notifications" },
  },
  mails: {
    send: { method: "POST" as const, path: "/mails" },
    delete: { method: "DELETE" as const, path: "/mails" },
    get: { method: "GET" as const, path: "/mails" },
    respond: { method: "POST" as const, path: "/mails/response" },
    getById: { method: "GET" as const, path: "/mails/{id_email}" },
  },
  workers: {
    create: { method: "POST" as const, path: "/workers" },
    update: { method: "PUT" as const, path: "/workers" },
    delete: { method: "DELETE" as const, path: "/workers" },
    getAll: { method: "GET" as const, path: "/workers" },
    getById: { method: "GET" as const, path: "/workers/{id_worker}" },
    generateLicense: { method: "POST" as const, path: "/workers/generate-license" },
  },
  sectors: {
    create: { method: "POST" as const, path: "/sectors" },
    update: { method: "PUT" as const, path: "/sectors" },
    delete: { method: "DELETE" as const, path: "/sectors" },
    getAll: { method: "GET" as const, path: "/sectors" },
    getById: { method: "GET" as const, path: "/sectors/{id_sector}" },
  },
  registrations: {
    create: { method: "POST" as const, path: "/registrations" },
    delete: { method: "DELETE" as const, path: "/registrations" },
    getAll: { method: "GET" as const, path: "/registrations" },
    getById: { method: "GET" as const, path: "/registrations/{id}" },
    viewByUser: { method: "GET" as const, path: "/registrations/view_by_user" },
    viewByWorker: { method: "GET" as const, path: "/registrations/view_by_worker" },
    approvalAndForwader: { method: "PUT" as const, path: "/registrations/approval_and_forwader" },
    uploadProofOfPayment: { method: "POST" as const, path: "/registrations/upload_proof_of_payment" },
  },
  institutions: {
    create: { method: "POST" as const, path: "/institutions" },
    update: { method: "PUT" as const, path: "/institutions" },
    delete: { method: "DELETE" as const, path: "/institutions" },
    getAll: { method: "GET" as const, path: "/institutions" },
    getById: { method: "GET" as const, path: "/institutions/{id}" },
  },
  services: {
    create: { method: "POST" as const, path: "/services" },
    update: { method: "PUT" as const, path: "/services" },
    delete: { method: "DELETE" as const, path: "/services" },
    getAll: { method: "GET" as const, path: "/services" },
    getById: { method: "GET" as const, path: "/services/{id}" },
  },
  contacts: {
    create: { method: "POST" as const, path: "/contacts" },
    delete: { method: "DELETE" as const, path: "/contacts" },
    getAll: { method: "GET" as const, path: "/contacts" },
    respond: { method: "POST" as const, path: "/contacts/response" },
    getById: { method: "GET" as const, path: "/contacts/{id}" },
  },
  news: {
    create: { method: "POST" as const, path: "/news" },
    update: { method: "PUT" as const, path: "/news" },
    delete: { method: "DELETE" as const, path: "/news" },
    getAll: { method: "GET" as const, path: "/news" },
    getById: { method: "GET" as const, path: "/news/{id}" },
  },
  comments: {
    create: { method: "POST" as const, path: "/comments" },
    update: { method: "PUT" as const, path: "/comments" },
    delete: { method: "DELETE" as const, path: "/comments" },
  },
  reactions: {
    create: { method: "POST" as const, path: "/reactions" },
    delete: { method: "DELETE" as const, path: "/reactions" },
  },
};
