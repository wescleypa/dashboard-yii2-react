import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import { RequestService } from '../services/request.service';
import { Backdrop, CircularProgress } from '@mui/material';

// Context
const UserContext = createContext();

// Provider
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    async function loadUserFromStorage() {
      try {
        const userToken = new FormData();
        userToken.append('token', token);

        const userData = await RequestService.post('user/login-with-token', userToken);
        setUser(userData?.data);
      } catch (error) {
        console.error('Failed to load user', error);
      } finally {
        setLoadingUser(false);
      }
    }

    if (!!token?.length) {
      setLoadingUser(true);
      loadUserFromStorage();
    }
  }, []);


  const login = async (formData) => {
    try {
      const userData = await RequestService.post('user/login', formData);
      setUser(userData);
      localStorage.setItem('token', userData?.token);
    } catch (error) {
      console.error('Login failed', error);
      throw error?.response?.data || error;
    } finally {
      setLoadingUser(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout
      }}
    >
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={!!loadingUser}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {children}
    </UserContext.Provider>
  );
}

// Hook from context
export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}