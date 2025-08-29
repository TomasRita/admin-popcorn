import React, { useState } from "react";
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
import { Bar, Line } from "react-chartjs-2";
import {
  ArrowUpRight,
  BookOpen,
  Users,
  Tag,
  ImageOff,
} from "lucide-react";
import FilterSearchBar from "@/components/common/SearchFilterBar";
import { useTheme } from "@/context/ThemeProvider";

// FilterSearchBar component
interface FilterOption {
  value: string;
  label: string;
}

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

// Sample data for each metric in "Usuários Activos" chart
const getChartData = (darkMode: boolean) => ({
  users: {
    labels: months,
    datasets: [
      {
        data: [200, 250, 300, 350, 320, 380, 420, 450, 480, 500, 550, 600],
        barThickness: 8,
        backgroundColor: darkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(59, 130, 246, 0.2)",
        borderColor: darkMode ? "rgba(255, 255, 255, 1)" : "rgba(59, 130, 246, 1)",
      },
    ],
    comparisonText: "(+23) do que semana passada",
    comparisonColor: "text-green-500",
    title: "Usuários",
  },
  clicks: {
    labels: months,
    datasets: [
      {
        data: [
          500, 600, 700, 800, 750, 900, 1000, 1100, 1200, 1300, 1400, 1500,
        ],
        barThickness: 8,
        backgroundColor: darkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(59, 130, 246, 0.2)",
        borderColor: darkMode ? "rgba(255, 255, 255, 1)" : "rgba(59, 130, 246, 1)",
      },
    ],
    comparisonText: "(-5) do que semana passada",
    comparisonColor: "text-red-500",
    title: "Clicks",
  },
  investments: {
    labels: months,
    datasets: [
      {
        data: [100, 120, 150, 180, 160, 200, 220, 240, 260, 280, 300, 320],
        barThickness: 8,
        backgroundColor: darkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(59, 130, 246, 0.2)",
        borderColor: darkMode ? "rgba(255, 255, 255, 1)" : "rgba(59, 130, 246, 1)",
      },
    ],
    comparisonText: "(+10) do que semana passada",
    comparisonColor: "text-green-500",
    title: "Investimentos",
  },
  actions: {
    labels: months,
    datasets: [
      {
        data: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160],
        barThickness: 8,
        backgroundColor: darkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(59, 130, 246, 0.2)",
        borderColor: darkMode ? "rgba(255, 255, 255, 1)" : "rgba(59, 130, 246, 1)",
      },
    ],
    comparisonText: "(+15) do que semana passada",
    comparisonColor: "text-green-500",
    title: "Ações",
  },
});

// Sample data for "Investimento" chart
const getAreaData = (darkMode: boolean) => ({
  startups: {
    labels: months,
    datasets: [
      {
        label: "Startups",
        data: [150, 200, 180, 230, 210, 260, 280, 300, 320, 340, 360, 380],
        tension: 0.4,
        fill: true,
        backgroundColor: darkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(59, 130, 246, 0.2)",
        borderColor: darkMode ? "rgba(255, 255, 255, 1)" : "rgba(59, 130, 246, 1)",
      },
    ],
    comparisonText: "(+5) mais do que 2021",
    comparisonColor: "text-green-500",
    title: "Startups",
  },
  franquias: {
    labels: months,
    datasets: [
      {
        label: "Franquias",
        data: [100, 150, 130, 180, 160, 210, 230, 250, 270, 290, 310, 330],
        tension: 0.4,
        fill: true,
        backgroundColor: darkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(45, 212, 191, 0.2)",
        borderColor: darkMode ? "rgba(255, 255, 255, 1)" : "rgba(45, 212, 191, 1)",
      },
    ],
    comparisonText: "(+3) mais do que 2021",
    comparisonColor: "text-green-500",
    title: "Franquias",
  },
});

