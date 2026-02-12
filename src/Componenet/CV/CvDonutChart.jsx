import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect } from "react";

const CvDonutChart = ({ sendBalance }) => {

  // ✅ Demo Fixed Values
  const income = 25000;
  const expense = 12000;

  const total = income + expense;
  const balance = income - expense;

  useEffect(() => {
    if (sendBalance) {
      sendBalance({
        balance,
        income,
        expense,
      });
    }
  }, [balance, income, expense, sendBalance]);

  const data = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
  ];

  const incomePercent = ((income / total) * 100).toFixed(1);
  const expensePercent = ((expense / total) * 100).toFixed(1);

  return (
    <div className="w-80 h-80 p-4 m-0 overflow-hidden">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>

          {/* 🎨 DEFINITIONS */}
          <defs>
            <linearGradient id="income3d" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4ADE80" />
              <stop offset="50%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#15803D" />
            </linearGradient>

            <linearGradient id="expense3d" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F87171" />
              <stop offset="50%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#991B1B" />
            </linearGradient>

            <filter id="shadow">
              <feDropShadow
                dx="0"
                dy="6"
                stdDeviation="6"
                floodOpacity="0.35"
              />
            </filter>
          </defs>

          {/* 🔹 BACK DEPTH RING */}
          <Pie
            data={data}
            dataKey="value"
            innerRadius={68}
            outerRadius={104}
            paddingAngle={4}
            startAngle={90}
            endAngle={-270}
            filter="url(#shadow)"
            stroke="none"
          >
            <Cell fill="url(#income3d)" />
            <Cell fill="url(#expense3d)" />
          </Pie>

          {/* 🔹 FRONT RING */}
          <Pie
            data={data}
            dataKey="value"
            innerRadius={68}
            outerRadius={100}
            paddingAngle={4}
            startAngle={90}
            endAngle={-270}
            filter="url(#shadow)"
          >
            <Cell fill="url(#income3d)" stroke="none" />
            <Cell fill="url(#expense3d)" stroke="none" />
          </Pie>

          {/* 🔹 CENTER TEXT */}
          <text
            x="50%"
            y="46%"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#CBD5F5"
            fontSize={13}
          >
            Balance
          </text>

          <text
            x="50%"
            y="56%"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#CBD5F5"
            fontSize={18}
            fontWeight="700"
          >
            ₹{balance.toLocaleString()}
          </text>

          {/* 🔹 TOOLTIP */}
          <Tooltip
            formatter={(value, name) => {
              const percent =
                name === "Income"
                  ? incomePercent
                  : expensePercent;
              return [`₹${value} (${percent}%)`, name];
            }}
            contentStyle={{
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "12px",
              color: "#ffffff",
            }}
          />

        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CvDonutChart;
