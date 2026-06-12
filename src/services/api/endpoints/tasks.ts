import { apiClient } from '../client';

export async function getTasks() {
  const response = await apiClient.get('/todos');

  return response.data;
}
