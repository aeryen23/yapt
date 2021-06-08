import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
}

const CounterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.value++
    },
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload
    },
    decrement(state) {
      state.value--
    },
    reset(state) {
      state.value = 0
    }
  }
})

export const { increment, incrementByAmount, decrement, reset } = CounterSlice.actions
export default CounterSlice.reducer
