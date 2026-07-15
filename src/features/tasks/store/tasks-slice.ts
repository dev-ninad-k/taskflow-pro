// features/tasks/store/tasks-slice.ts

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { TaskStatus } from '../types';

import {
  loadTasks,
  createTaskThunk,
  updateTaskThunk,
  deleteTaskThunk,
} from './tasks-thunks';
import type { TasksState } from './types';
import type { Task } from '../types';

const initialState: TasksState = {
  entities: {
    tasksById: {},
    taskIds: [],
  },

  server: {
    loading: false,
    creating: false,
    updatingIds: [],
    deletingIds: [],
    error: null,
  },

  ui: {
    filters: {
      search: '',
      status: 'all',
    },
  },
};

const tasksSlice = createSlice({
  name: 'tasks',

  initialState,

  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.ui.filters.search = action.payload;
    },

    setStatusFilter(state, action: PayloadAction<TaskStatus | 'all'>) {
      state.ui.filters.status = action.payload;
    },

    addOptimisticTask(state, action) {
      const task = action.payload;

      state.entities.tasksById[task.id] = task;
      state.entities.taskIds.unshift(task.id);
    },
    restoreTask(state, action: PayloadAction<Task>) {
      state.entities.tasksById[action.payload.id] = action.payload;
    },
    optimisticallyUpdateTask(
      state,
      action: PayloadAction<{
        id: string;
        changes: Partial<Task>;
      }>,
    ) {
      const existing = state.entities.tasksById[action.payload.id];

      if (!existing) return;

      state.entities.tasksById[action.payload.id] = {
        ...existing,
        ...action.payload.changes,
        updatedAt: new Date().toISOString(),
      };
    },
    removeOptimisticTask(state, action: PayloadAction<string>) {
      const id = action.payload;

      delete state.entities.tasksById[id];

      state.entities.taskIds = state.entities.taskIds.filter(
        (taskId) => taskId !== id,
      );
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(loadTasks.pending, (state) => {
        state.server.loading = true;
        state.server.error = null;
      })

      .addCase(loadTasks.fulfilled, (state, action) => {
        state.entities.taskIds = action.payload.map((t) => t.id);

        state.entities.tasksById = action.payload.reduce(
          (acc, task) => {
            acc[task.id] = task;
            return acc;
          },
          {} as Record<string, Task>,
        );

        state.server.loading = false;
      })

      .addCase(loadTasks.rejected, (state) => {
        state.server.loading = false;
        state.server.error = 'Failed to load tasks';
      })

      .addCase(createTaskThunk.pending, (state) => {
        state.server.creating = true;
        state.server.error = null;
      })

      .addCase(createTaskThunk.rejected, (state, action) => {
        state.server.creating = false;

        const tempId = action.meta?.arg?.tempId;

        if (tempId) {
          // remove from id list
          state.entities.taskIds = state.entities.taskIds.filter(
            (id) => id !== tempId,
          );

          // remove from map
          delete state.entities.tasksById[tempId];
        }

        state.server.error =
          (action.payload as string) ??
          action.error.message ??
          'Failed to create task';
      })

      .addCase(createTaskThunk.fulfilled, (state, action) => {
        state.server.creating = false;
        state.server.error = null;
        const { tempId, task } = action.payload;

        // 1. remove temp task id
        state.entities.taskIds = state.entities.taskIds.filter(
          (id) => id !== tempId,
        );

        // 2. remove temp task from map
        delete state.entities.tasksById[tempId];

        // 3. add real task
        state.entities.tasksById[task.id] = task;

        // 4. insert real id at top
        state.entities.taskIds.unshift(task.id);
      })

      .addCase(updateTaskThunk.fulfilled, (state, action) => {
        const updated = action.payload;

        state.server.updatingIds = state.server.updatingIds.filter(
          (id) => id !== updated.id,
        );

        const existing = state.entities.tasksById[updated.id];
        if (!existing) return;

        state.entities.tasksById[updated.id] = {
          ...existing,
          ...updated,
        };
      })

      .addCase(updateTaskThunk.pending, (state, action) => {
        state.server.error = null;

        const id = action.meta.arg.id;

        state.server.updatingIds.push(id);
      })

      .addCase(updateTaskThunk.rejected, (state, action) => {
        const id = action.meta.arg.id;

        state.server.updatingIds = state.server.updatingIds.filter(
          (taskId) => taskId !== id,
        );

        state.server.error =
          (action.payload as string) ??
          action.error.message ??
          'Failed to update task';
      })

      .addCase(deleteTaskThunk.pending, (state, action) => {
        state.server.deletingIds.push(action.meta.arg);
      })

      .addCase(deleteTaskThunk.fulfilled, (state, action) => {
        const id = action.payload;

        state.server.deletingIds = state.server.deletingIds.filter(
          (t) => t !== id,
        );

        delete state.entities.tasksById[id];
        state.entities.taskIds = state.entities.taskIds.filter(
          (tId) => tId !== id,
        );
      })

      .addCase(deleteTaskThunk.rejected, (state, action) => {
        const id = action.meta.arg;

        state.server.deletingIds = state.server.deletingIds.filter(
          (t) => t !== id,
        );
        state.server.error = action.error.message ?? 'Failed to delete task';
      });
  },
});

export const tasksReducer = tasksSlice.reducer;
export const {
  setSearch,
  setStatusFilter,
  addOptimisticTask,
  restoreTask,
  optimisticallyUpdateTask,
  removeOptimisticTask,
} = tasksSlice.actions;
