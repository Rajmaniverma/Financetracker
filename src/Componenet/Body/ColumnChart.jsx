import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts";
import { useEffect, useState } from "react";

const ColumnChart = () => {
  const [storedData, setStoredData] = useState([]);

  const loadData = () => {
    const data = JSON.parse(localStorage.getItem("data")) || [];
    setStoredData(data);
  };

  useEffect(() => {
    loadData();
    window.addEventListener("storageUpdate", loadData);

    const interval = setInterval(loadData, 60 * 60 * 1000);

    return () => {
      window.removeEventListener("storageUpdate", loadData);
      clearInterval(interval);
    };
  }, []);

  // 📅 Get start of week (Monday)
  const getStartOfWeek = () => {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(now);
    monday.setDate(diff);
    monday.setHours(0, 0, 0, 0);
    return monday;
  };

  const getEndOfWeek = (start) => {
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);
    return end;
  };

  const startOfWeek = getStartOfWeek();
  const endOfWeek = getEndOfWeek(startOfWeek);

  const weeklyMap = {
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
    Sun: 0,
  };

  storedData.forEach((item) => {
    if (!item.date) return;

    const itemDate = new Date(item.date);
    if (itemDate < startOfWeek || itemDate > endOfWeek) return;

    const day = itemDate.toLocaleDateString("en-US", {
      weekday: "short",
    });

    const amount = Number(item.amount) || 0;

    if (item.type === "income") weeklyMap[day] += amount;
    if (item.type === "expense") weeklyMap[day] -= amount;
  });

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const labelMap = {
    Mon: "M",
    Tue: "T",
    Wed: "W",
    Thu: "T",
    Fri: "F",
    Sat: "S",
    Sun: "S",
  };

  const data = days.map((day) => ({
    name: labelMap[day],
    value: weeklyMap[day],
  }));

  const maxAbs = Math.max(...data.map((d) => Math.abs(d.value)), 100);

  return (
    <div className="w-full h-72 sm:h-80 bg-white/40 backdrop-blur-xl rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] p-4 sm:p-6">

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          barCategoryGap="8%"
          barGap={2}
        >

          {/* 🎨 Gradients */}
          <defs>
            <linearGradient id="greenGlass" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4ADE80" />
              <stop offset="100%" stopColor="#16A34A" />
            </linearGradient>

            <linearGradient id="redGlass" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F87171" />
              <stop offset="100%" stopColor="#DC2626" />
            </linearGradient>

            <filter id="barGlow">
              <feDropShadow
                dx="0"
                dy="4"
                stdDeviation="5"
                floodOpacity="0.25"
              />
            </filter>
          </defs>

          <CartesianGrid
            strokeDasharray="2 6"
            vertical={false}
            stroke="#E2E8F0"
          />

          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "#64748B" }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            domain={[-maxAbs, maxAbs]}
            tick={{ fontSize: 11, fill: "#94A3B8" }}
            axisLine={false}
            tickLine={false}
          />

          <ReferenceLine y={0} stroke="#CBD5E1" />

          <Tooltip
            cursor={{ fill: "rgba(148,163,184,0.1)" }}
            formatter={(value) => [
              `₹${Math.abs(value)}`,
              value >= 0 ? "Income" : "Expense",
            ]}
            contentStyle={{
              background: "#ffffff",
              borderRadius: "10px",
              border: "none",
              boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            }}
          />

          <Bar
            dataKey="value"
            barSize={28}
            radius={[8, 8, 8, 8]}
            filter="url(#barGlow)"
            animationDuration={800}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={
                  entry.value >= 0
                    ? "url(#greenGlass)"
                    : "url(#redGlass)"
                }
              />
            ))}
          </Bar>

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ColumnChart;
