import type { RootState } from '@/app/store/store';
import type { Task } from '../types';
import { createSelector } from '@reduxjs/toolkit';

/**
 * Base selector: returns normalized array safely
 */
const selectTaskIds = (state: RootState) => state.tasks.entities.taskIds;

const selectTasksById = (state: RootState) => state.tasks.entities.tasksById;

/**
 * Memoized base task list
 */
export const selectTasks = createSelector(
  [selectTaskIds, selectTasksById],
  (taskIds, tasksById): Task[] => {
    return taskIds.map((id) => tasksById[id]).filter(Boolean);
  },
);

/**
 * Filters state only
 */
export const selectFilters = (state: RootState) => state.tasks.ui.filters;

/**
 * Derived filtered tasks (UI-ready)
 */
export const selectFilteredTasks = createSelector(
  [selectTasks, selectFilters],
  (tasks, filters) => {
    const searchLower = filters.search.toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(searchLower);

      const matchesStatus =
        filters.status === 'all' ? true : task.status === filters.status;

      return matchesSearch && matchesStatus;
    });
  },
);
