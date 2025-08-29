import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, Line } from "react-chartjs-2";
import { Zap, Users, XCircle, Clock, ImageOff } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";
import { useLocation, useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const getPieData = (darkMode: boolean) => ({
  labels: ["Tech", "Beleza", "Agro", "Cloud e rede"],
  datasets: [
    {
      data: [45, 15, 25, 15],
      backgroundColor: darkMode
        ? [
            "rgba(255, 255, 255, 0.8)", // White-based for dark mode
            "rgba(200, 200, 200, 0.8)",
            "rgba(180, 180, 180, 0.8)",
            "rgba(220, 220, 220, 0.8)",
          ]
        : [
            "rgba(249, 205, 68, 0.8)", // Tech (amarelo)
            "rgba(168, 85, 247, 0.8)", // Beleza (roxo)
            "rgba(239, 68, 68, 0.8)", // Agro (vermelho)
            "rgba(59, 130, 246, 0.8)", // Cloud e rede (azul)
          ],
      borderWidth: 0,
    },
  ],
});

const getAreaData = (darkMode: boolean) => ({
  labels: months,
  datasets: [
    {
      label: "Aprovadas",
      data: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160],
      tension: 0.4,
      fill: true,
      backgroundColor: darkMode
        ? "rgba(255, 255, 255, 0.2)"
        : "rgba(45, 212, 191, 0.2)",
      borderColor: darkMode
        ? "rgba(255, 255, 255, 1)"
        : "rgba(45, 212, 191, 1)",
    },
    {
      label: "Rejeitadas",
      data: [20, 30, 25, 40, 35, 45, 50, 55, 60, 65, 70, 75],
      tension: 0.4,
      fill: true,
      backgroundColor: darkMode
        ? "rgba(200, 200, 200, 0.2)"
        : "rgba(30, 64, 175, 0.2)",
      borderColor: darkMode ? "rgba(200, 200, 200, 1)" : "rgba(30, 64, 175, 1)",
    },
  ],
});

