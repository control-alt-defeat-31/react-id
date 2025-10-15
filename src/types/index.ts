export interface Item {
    id: string;
    title: string;
    category: string;
    status: string;
    date: string;
    amount: number;
}

export interface Filter {
    type: 'status' | 'category' | 'date';
    value: string;
}

export interface ChartData {
    name: string;
    value: number;
    color?: string;
}
