import React, { useMemo } from 'react';
import { useDashboard } from '../context/DashboardContext';

export const DataTable: React.FC = () => {
    const { items, filters, searchTerm, timeRange } = useDashboard();

    const filteredItems = useMemo(() => {
        let filtered = [...items];

        // Apply search filter
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter(
                item =>
                    item.title.toLowerCase().includes(searchLower) ||
                    item.id.toLowerCase().includes(searchLower)
            );
        }

        // Apply category and status filters
        filters.forEach(filter => {
            filtered = filtered.filter(item => {
                if (filter.type === 'category') return item.category === filter.value;
                if (filter.type === 'status') return item.status === filter.value;
                return true;
            });
        });

        // Apply time range filter
        const now = new Date();
        const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 365;
        const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

        filtered = filtered.filter(item => {
            const itemDate = new Date(item.date);
            return itemDate >= startDate;
        });

        return filtered;
    }, [items, filters, searchTerm, timeRange]);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {filteredItems.map((item) => (
                        <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {item.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.title}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {item.category}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === 'Completed'
                                        ? 'bg-green-100 text-green-800'
                                        : item.status === 'In Progress'
                                            ? 'bg-blue-100 text-blue-800'
                                            : item.status === 'Blocked'
                                                ? 'bg-red-100 text-red-800'
                                                : 'bg-purple-100 text-purple-800'
                                        }`}
                                >
                                    {item.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(item.date).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                ${item.amount.toLocaleString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
