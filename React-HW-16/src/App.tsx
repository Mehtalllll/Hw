import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { PostsPage } from './pages/posts';
import { PostInfo } from './pages/posts info';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MainLayouts } from './layouts/MainLayouts';
import { ErrorBounadry } from './components/Error-Boundary';
import { FertchPostByIdLoader, PostById } from './pages/PostById';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorBounadry />,
    element: <MainLayouts />,
    children: [
      { index: true, element: <p>Home page</p> },
      {
        errorElement: <ErrorBounadry />,
        path: 'posts',
        element: <PostsPage />,
      },
      {
        errorElement: <ErrorBounadry />,
        path: 'post-Info/:id',
        element: <PostById />,
        loader: FertchPostByIdLoader,
      },
      { path: 'Users', element: <PostsPage /> },
    ],
  },
]);
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  );
}

export default App;