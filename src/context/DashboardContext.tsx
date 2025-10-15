import React, { createContext, useContext, useState, useEffect } from 'react';
import { Item, Filter } from '../types';
import itemsData from '../data/items.json';

interface DashboardContextType {
    items: Item[];
    filters: Filter[];
    searchTerm: string;
    timeRange: '7d' | '30d' | 'All';
    addFilter: (filter: Filter) => void;
    removeFilter: (filter: Filter) => void;
    setSearchTerm: (term: string) => void;
    setTimeRange: (range: '7d' | '30d' | 'All') => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [filters, setFilters] = useState<Filter[]>(() => {
        const savedFilters = localStorage.getItem('dashboard_filters');
        return savedFilters ? JSON.parse(savedFilters) : [];
    });

    const [searchTerm, setSearchTerm] = useState<string>(() => {
        const savedSearch = localStorage.getItem('dashboard_search');
        return savedSearch || '';
    });

    const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'All'>(() => {
        const savedRange = localStorage.getItem('dashboard_timeRange');
        return (savedRange as '7d' | '30d' | 'All') || '30d';
    });

    useEffect(() => {
        localStorage.setItem('dashboard_filters', JSON.stringify(filters));
    }, [filters]);

    useEffect(() => {
        localStorage.setItem('dashboard_search', searchTerm);
    }, [searchTerm]);

    useEffect(() => {
        localStorage.setItem('dashboard_timeRange', timeRange);
    }, [timeRange]);

    const addFilter = (filter: Filter) => {
        setFilters(prev => {
            const exists = prev.some(f => f.type === filter.type && f.value === filter.value);
            if (exists) return prev;
            return [...prev, filter];
        });
    };

    const removeFilter = (filter: Filter) => {
        setFilters(prev => prev.filter(f => !(f.type === filter.type && f.value === filter.value)));
    };

    const value = {
        items: itemsData.items,
        filters,
        searchTerm,
        timeRange,
        addFilter,
        removeFilter,
        setSearchTerm,
        setTimeRange,
    };

    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboard = () => {
    const context = useContext(DashboardContext);
    if (context === undefined) {
        throw new Error('useDashboard must be used within a DashboardProvider');
    }
    return context;
};
