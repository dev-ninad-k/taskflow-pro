import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/router/router';
import { StoreProvider } from './StoreProvider';
import { useEffect } from 'react';
import { initApp } from '@/app/init/app-init';

export function AppProvider() {
  useEffect(() => {
    initApp();

    return () => {};
  }, []);

  return (
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  );
}
