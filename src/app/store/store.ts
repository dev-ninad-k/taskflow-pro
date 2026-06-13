// app/store/store.ts

import { configureStore } from '@reduxjs/toolkit';

import { tasksReducer } from '@/features/tasks/store/tasks-slice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
