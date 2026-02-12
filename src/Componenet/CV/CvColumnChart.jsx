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

const CvColumnChart = () => {

  // ✅ Demo Weekly Data
  const data = [
    { name: "M", value: 5000 },
    { name: "T", value: -2000 },
    { name: "W", value: 4000 },
    { name: "T", value: -3500 },
    { name: "F", value: 6000 },
    { name: "S", value: -1500 },
    { name: "S", value: 3000 },
  ];

  const maxAbs = Math.max(...data.map((d) => Math.abs(d.value)), 100);

  return (
    <div className="w-full h-72 sm:h-80 bg-white/40 backdrop-blur-xl rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] p-4 sm:p-6">
      
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data}
          barCategoryGap="8%"
          barGap={2}
        >

          {/* 🎨 Gradients + Soft Glow */}
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

          {/* Grid */}
          <CartesianGrid 
            strokeDasharray="2 6" 
            vertical={false} 
            stroke="#E2E8F0"
          />

          {/* X Axis */}
          <XAxis 
            dataKey="name"
            tick={{ fontSize: 12, fill: "#64748B" }}
            axisLine={false}
            tickLine={false}
          />

          {/* Y Axis */}
          <YAxis
            domain={[-maxAbs, maxAbs]}
            tick={{ fontSize: 11, fill: "#94A3B8" }}
            axisLine={false}
            tickLine={false}
          />

          {/* Zero Line */}
          <ReferenceLine y={0} stroke="#CBD5E1" />

          {/* Tooltip */}
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

          {/* Bars */}
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

export default CvColumnChart;
