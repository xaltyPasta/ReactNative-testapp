import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Bill } from '../types';

interface BillsState {
    bills: Bill[];
    loading: boolean;
    error: string | null;
}

const initialState: BillsState = {
    bills: [],
    loading: false,
    error: null,
};

const billsSlice = createSlice({
    name: 'bills',
    initialState,
    reducers: {
        addBill: (state, action: PayloadAction<Bill>) => {
            state.bills.unshift(action.payload);
        },
        setBills: (state, action: PayloadAction<Bill[]>) => {
            state.bills = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const { addBill, setBills, setLoading, setError } = billsSlice.actions;
export default billsSlice.reducer;