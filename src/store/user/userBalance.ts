import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface UserState {
  balance: number;
}

const initialState: UserState = {
  balance: 0,
};

export const userBalance = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
    updateBalanceByAmount: (state, action: PayloadAction<number>) => {
      state.balance += action.payload;
    },
  },
});

export const { setBalance, updateBalanceByAmount } = userBalance.actions;

export const selectBalance = (state: RootState) => state.user.balance;

export default userBalance.reducer;
