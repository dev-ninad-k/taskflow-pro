// features/tasks/store/tasks-thunks.ts

import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTasks } from '@/features/tasks/api/tasks-api';
import { createTask } from '../api/tasks-api';
import type { CreateTaskThunkPayload } from '../types/redux/task-thunk-payload';
import { apiClient } from '@/services/api/client';
import type { UpdateTaskDto } from '../types/api/update-task-dto';
import type { RootState } from '@/app/store/store';
import { toast } from '@/shared/ui/toast';

export const loadTasks = createAsyncThunk('tasks/loadTasks', async () => {
  return await fetchTasks();
});
export const createTaskThunk = createAsyncThunk(
  'tasks/createTask',

  async (payload: CreateTaskThunkPayload) => {
    const response = await createTask(payload.task);
    return {
      tempId: payload.tempId,
      task: response,
    };
  },
);
export const updateTaskThunk = createAsyncThunk(
  'tasks/updateTask',
  async (payload: UpdateTaskDto, { getState, rejectWithValue }) => {
    const state = getState() as RootState;

    const existing = state.tasks.entities.tasksById[payload.id];

    if (!existing) {
      return rejectWithValue('Task not found');
    }

    const updatedData = {
      title: payload.data.title ?? existing.title,
      description: payload.data.description ?? existing.description,
      status: payload.data.status ?? existing.status,
      priority: payload.data.priority ?? existing.priority,
      completed:
        payload.data.status === 'done'
          ? true
          : payload.data.status === 'todo'
            ? false
            : existing.completed,
    };

    try {
      await apiClient.put(`/todos/${payload.id}`, {
        title: updatedData.title,
        completed: updatedData.completed,
      });

      toast('Task updated successfully');

      return {
        id: payload.id,
        ...updatedData,
        updatedAt: new Date().toISOString(),
      };
    } catch (err: any) {
      console.log('UPDATE ERROR:', err);
      console.log(err);
      console.log(err.response);
      console.log(err.response?.status);
      console.log(err.response?.data);
      toast('Failed to update task');
      return rejectWithValue('Failed to update task');
    }
  },
);
export const deleteTaskThunk = createAsyncThunk(
  'tasks/deleteTask',
  async (id: string, { rejectWithValue }) => {
    try {
      await apiClient.delete(`/todos/${id}`);
      toast('Task deleted successfully');
      return id;
    } catch {
      return rejectWithValue('Failed to delete task');
    }
  },
);
