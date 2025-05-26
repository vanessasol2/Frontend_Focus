/*import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './redux/slices/AuthSlice';
import { jwtDecode } from 'jwt-decode';

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        dispatch(login({
          token,
          user: {
            email: decoded.sub,
            name: decoded.name,
          },
          role: decoded.roles?.[0] 
        }));
      } catch (error) {
        console.error('Error token:', error);
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
      }
    }
  }, [dispatch]);

  return children;
};

export default AuthInitializer;*/