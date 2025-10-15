import React from 'react';
import { StatusChart } from '../charts/StatusChart';
import { CategoryChart } from '../charts/CategoryChart';
import { TimelineChart } from '../charts/TimelineChart';
import { DataTable } from '../DataTable';
import { FilterChips } from '../FilterChips';
import { SearchBar } from '../SearchBar';

export const Dashboard: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                    <SearchBar />
                    <FilterChips />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow p-4">
                    <StatusChart />
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <CategoryChart />
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <TimelineChart />
                </div>
            </div>

            <div className="bg-white rounded-lg shadow">
                <DataTable />
            </div>
        </div>
    );
};