const AdminDashboardScreen: React.FC = () => {
  const { darkMode} = useTheme(); // Use the theme hook
  const [selectedMetric, setSelectedMetric] = useState<
    "users" | "clicks" | "investments" | "actions"
  >("users");
  const [selectedArea, setSelectedArea] = useState<"startups" | "franquias">(
    "startups"
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("all");
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const chartData = getChartData(darkMode); // Pass darkMode to get dynamic chart data
  const areaData = getAreaData(darkMode); // Pass darkMode to get dynamic area data

  const filterOptions: FilterOption[] = [
    { value: "all", label: "All" },
    { value: "Startup", label: "Startup" },
    { value: "Franquia", label: "Franquia" },
  ];

  const toggleFilterDropdown = () => setIsFilterOpen(!isFilterOpen);
  const closeFilterDropdown = () => setIsFilterOpen(false);

  const handleMetricClick = (
    metric: "users" | "clicks" | "investments" | "actions"
  ) => {
    setSelectedMetric(metric);
  };

  const handleAreaClick = (area: "startups" | "franquias") => {
    setSelectedArea(area);
  };

  // Sample project data with photo URLs
  const projects = [
    {
      name: "Chakra Soft UI Version",
      type: "Startup",
      value: "$14,000",
      pct: 60,
      photoUrl: "https://example.com/chakra.jpg",
    },
    {
      name: "Add Progress Track",
      type: "Franquia",
      value: "$3,000",
      pct: 10,
      photoUrl: null,
    },
    {
      name: "Fix Platform Errors",
      type: "Startup",
      value: "Not set",
      pct: 100,
      photoUrl: "https://example.com/platform.jpg",
    },
    {
      name: "Launch our Mobile App",
      type: "Franquia",
      value: "$32,000",
      pct: 100,
      photoUrl: null,
    },
    {
      name: "Add the New Pricing Page",
      type: "Franquia",
      value: "$400",
      pct: 25,
      photoUrl: "https://example.com/pricing.jpg",
    },
    {
      name: "Redesign New Online Shop",
      type: "Franquia",
      value: "$7,600",
      pct: 40,
      photoUrl: null,
    },
  ];

  // Filter projects based on search term and filter type
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || project.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-800 p-6">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: "Total Startups",
            value: "53",
            diff: "+5%",
            icon: <ArrowUpRight />,
          },
          {
            label: "Total Franquias",
            value: "3.000",
            diff: "+5%",
            icon: <BookOpen />,
          },
          {
            label: "Total Usuários",
            value: "53.000",
            diff: "-13%",
            icon: <Users />,
          },
          {
            label: "Receita diária",
            value: "AOA 53.000",
            diff: "+85%",
            icon: <Tag />,
          },
        ].map((card) => (
          <div
            key={card.label}
            className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm flex items-center justify-between"
          >
            <div>
              <p className="text-xs text-gray-500">{card.label}</p>
              <h3 className="text-xl font-semibold mt-1">{card.value}</h3>
              <p
                className={`text-xs mt-1 ${
                  card.diff.startsWith("+") ? "text-green-500" : "text-red-500"
                }`}
              >
                {card.diff} desde mês passado
              </p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              {React.cloneElement(card.icon, {
                size: 20,
                className: "text-blue-500",
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Usuários Activos Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm">
          <div className="mb-4 h-50">
            <Sparkline data={chartData[selectedMetric]} />
          </div>
          <h4 className="text-sm font-medium">
            {chartData[selectedMetric].title}
          </h4>
          <p
            className={`text-xs ${chartData[selectedMetric].comparisonColor} mb-4`}
          >
            {chartData[selectedMetric].comparisonText}
          </p>
          <div className="grid grid-cols-4 gap-4 text-xs">
            {[
              { label: "Usuários", value: "32,984", key: "users" },
              { label: "Clicks", value: "2,42m", key: "clicks" },
              { label: "Investimentos", value: "2.400 kz", key: "investments" },
              { label: "Ações", value: "320", key: "actions" },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`flex flex-col cursor-pointer ${
                  selectedMetric === stat.key ? "font-bold text-blue-500" : ""
                }`}
                onClick={() =>
                  handleMetricClick(
                    stat.key as "users" | "clicks" | "investments" | "actions"
                  )
                }
              >
                <p className="text-gray-500">{stat.label}</p>
                <p className="font-semibold mt-1">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Investimento Area Chart */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-medium">
                {areaData[selectedArea].title}
              </h4>
              <p
                className={`text-xs ${areaData[selectedArea].comparisonColor}`}
              >
                {areaData[selectedArea].comparisonText}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div
                className={`flex items-center cursor-pointer ${
                  selectedArea === "startups" ? "font-bold text-blue-500" : ""
                }`}
                onClick={() => handleAreaClick("startups")}
              >
                <span
                  className={`w-2 h-2 rounded-full mr-1 ${
                    darkMode ? "bg-white" : "bg-blue-500"
                  }`}
                ></span>{" "}
                Startups
              </div>
              <div
                className={`flex items-center cursor-pointer ${
                  selectedArea === "franquias" ? "font-bold text-teal-300" : ""
                }`}
                onClick={() => handleAreaClick("franquias")}
              >
                <span
                  className={`w-2 h-2 rounded-full mr-1 ${
                    darkMode ? "bg-white" : "bg-teal-300"
                  }`}
                ></span>{" "}
                Franquias
              </div>
            </div>
          </div>
          <div className="h-64">
            <Line
              data={areaData[selectedArea]}
              options={{
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
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

      {/* Projects Table */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Projects</h2>
          <p className="text-xs text-gray-500">30 Registros este mês</p>
        </div>
        <FilterSearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterType={filterType}
          setFilterType={setFilterType}
          filterOptions={filterOptions}
          isFilterOpen={isFilterOpen}
          toggleFilterDropdown={toggleFilterDropdown}
          closeFilterDropdown={closeFilterDropdown}
          filterLabel="Project Type"
          className="mb-6"
        />
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs text-gray-500 uppercase border-b">
              <th className="py-2">Photo</th>
              <th className="py-2">Projeto</th>
              <th className="py-2">Tipo</th>
              <th className="py-2">Valuation</th>
              <th className="py-2">Disponibilidade</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredProjects.map((prj) => (
              <tr key={prj.name}>
                <td className="py-3">
                  {prj.photoUrl ? (
                    <img
                      src={prj.photoUrl}
                      alt={prj.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <ImageOff className="w-10 h-10 text-gray-400" />
                  )}
                </td>
                <td className="py-3">{prj.name}</td>
                <td className="py-3 text-gray-500">{prj.type}</td>
                <td className="py-3">{prj.value}</td>
                <td className="py-3">
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-2 rounded-full bg-green-400"
                      style={{ width: prj.pct + "%" }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Simple sparkline component
function Sparkline({ data }: { data: any }) {
  return (
    <Bar
      data={data}
      options={{
        plugins: { legend: { display: false } },
        scales: { x: { display: false }, y: { display: false } },
        elements: { bar: { borderRadius: 4 } },
        maintainAspectRatio: false,
      }}
    />
  );
}

export default AdminDashboardScreen;