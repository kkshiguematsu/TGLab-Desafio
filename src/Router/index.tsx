import { LoginPage } from '../pages/LoginPage';
import { BetPage } from '../pages/BetPage';
import { PrivateRoute } from './PrivateRoute';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <PrivateRoute />,
    children: [{ path: '/bet', element: <BetPage /> }],
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
