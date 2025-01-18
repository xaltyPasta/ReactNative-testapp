export interface Bill {
    id: string;
    image: string;
    amount: number;
    date: string;
    status: 'pending' | 'approved' | 'rejected';
}

export interface User {
    email: string;
    token: string;
}