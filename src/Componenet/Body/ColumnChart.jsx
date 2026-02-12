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

  // 🔄 Load data from localStorage
  const loadData = () => {
    const data = JSON.parse(localStorage.getItem("data")) || [];
    setStoredData(data);
  };

  useEffect(() => {
    loadData();

    // 🔔 Listen when income/expense added
    window.addEventListener("storageUpdate", loadData);

    // ⏰ Auto refresh every hour (week change safe)
    const interval = setInterval(loadData, 60 * 60 * 1000);

    return () => {
      window.removeEventListener("storageUpdate", loadData);
      clearInterval(interval);
    };
  }, []);

  // 📅 Get start of current week (Monday)
  const getStartOfWeek = () => {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(now);
    monday.setDate(diff);
    monday.setHours(0, 0, 0, 0);
    return monday;
  };

  // 📅 Get end of current week (Sunday)
  const getEndOfWeek = (start) => {
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);
    return end;
  };

  const startOfWeek = getStartOfWeek();
  const endOfWeek = getEndOfWeek(startOfWeek);

  // 🗓 Weekly data map
  const weeklyMap = {
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
    Sun: 0,
  };

  // 📊 Calculate weekly totals
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
    <div
      className="
        w-full h-80 min-w-0
      bg-transparent
       
        py-4 pr-4 pl-0
      "
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barCategoryGap={10}>
          {/* 🎨 Gradients */}
          <defs>
            <linearGradient id="greenGlass" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4ADE80" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#16A34A" stopOpacity={0.6} />
            </linearGradient>

            <linearGradient id="redGlass" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F87171" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#DC2626" stopOpacity={0.6} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 6" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis domain={[-maxAbs, maxAbs]} />
          <ReferenceLine y={0} stroke="#94A3B8" />

          <Tooltip
            formatter={(value) => [
              `₹${Math.abs(value)}`,
              value >= 0 ? "Income" : "Expense",
            ]}
          />

          <Bar dataKey="value" barSize={32} radius={[10, 10, 10, 10]}>
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
