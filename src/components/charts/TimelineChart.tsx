import React, { useMemo } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
} from 'recharts';
import { useDashboard } from '../../context/DashboardContext';

export const TimelineChart: React.FC = () => {
    const { items, timeRange, setTimeRange } = useDashboard();

    const data = useMemo(() => {
        const now = new Date();
        const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
        const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

        const dateCount = items.reduce((acc, item) => {
            const date = new Date(item.date);
            if (date >= startDate) {
                const dateStr = date.toISOString().split('T')[0];
                acc[dateStr] = (acc[dateStr] || 0) + 1;
            }
            return acc;
        }, {} as Record<string, number>);

        const datesArray = [];
        for (let d = new Date(startDate); d <= now; d.setDate(d.getDate() + 1)) {
            const dateStr = d.toISOString().split('T')[0];
            datesArray.push({
                date: dateStr,
                count: dateCount[dateStr] || 0
            });
        }

        return datesArray;
    }, [items, timeRange]);

    return (
        <div className="h-64">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Items by Day</h2>
                <div className="flex gap-2">
                    {(['7d', '30d', 'All'] as const).map((range) => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`px-3 py-1 rounded-full text-sm ${timeRange === range
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {range}
                        </button>
                    ))}
                </div>
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <XAxis
                        dataKey="date"
                        tickFormatter={(date) => new Date(date).toLocaleDateString()}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                    />
                    <YAxis />
                    <Tooltip
                        labelFormatter={(date) => new Date(date).toLocaleDateString()}
                        formatter={(value: number) => [value, 'Items']}
                    />
                    <Bar dataKey="count" fill="#8B5CF6" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
