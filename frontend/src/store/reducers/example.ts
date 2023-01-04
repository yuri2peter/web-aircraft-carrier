import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getRootState, basicDispatch, RootState } from '../index';

export const exampleSlice = createSlice({
  name: 'example',
  initialState: {
    value: 1,
    loading: false,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const selectExampleSlice = (state: RootState) => state.example;

export const { increment, decrement, incrementByAmount, setLoading } =
  exampleSlice.actions;

export async function doubleValueAsync() {
  const currentValue = getRootState().example.value;
  basicDispatch(setLoading(true));
  setTimeout(() => {
    basicDispatch(incrementByAmount(currentValue));
    basicDispatch(setLoading(false));
  }, 1000);
}

export default exampleSlice.reducer;
