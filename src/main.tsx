import { tablestore } from './redux/Store';

import { Provider as TableProvider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <TableProvider store={tablestore}>
    <App />
  </TableProvider>,
);
