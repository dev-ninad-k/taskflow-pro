import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/router/router';
import { StoreProvider } from './StoreProvider';
import { useEffect } from 'react';
import { initApp } from '@/app/init/app-init';

export function AppProvider() {
  console.log('AppProvider render');

  useEffect(() => {
    console.log('AppProvider effect START');

    initApp();

    return () => {
      console.log('AppProvider cleanup');
    };
  }, []);

  return (
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  );
}
