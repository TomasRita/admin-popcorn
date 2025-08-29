import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ImageOff } from "lucide-react";

const PerfilEmpresa: React.FC = () => {
  const { nome } = useParams<{ nome: string }>();
  const navigate = useNavigate();

  // Mock data; replace with API call or hook
  const empresa = {
    nome: nome || "Tis Tech", // Fallback if nome is undefined
    sector: "Tecnologia",
    about:
      "A TIS é uma empresa de consultoria organizacional e integração de sistemas angolana, sediada em Luanda desde 2013. A nossa missão: fornecer soluções abrangentes de transformações organizacionais à tecnologia da informação, com especialistas nacionais e estrangeiros. Operamos local e internacionalmente, mantendo o know-how actualizado. Impulsionamos Angola e África com comprometimento sendo catalisadores para o avanço e prosperidade da região. Este ano assinalamos uma década de excelência tecnológica! A liderar a transformação digital em Angola, expandimos o nosso alcance para os mercados internacionais. O nosso compromisso com a inovação e a qualidade continua a impulsionar-nos",
    description:
      "A TIS é uma empresa de consultoria organizacional e integração de sistemas. Fundada em 2010, a empresa tem se destacado por oferecer soluções inovadoras para o mercado angolano, com foco em tecnologia e sustentabilidade.",
    logoUrl: "/assets/tistech-logo.png",
    videoUrl: "/assets/tistech-video1.mp4",
    videoUrl2: "/assets/tistech-video2.mp4",
    investimentoMin: "AOA 20.000,00",
    retorno: "12 a 18 meses",
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-800 p-4 sm:p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-sm cursor-pointer text-gray-500 dark:text-gray-400 mb-4 hover:text-gray-700 dark:hover:text-gray-200"
      >
        <ArrowLeft className="mr-2" size={20} /> Voltar
      </button>
      <div className="my-8">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6">
          {empresa.logoUrl ? (
            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
              <img
                src={empresa.logoUrl}
                alt={empresa.nome}
                className="w-40 h-40 rounded-lg object-cover"
              />
            </div>
          ) : (
            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg flex items-center justify-center">
              <ImageOff className="w-40 h-40 text-gray-400 dark:text-gray-500" />
            </div>
          )}
          <div>
            <h1 className="text-4xl font-semibold">{empresa.nome}</h1>
          </div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {empresa.sector}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
        <div>
          <div className="mb-6">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {empresa.about}
            </p>
          </div>
          <video
            src={empresa.videoUrl}
            controls
            className="w-full rounded-lg max-w-full h-auto"
            title="Vídeo 1"
          />
        </div>

        <div>
          <div className="mb-6">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {empresa.description}
            </p>
          </div>
          <video
            src={empresa.videoUrl2}
            controls
            className="w-full rounded-lg max-w-full h-auto"
            title="Vídeo 2"
          />
        </div>
      </div>
      <div className="mt-6 sm:mt-8">
        <h2 className="text-lg font-medium mb-4">Detalhes</h2>
        <div className="flex flex-col gap-2 text-sm text-gray-700 dark:text-gray-300">
          <span>
            Investimento mínimo:{" "}
            <strong>{empresa.investimentoMin || "Não especificado"}</strong>
          </span>
          <span>
            Retorno: <strong>{empresa.retorno || "Não especificado"}</strong>
          </span>
        </div>
        <div className="flex justify-end">
          <button className="mt-4 sm:mt-6 cursor-pointer bg-teal-500 text-white px-4 sm:px-6 py-2 rounded-full hover:bg-teal-600">
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PerfilEmpresa;
