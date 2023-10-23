import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export const useSampleStore = create(
  immer(
    combine(
      {
        counter: 1,
      },
      (set) => ({
        // regular
        increase1: (by: number) =>
          set((state) => ({ bears: state.counter + by })),
        // immer
        increase2: (by: number) =>
          set((state) => {
            state.counter += by;
          }),
      })
    )
  )
);

// outside
export function outsideUse() {
  useSampleStore.getState().increase1(1);
}
