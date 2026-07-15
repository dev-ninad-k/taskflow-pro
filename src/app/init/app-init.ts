import { store } from '@/app/store/store';
import { loadTasks } from '@/features/tasks/store/tasks-thunks';
import { loadState } from '@/app/store/persist';

let initialized = false;
export async function initApp() {
  if (initialized) return;
  initialized = true;

  const persisted = loadState();

  if (persisted) {
    // IMPORTANT: still allow store usage, don't block app flow
  } else {
    await store.dispatch(loadTasks());
  }
}
