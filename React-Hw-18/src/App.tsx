import { PageLayout } from './Layout/PageLayout';
import { Provider as ReduxProvider } from 'react-redux';
import { reduxStore } from './Redux/Store';
import { Products } from './pages/products';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import ShoppingCart from './pages/shoppingCart';
function App() {
  const queryclient = new QueryClient();
  return (
    <QueryClientProvider client={queryclient}>
      <ReduxProvider store={reduxStore}>
        <BrowserRouter>
          <PageLayout>
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/cart" element={<ShoppingCart />} />
            </Routes>
          </PageLayout>
        </BrowserRouter>
      </ReduxProvider>
    </QueryClientProvider>
  );
}

export default App;
