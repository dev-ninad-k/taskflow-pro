import type { RootState } from '@/app/store/store';

export const selectTasks = (state: RootState) => state.tasks.tasks;

export const selectFilters = (state: RootState) => state.tasks.filters;
export const selectFilteredTasks = (state: RootState) => {
  const tasks = state.tasks.tasks;

  const { search, status } = state.tasks.filters;

  return tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus = status === 'all' ? true : task.status === status;

    return matchesSearch && matchesStatus;
  });
};
