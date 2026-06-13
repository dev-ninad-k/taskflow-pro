// features/tasks/store/tasks-thunks.ts

import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchTasks } from '@/features/tasks/api/tasks-api';

export const loadTasks = createAsyncThunk('tasks/loadTasks', async () => {
  return await fetchTasks();
});
