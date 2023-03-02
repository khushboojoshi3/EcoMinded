import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
 import {
   QueryClient,
   QueryClientProvider,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthContextProvider } from './context/AuthContext';
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

