import { EndpointConfig, endpoints } from "../types/apiConfig";
import { useApiQuery, useApiMutation } from "../services/apiClient";
import { UseQueryResult, UseMutationResult } from "@tanstack/react-query";
import { ContactsResponse, Notification } from "@/types/services";

// Sobrecargas para a função createApiHook:

// Para endpoints GET
export function createApiHook<T, U = unknown>(
  endpoint: { method: "GET"; path: string },
  onSuccessCallback?: () => void
): (enabled?: boolean) => UseQueryResult<T, Error>;

// Para endpoints que não são GET
export function createApiHook<T, U = unknown>(
  endpoint: Exclude<EndpointConfig, { method: "GET" }>,
  onSuccessCallback?: () => void
): () => UseMutationResult<T, Error, U>;

// Implementação
export function createApiHook<T, U = unknown>(
  endpoint: EndpointConfig,
  onSuccessCallback?: () => void
) {
  if (endpoint.method === "GET") {
    return function useDynamicQuery(enabled: boolean = true) {
      return useApiQuery<T>([endpoint.path], endpoint.path, enabled);
    };
  } else {
    return function useDynamicMutation() {
      return useApiMutation<T, U>(
        endpoint.method,
        endpoint.path,
        onSuccessCallback
      );
    };
  }
}

// Hook para autenticação (POST /users/authenticate)
export const useAuthenticateUser = createApiHook<
  {
    code: number;
    message: string;
    result: {
      token: string;
      type: number;
    };
  },
  { email: string; password: string }
>(endpoints.users.authenticate);

export const useReceiveCode = createApiHook<
  { code: number; message: string },
  { email: string }
>(endpoints.users.receiveCode);

export const useRecoverPassworde = createApiHook<
  { code: number; message: string },
  { email: string; code: string; newPassword: string }
>(endpoints.users.recoverPassword);

export const useGetUser = createApiHook<{
  code: number;
  message: string;
  result: {
    name: string;
    email: string;
    telephone: string;
    photo: string;
    gender: string;
    path: string;
    password: string;
    type: number;
    id_user: number;
    latitude: string;
    longitude: string;
    created_in: string;
    access_token: string;
    Settings: {
      language: string;
      id_user: number;
      location: string;
      id_setting: number;
      theme: number;
    };
  };
}>(endpoints.users.getAll);

export const useUploadPhoto = createApiHook<
  {
    code: number;
    message: string;
    result: { url: string };
  },
  FormData
>(endpoints.users.uploadPhoto);

export const useEditPassword = createApiHook<
  {
    code: number;
    message: string;
    result: {
      token: string;
      type: number;
    };
  },
  {
    newPassword: string;
    oldPassword: string;
  }
>(endpoints.users.passwordEdit);

export const useChangeEmail = createApiHook<
  { code: number; message: string }, // resposta esperada
  { newEmail: string; code: string; password: string } // corpo da requisição
>(endpoints.users.changeEmail);
export const useUpdateUser = createApiHook<
  { code: number; message: string },
  {
    name: string;
    email: string;
    telephone: string;
    password: string;
    language: string;
    photo: string;
    gender: string;
    latitude: string;
    longitude: string;
    theme: number;
    location: string;
    subscriber: boolean;
  }
>(endpoints.users.update);

// Exporta o hook para registro (POST /users/register)
export const useRegisterUser = createApiHook<
  {
    code: number;
    message: string;
    result: {
      token: string;
      type: number;
    };
  },
  {
    name: string;
    email: string;
    telephone: string;
    password: string;
    language: string;
    photo: string;
    code: string;
    gender: string;
  }
>(endpoints.users.register);

// DELETE /users - Delete user account
export const useDeleteUser = createApiHook<
  { code: number; message: string },
  { id_user: string }
>(endpoints.users.delete);

// DELETE /notifications - Delete a notification
export const useDeleteNotification = createApiHook<
  { code: number; message: string },
  { id_notification: number }
>(endpoints.notifications.delete);

// PUT /notifications - Read notifications (mark as read)
export const useReadNotifications = createApiHook<
  { code: number; message: string },
  { id_notification: number }
>(endpoints.notifications.update);

// GET /notifications - View notifications by user
export const useGetNotifications = createApiHook<{
  message: string;
  code: number;
  result: Notification[];
}>(endpoints.notifications.get);
// GET /sectors - View all sectors

// Hook para registrar um novo contato (POST /contacts)
export const useRegisterContact = createApiHook<
  { code: number; message: string },
  { email: string; description: string }
>(endpoints.contacts.create);

// Hook para deletar um contato (DELETE /contacts)
export const useDeleteContact = createApiHook<
  { code: number; message: string },
  { id_contact: number }
>(endpoints.contacts.delete);

// Hook para obter todos os contatos (GET /contacts)
export const useGetContacts = createApiHook<ContactsResponse>(
  endpoints.contacts.getAll
);

// Hook para enviar uma resposta a um contato (POST /contacts/response)
export const useSendContactResponse = createApiHook<
  { code: number; message: string },
  { email: string; description: string }
>(endpoints.contacts.respond);
