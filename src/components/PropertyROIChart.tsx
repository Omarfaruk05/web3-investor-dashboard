'use client';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import { ProjectionPoint } from "../lib/roi";

type Props = {
    data: ProjectionPoint[]; // from projectOverYears
    showPercentAxis?: boolean; // if true show ROI% as right axis
};

export default function PropertyROIChart({ data, showPercentAxis = true }: Props) {
    // Recharts expects numbers, already provided in ProjectionPoint
    return (
        <div className="w-full h-72 md:h-96 bg-white/80 p-2 rounded-xl shadow-sm">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" label={{ value: "Years", position: "insideBottomRight", offset: -5 }} />
                    <YAxis yAxisId="left" domain={['auto', 'auto']} tickFormatter={(v) => `$${Number(v).toLocaleString()}`} />
                    {showPercentAxis && (
                        <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => `${v}%`} />
                    )}
                    <Tooltip formatter={(value: any, name: string) => {
                        if (name === 'propertyValue') return [`$${Number(value).toLocaleString()}`, 'Value'];
                        if (name === 'cumulativeReturnPct') return [`${Number(value).toFixed(2)}%`, 'Cumulative ROI%'];
                        if (name === 'cumulativeRent') return [`$${Number(value).toLocaleString()}`, 'Cumulative Rent'];
                        return [value, name];
                    }} />
                    <Legend verticalAlign="top" />
                    <Line yAxisId="left" type="monotone" dataKey="propertyValue" stroke="#3182ce" name="Projected Value" dot={false} strokeWidth={2} />
                    <Line yAxisId={showPercentAxis ? "right" : "left"} type="monotone" dataKey="cumulativeReturnPct" stroke="#38a169" name="Cumulative ROI %" dot={false} strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
