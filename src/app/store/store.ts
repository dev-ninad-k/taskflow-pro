import { configureStore } from '@reduxjs/toolkit';
import { tasksReducer } from '@/features/tasks/store/tasks-slice';
import { loadState, saveState } from './persist';

const preloadedTasks = loadState();

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  preloadedState: preloadedTasks ? { tasks: preloadedTasks } : undefined,
});

store.subscribe(() => {
  saveState(store.getState().tasks);
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
