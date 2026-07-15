// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { AppProvider } from '@/app/providers/AppProvider.tsx';
import { StrictMode } from 'react';

window.addEventListener('beforeunload', () => {});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider />
  </StrictMode>,
);
