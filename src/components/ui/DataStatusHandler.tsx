// components/common/DataStatusHandler.tsx
import { Loader2, AlertTriangle } from "lucide-react";
import ComponetButton from "../common/button";

interface DataStatusHandlerProps {
  isLoading: boolean;
  error: any;
  onRetry: () => void;
  children: React.ReactNode;
}

export function DataStatusHandler({
  isLoading,
  error,
  onRetry,
  children,
}: DataStatusHandlerProps) {
  return (
    <div className="relative min-h-[55vh]">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 dark:bg-gray-900/50">
          <div className="flex flex-col items-center gap-3 text-[#3683FF]">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="font-medium">Carregando...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center justify-center p-8 text-center h-full">
          <div className="max-w-md ">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Ocorreu um erro!
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {error.message || "Erro ao carregar os dados"}
            </p>
            <ComponetButton
              variant="secondary"
              onClick={onRetry}
              className="mt-2"
            >
              Tentar novamente
            </ComponetButton>
          </div>
        </div>
      )}

      {!isLoading && !error && children}
    </div>
  );
}
