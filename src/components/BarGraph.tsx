"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export type BarGraphDatum = {
  name: string;
  value: number;
  color: string;
};

type LabelProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  value?: number | string;
};

type BarGraphProps = {
  data: BarGraphDatum[];
};

function VerticalBarLabel({ x = 0, y = 0, width = 0, height = 0, value }: LabelProps): ReactNode {
  if (height < 56) return null;

  return (
    <text
      x={x + width / 2}
      y={y + height / 2}
      fill="rgba(15,23,42,0.8)"
      fontSize="10"
      fontWeight="600"
      textAnchor="middle"
      dominantBaseline="middle"
      transform={`rotate(-90, ${x + width / 2}, ${y + height / 2})`}
    >
      {value}
    </text>
  );
}

export default function BarGraph({ data }: BarGraphProps) {
  const [hasMounted, setHasMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(mediaQuery.matches);

    sync();
    mediaQuery.addEventListener("change", sync);

    return () => mediaQuery.removeEventListener("change", sync);
  }, []);

  if (!hasMounted) {
    return (
      <div className="h-[400px] w-full rounded-2xl border border-white/8 bg-white/[0.03] p-4">
        <div className="flex h-full items-end gap-3">
          {data.map((item) => (
            <div key={item.name} className="flex flex-1 flex-col items-center justify-end gap-3">
              <div
                className="w-full rounded-t-2xl opacity-70"
                style={{ height: `${item.value * 3}px`, backgroundColor: item.color }}
              />
              <span className="text-center text-[10px] text-slate-400">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="99%" height={400}>
        <BarChart data={data} margin={{ top: 12, right: 10, left: -14, bottom: isMobile ? 0 : 12 }}>
          <CartesianGrid strokeDasharray="4 6" vertical={false} stroke="rgba(148,163,184,0.16)" />
          <XAxis
            dataKey="name"
            hide={isMobile}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94A3B8", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94A3B8", fontSize: 12 }}
            domain={[0, 100]}
          />
          <Bar
            dataKey="value"
            radius={[14, 14, 0, 0]}
            isAnimationActive
            animationDuration={850}
            animationEasing="ease-out"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
            <LabelList dataKey="name" content={<VerticalBarLabel />} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