const StartupsPage: React.FC = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const metrics = [
    {
      label: "Total Startups",
      value: "45 563",
      icon: <Zap />,
      diff: "+55%",
      color: "text-green-500",
    },
    {
      label: "Startups aprovadas",
      value: "535",
      icon: <Users />,
      diff: "+5%",
      color: "text-green-500",
    },
    {
      label: "Startups rejeitadas",
      value: "99",
      icon: <XCircle />,
      diff: "–",
      color: "text-red-500",
    },
    {
      label: "Tempo médio de crescimento",
      value: "2 dias",
      icon: <Clock />,
      diff: "",
      color: "",
    },
  ];

  const startups = [
    {
      name: "Agrobiz",
      email: "agrobiz@simmmple.com",
      sector: "Agricultura",
      status: "Activa",
      date: "16:05 – 15/05/2025",
      market: "$14 000",
      variation: "+20%",
      photoUrl: "https://example.com/agrobiz.jpg",
    },
    {
      name: "Arpla",
      email: "arpla@simmmple.com",
      sector: "Agricultura",
      status: "Activa",
      date: "16:05 – 15/05/2025",
      market: "$14 000",
      variation: "+20%",
      photoUrl: null,
    },
    {
      name: "Fertiangola",
      email: "fertiangola@simmmple.com",
      sector: "Agricultura",
      status: "Activa",
      date: "16:05 – 15/05/2025",
      market: "$14 000",
      variation: "+20%",
      photoUrl: "https://example.com/fertiangola.jpg",
    },
    {
      name: "Kima Kudi",
      email: "kima@simmmple.com",
      sector: "Agricultura",
      status: "Activa",
      date: "16:05 – 15/05/2025",
      market: "$14 000",
      variation: "+20%",
      photoUrl: null,
    },
    {
      name: "Socamia",
      email: "socamia@simmmple.com",
      sector: "Agricultura",
      status: "Activa",
      date: "16:05 – 15/05/2025",
      market: "$14 000",
      variation: "+20%",
      photoUrl: "https://example.com/socamia.jpg",
    },
    {
      name: "Sodioa",
      email: "sodioa@simmmple.com",
      sector: "Agricultura",
      status: "Activa",
      date: "16:05 – 15/05/2025",
      market: "$14 000",
      variation: "+20%",
      photoUrl: null,
    },
  ];

  const handleVerDetalhes = (nome: string) => {
    const url = location.pathname.includes("admin");
    const url2 = location.pathname.includes("analysis");
    if (url) {
      navigate(`/admin/startup/profile/${encodeURIComponent(nome)}`);
    } else if (url2) {
      navigate(`/analysis/startup/profile/${encodeURIComponent(nome)}`);
    } else {
      navigate(`/secretary/startup/profile/${encodeURIComponent(nome)}`);
    }
  };

  const pieData = getPieData(darkMode);
  const areaData = getAreaData(darkMode);

  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-800 space-y-8 p-4 sm:p-6">
      {/* 1) Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow flex items-center justify-between"
          >
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {m.label}
              </p>
              <h3 className="text-lg sm:text-xl font-semibold mt-1">
                {m.value}
              </h3>
              {m.diff && (
                <p className={`text-xs mt-1 ${m.color}`}>
                  {m.diff} desde mês passado
                </p>
              )}
            </div>
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              {React.cloneElement(m.icon, {
                size: 20,
                className: darkMode ? "text-blue-400" : "text-blue-500",
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 2) Lista de cadastrados */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-6 shadow overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Lista de cadastrados</h2>
          <p className="text-xs text-green-500">✔ 30 Registros este mês</p>
        </div>
        <table className="w-full text-left text-sm min-w-[640px]">
          <thead>
            <tr className="text-xs text-gray-500 dark:text-gray-400 uppercase border-b">
              <th className="py-2 px-2">Photo</th>
              <th className="py-2 px-2">Nome da Startup</th>
              <th className="py-2 px-2">Sector</th>
              <th className="py-2 px-2">Estados</th>
              <th className="py-2 px-2">Data</th>
              <th className="py-2 px-2">Valor de mercado</th>
              <th className="py-2 px-2">Variação</th>
              <th className="py-2 px-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {startups.map((s) => (
              <tr key={s.name}>
                <td className="py-3 px-2">
                  {s.photoUrl ? (
                    <img
                      src={s.photoUrl}
                      alt={s.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <ImageOff className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                  )}
                </td>
                <td className="py-3 px-2">
                  <div className="flex flex-col">
                    <span className="font-medium">{s.name}</span>
                    <span className="text-gray-400 dark:text-gray-500 text-xs">
                      {s.email}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-2">{s.sector}</td>
                <td className="py-3 px-2">
                  <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full">
                    {s.status}
                  </span>
                </td>
                <td className="py-3 px-2 text-gray-500 dark:text-gray-400">
                  {s.date}
                </td>
                <td className="py-3 px-2 font-semibold">{s.market}</td>
                <td className="py-3 px-2">{s.variation}</td>
                <button
                  onClick={() => handleVerDetalhes(s.name)}
                  className="text-gray-500 dark:text-gray-600 cursor-pointer hover:underline"
                >
                  Ver detalhes
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 3) Gráfico de pizza e área */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-6 shadow">
          <h3 className="text-sm font-medium mb-4">Gráfico</h3>
          <div className="h-64 sm:h-72">
            <Pie
              data={pieData}
              options={{
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: {
                      boxWidth: 12,
                      padding: 16,
                      color: darkMode ? "#ffffff" : "#000000",
                    },
                  },
                },
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>

        {/* Area Chart */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-6 shadow">
          <h3 className="text-sm font-medium mb-2">Crescimento vs Rejeições</h3>
          <p className="text-xs text-green-500 mb-4">(+5) mais do que 2021</p>
          <div className="h-64 sm:h-72">
            <Line
              data={areaData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: {
                      color: darkMode ? "#ffffff" : "#000000",
                    },
                  },
                },
                scales: {
                  x: { grid: { display: false } },
                  y: {
                    grid: {
                      color: darkMode ? "rgba(255, 255, 255, 0.1)" : "#F0F0F0",
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupsPage;
