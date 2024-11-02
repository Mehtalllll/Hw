import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider as ReduxProvider } from 'react-redux';
import { reduxStore } from './Redux/Store.ts';

createRoot(document.getElementById('root')!).render(
  <ReduxProvider store={reduxStore}>
    <App />
  </ReduxProvider>,
);
