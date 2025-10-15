import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { useDashboard } from '../../context/DashboardContext';

const COLORS = ['#F472B6', '#FB923C', '#38BDF8', '#A78BFA'];

export const CategoryChart: React.FC = () => {
    const { items, addFilter } = useDashboard();

    const data = useMemo(() => {
        const categoryCount = items.reduce((acc, item) => {
            acc[item.category] = (acc[item.category] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(categoryCount).map(([name, value]) => ({
            name,
            value
        }));
    }, [items]);

    const handleClick = (entry: any) => {
        addFilter({ type: 'category', value: entry.name });
    };

    return (
        <div className="h-64">
            <h2 className="text-lg font-semibold mb-4">Category Distribution</h2>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        onClick={handleClick}
                        cursor="pointer"
                    >
                        {data.map((entry, index) => (
                            <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};
