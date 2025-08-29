import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { ArrowUpRight, BookOpen, Users, Clock } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardFull: React.FC = () => {
  const { darkMode } = useTheme(); // Use the theme hook

  const cards = [
    {
      label: "Total Startup",
      value: "45 563",
      icon: <ArrowUpRight />,
      diff: "+55%",
    },
    {
      label: "Total Franquia",
      value: "3 000",
      icon: <BookOpen />,
      diff: "+5%",
    },
    { label: "Startups aprovadas", value: "535", icon: <Users />, diff: "+5%" },
    { label: "Tempo médio", value: "24h", icon: <Clock />, diff: "" },
  ];

  const companies = [
    {
      name: "Agrobiz",
      sent: "16:05 - 15/05/2025",
      sector: "Agricultura",
      market: "$14 000",
      variation: "+20%",
      status: "Activa",
    },
    {
      name: "Alcaa­l",
      sent: "16:05 - 15/05/2025",
      sector: "Agricultura",
      market: "$14 000",
      variation: "+20%",
      status: "Activa",
    },
    {
      name: "Fertiangola",
      sent: "16:05 - 15/05/2025",
      sector: "Agricultura",
      market: "$14 000",
      variation: "+20%",
      status: "Activa",
    },
    {
      name: "Kima Kudi",
      sent: "16:05 - 15/05/2025",
      sector: "Agricultura",
      market: "$14 000",
      variation: "+20%",
      status: "Activa",
    },
    {
      name: "Socamia",
      sent: "16:05 - 15/05/2025",
      sector: "Beleza",
      market: "$14 000",
      variation: "+20%",
      status: "Activa",
    },
    {
      name: "Suelta",
      sent: "16:05 - 15/05/2025",
      sector: "Cloud e rede",
      market: "$14 000",
      variation: "+20%",
      status: "Activa",
    },
  ];

  // Dynamic chart data based on darkMode
  const chartData = {
    labels: ["", "100", "200", "300", "400", "500"],
    datasets: [
      {
        data: [150, 80, 120, 300, 450, 380, 240],
        barThickness: 8,
        backgroundColor: darkMode
          ? "rgba(255, 255, 255, 0.2)"
          : "rgba(59, 130, 246, 0.2)",
        borderColor: darkMode ? "rgba(255, 255, 255, 1)" : "rgba(59, 130, 246, 1)",
      },
    ],
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-800 space-y-8 p-6">
      {/* 1) Top Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((c) => (
          <div
            key={c.label}
            className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow flex items-center justify-between"
          >
            <div>
              <p className="text-xs text-gray-500">{c.label}</p>
              <h3 className="text-xl font-semibold mt-1">{c.value}</h3>
              {c.diff && (
                <p
                  className={`text-xs mt-1 ${
                    c.diff.startsWith("+") ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {c.diff} desde ontem
                </p>
              )}
            </div>
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              {React.cloneElement(c.icon, {
                size: 20,
                className: darkMode ? "text-blue-400" : "text-blue-500",
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 3) Table + Side Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tabela de Empresas (spans 2 col) */}
        <div className="col-span-2 bg-white dark:bg-gray-900 rounded-2xl p-6 shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Empresas</h2>
            <p className="text-xs text-green-500">
              (+5) registros do que ontem
            </p>
          </div>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs text-gray-500 dark:text-gray-400 uppercase border-b">
                <th className="py-2">Nome</th>
                <th className="py-2">Data de envio</th>
                <th className="py-2">Sector</th>
                <th className="py-2">Valor de mercado</th>
                <th className="py-2">Variação</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {companies.map((c) => (
                <tr key={c.name}>
                  <td className="py-3">{c.name}</td>
                  <td className="py-3 text-gray-500 dark:text-gray-400">{c.sent}</td>
                  <td className="py-3">{c.sector}</td>
                  <td className="py-3 font-semibold">{c.market}</td>
                  <td className="py-3">{c.variation}</td>
                  <td className="py-3">
                    <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full">
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Side-cards */}
        <div className="space-y-6">
          {/* Pedidos */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow">
            <h3 className="text-sm font-semibold mb-4">Pedidos</h3>
            <ul className="space-y-3 text-sm">
              {["Tis", "Africell"].map((name) => (
                <li key={name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded" />{" "}
                    {/* placeholder logo */}
                    <span>{name}</span>
                  </div>
                  <button className="text-blue-600 dark:text-blue-400 text-xs">analisar</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Crescimento gradual */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 shadow text-white">
            <h3 className="text-sm font-semibold mb-4">Crescimento gradual</h3>
            <div className="h-40">
              <Bar
                data={chartData}
                options={{
                  plugins: { legend: { display: false } },
                  scales: {
                    x: { display: false },
                    y: {
                      grid: {
                        display: false,
                      },
                    },
                  },
                  maintainAspectRatio: false,
                  elements: { bar: { borderRadius: 4 } },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardFull;