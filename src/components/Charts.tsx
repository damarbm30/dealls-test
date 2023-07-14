"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Label, Tooltip } from "recharts";

const Charts = ({ data }: { data: any[] }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart width={500} height={300} data={data} margin={{ top: 0, right: 30, left: 30, bottom: 30 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="title" hide />
        <YAxis>
          <Label position="left" angle={-90} style={{ textAnchor: "middle" }} value="Stocks" />
        </YAxis>
        <Tooltip />
        <Bar dataKey="stock" fill="#203b6a" />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default Charts;
