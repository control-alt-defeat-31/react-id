import React from 'react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { useDashboard } from '../context/DashboardContext';

export const FilterChips: React.FC = () => {
    const { filters, removeFilter } = useDashboard();

    if (filters.length === 0) return null;

    return (
        <div className="flex flex-wrap gap-2">
            {filters.map((filter, index) => (
                <div
                    key={`${filter.type}-${filter.value}-${index}`}
                    className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                    <span className="capitalize">{filter.type}: {filter.value}</span>
                    <button
                        onClick={() => removeFilter(filter)}
                        className="hover:bg-blue-200 rounded-full p-1"
                    >
                        <XMarkIcon className="h-4 w-4" />
                    </button>
                </div>
            ))}
        </div>
    );
};
