import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/router/router';
import { StoreProvider } from './StoreProvider';

export function AppProvider() {
  return (
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  );
}
