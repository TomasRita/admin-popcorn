// DashboardMenu.tsx
import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import { BookOpen, Heart, Zap, Clock } from "lucide-react";
import { parseDate } from "@/lib/utils";

interface NewsItemData {
  id: number;
  title: string;
  likes: number;
  publishedAt: string;
  category: string;
}

interface DashboardMenuProps {
  publications: NewsItemData[];
}

const DashboardMenu: React.FC<DashboardMenuProps> = ({ publications }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const gradientRef = useRef<CanvasGradient | null>(null);

  // Configuração do gradiente
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        gradientRef.current = ctx.createLinearGradient(0, 0, 0, 400);
        gradientRef.current.addColorStop(0, "#FF9E0133");
        gradientRef.current.addColorStop(1, "#FF9E0100");
      }
    }
    return () => {
      gradientRef.current = null;
    };
  }, [publications]);

  // Configuração do gráfico
  useEffect(() => {
    if (chartRef.current && gradientRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: publications.map((p) => parseDate(p.publishedAt)),
            datasets: [
              {
                label: "Curtidas",
                data: publications.map((p) => p.likes),
                borderColor: "#FF9E01",
                backgroundColor: gradientRef.current,
                fill: true,
                tension: 0.4,
                pointRadius: 4, // Exibe os pontos (dots)
                pointHoverRadius: 6, // Pontos maiores ao passar o mouse
                pointBackgroundColor: "#FF9E01",
                borderWidth: 3,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: "#1F2937",
                titleColor: "#F9FAFB",
                bodyColor: "#E5E7EB",
                borderColor: "#374151",
                borderWidth: 1,
                padding: 12,
                cornerRadius: 8,
              },
            },
            scales: {
              x: {
                grid: { display: false },
                ticks: {
                  color: "#6B7280",
                  maxRotation: 0,
                  autoSkip: true,
                  maxTicksLimit: 6,
                },
              },
              y: {
                grid: { color: "#F3F4F6" },
                ticks: { color: "#6B7280" },
              },
            },
          },
        });
      }
    }
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [publications]);

  // Dados estatísticos
  const totalPublications = publications.length;
  const totalLikes = publications.reduce((sum, pub) => sum + pub.likes, 0);
  const latestPublication = publications[publications.length - 1];

  return (
    <div className="p-4 bg-white rounded-xl w-full shadow-sm dark:bg-gray-900 transition-colors duration-300 mb-16">
      {/* Cabeçalho */}
      <div className="flex flex-col mb-6 gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            Estatísticas de Engajamento
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Desempenho das publicações em tempo real
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#FF9E01] bg-[#FF9E01]/10 px-3 py-1.5 rounded-full transition-all hover:bg-[#FF9E01]/20">
          <Zap size={16} className="shrink-0" />
          <span>Atualização Contínua</span>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid gap-4 mb-8 md:grid-cols-1 xl:grid-cols-3">
        <StatCard
          icon={<BookOpen className="text-[#FF9E01] w-5 h-5" />}
          title="Publicações"
          value={totalPublications}
          trend="+12% vs último mês"
        />
        <StatCard
          icon={<Heart className="text-red-500 w-5 h-5" />}
          title="Curtidas"
          value={totalLikes.toLocaleString()}
          trend="+24% engajamento"
        />
        <StatCard
          icon={<Clock className="text-blue-500 w-5 h-5" />}
          title="Última Publicação"
          value={latestPublication?.title || "-"}
          subtitle={
            latestPublication ? parseDate(latestPublication.publishedAt) : "-"
          }
        />
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl mb-8 overflow-x-auto max-w-full">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Evolução de Curtidas
        </h3>
        <div className="relative h-64 sm:h-72 lg:h-80 overflow-x-auto">
          <canvas ref={chartRef} />
        </div>
      </div>

      {/* Atividades Recentes */}
      <div className="w-full">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Últimas Atividades
        </h2>
        <div className="space-y-2">
          {publications
            .slice(-3)
            .reverse()
            .map((pub) => (
              <div
                key={pub.id}
                className="flex flex-wrap items-center justify-between p-3 rounded-lg bg-white dark:bg-gray-800 shadow-xs hover:shadow-sm transition-all"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {pub.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {pub.category} • {parseDate(pub.publishedAt)}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[#FF9E01] ml-4 md:ml-2 mt-2 md:mt-0">
                  <Heart size={14} className="shrink-0" />
                  <span className="font-medium text-sm">
                    {pub.likes.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, subtitle, trend }: any) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xs hover:shadow-sm transition-all">
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-[#FF9E01]/10">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{title}</p>
        <p className="text-xl font-bold text-gray-900 dark:text-white ">
          {value}
        </p>
        {subtitle && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ">
            {subtitle}
          </p>
        )}
        {trend && (
          <span className="text-xs text-[#FF9E01] dark:text-[#FFB347] mt-1 block">
            {trend}
          </span>
        )}
      </div>
    </div>
  </div>
);

export default DashboardMenu;
