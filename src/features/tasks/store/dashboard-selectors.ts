import { createSelector } from '@reduxjs/toolkit';
import { selectTasks } from './selectors';

export const selectTaskMetrics = createSelector([selectTasks], (tasks) => {
  const total = tasks.length;

  const completed = tasks.filter((t) => t.status === 'done').length;
  const inProgress = tasks.filter((t) => t.status === 'in-progress').length;
  const todo = tasks.filter((t) => t.status === 'todo').length;

  const completionRate =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return {
    total,
    completed,
    inProgress,
    todo,
    completionRate,
  };
});

export const selectRecentTasks = createSelector([selectTasks], (tasks) =>
  [...tasks]
    .sort(
      (a, b) =>
        new Date(b.updatedAt ?? b.createdAt ?? 0).getTime() -
        new Date(a.updatedAt ?? a.createdAt ?? 0).getTime(),
    )
    .slice(0, 5),
);

export const selectTaskDistribution = createSelector(
  [selectTasks],
  (tasks) => ({
    todo: tasks.filter((t) => t.status === 'todo').length,
    inProgress: tasks.filter((t) => t.status === 'in-progress').length,
    done: tasks.filter((t) => t.status === 'done').length,
  }),
);

export const selectPriorityDistribution = createSelector(
  [selectTasks],
  (tasks) => ({
    low: tasks.filter((t) => t.priority === 'low').length,
    medium: tasks.filter((t) => t.priority === 'medium').length,
    high: tasks.filter((t) => t.priority === 'high').length,
  }),
);
