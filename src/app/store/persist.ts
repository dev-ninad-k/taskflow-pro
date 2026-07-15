import type { TasksState } from '@/features/tasks/store/types';

const STORAGE_KEY = 'taskflow_state';

const defaultTasksState: TasksState = {
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

/**
 * SAVE STATE
 */
export function saveState(state: TasksState) {
  try {
    const persistable = {
      entities: state.entities,
      ui: state.ui,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(persistable));
  } catch (e) {
    console.warn('Failed to save state', e);
  }
}

/**
 * LOAD STATE
 */
export function loadState(): TasksState | undefined {
  try {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) return undefined;

    const parsed = JSON.parse(data);

    return {
      ...defaultTasksState,

      entities: {
        ...defaultTasksState.entities,
        ...(parsed.entities ?? {}),
      },

      ui: {
        ...defaultTasksState.ui,
        ...(parsed.ui ?? {}),
        filters: {
          ...defaultTasksState.ui.filters,
          ...(parsed.ui?.filters ?? {}),
        },
      },
    };
  } catch (e) {
    console.warn('Failed to load state', e);
    return undefined;
  }
}
