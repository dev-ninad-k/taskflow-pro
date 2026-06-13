// features/tasks/store/tasks-slice.ts

import { createSlice } from '@reduxjs/toolkit';

import { loadTasks } from './tasks-thunks';
import type { TasksState } from './types';

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
  filters: {
    search: '',
    status: 'all',
  },
};

const tasksSlice = createSlice({
  name: 'tasks',

  initialState,

  reducers: {
    setSearch(state, action) {
      state.filters.search = action.payload;
    },

    setStatusFilter(state, action) {
      state.filters.status = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(loadTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loadTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })

      .addCase(loadTasks.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to load tasks';
      });
  },
});

export const tasksReducer = tasksSlice.reducer;
export const { setSearch, setStatusFilter } = tasksSlice.actions;
