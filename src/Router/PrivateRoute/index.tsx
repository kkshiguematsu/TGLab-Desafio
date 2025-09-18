import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CustomAppBar } from '../../components/Appbar';

export const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <CustomAppBar />
      {isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />}
    </>
  );
};
