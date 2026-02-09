import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import App from './App.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import store from './redux/store.js';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data is always considered stale to ensure fresh data on navigation
      staleTime: 0,
      // Keep unused data in cache for 10 minutes
      cacheTime: 10 * 60 * 1000,
      // Retry failed requests 2 times
      retry: 2,
      // Retry delay increases exponentially
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Refetch on window focus for fresh data
      refetchOnWindowFocus: true,
      // Refetch on mount to ensure fresh data
      refetchOnMount: true,
      // Refetch on reconnect
      refetchOnReconnect: true,
    },
    mutations: {
      // Retry failed mutations once
      retry: 1,
    },
  },
});

createRoot(document.getElementById('root')).render(

  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <StrictMode >
        <App />
      </StrictMode>
    </Provider>
  </QueryClientProvider>

)
