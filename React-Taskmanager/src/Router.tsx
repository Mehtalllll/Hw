import { NotFound } from './Pages/404';
import { Home } from './Pages/Home';
import { NewTask } from './Pages/New';
import { TaskPage } from './Pages/Tasks';
import { Test3 } from './Pages/text-3';
import { Dashboard } from './Templates/Dashboard';
import { MainLayout } from './Templates/Main';

function Router() {
  switch (window.location.pathname) {
    case '/test1':
      return (
        <MainLayout>
          <Home />
        </MainLayout>
      );
    case '/New':
      return (
        <Dashboard>
          <MainLayout>
            <NewTask />
          </MainLayout>
        </Dashboard>
      );
    case '/Tasks':
      return (
        <Dashboard>
          <MainLayout>
            <TaskPage />
          </MainLayout>
        </Dashboard>
      );
    case '/test3':
      return (
        <MainLayout>
          <Test3 />
        </MainLayout>
      );
      break;

    default:
      return (
        <MainLayout>
          <NotFound />
        </MainLayout>
      );
      break;
  }
}

export default Router;
