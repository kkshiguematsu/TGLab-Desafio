import { LoginPage } from '../pages/LoginPage';
import { BetPage } from '../pages/BetPage';
import { PrivateRoute } from './PrivateRoute';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MyTransactionsPage } from '../pages/MyTransactionsPage';
import { MyBetsPage } from '../pages/MyBetsPage';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      { path: '/bet', element: <BetPage /> },
      { path: '/my-bets', element: <MyBetsPage /> },
      { path: '/my-transactions', element: <MyTransactionsPage /> },
    ],
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
