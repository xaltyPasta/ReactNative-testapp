import { configureStore } from '@reduxjs/toolkit';
import billsReducer from './billsSlice';

export const store = configureStore({
    reducer: {
        bills: billsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;