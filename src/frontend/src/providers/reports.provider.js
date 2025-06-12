import React, {
  createContext,
  useContext,
  useState
} from 'react';
import { RequestService } from '../services/request.service';
import { Backdrop, CircularProgress } from '@mui/material';

// Context
const ReportsContext = createContext();

// Provider
export function ReportsProvider({ children }) {
  const [reports, setReports] = useState({
    sales: { labels: [], values: [] },
    products: [],
    clients: []
  });
  const [loading, setLoading] = useState(false);

  const getAll = async (params) => {
    return new Promise(async (resolve, reject) => {
      try {
        setLoading(true);
        const response = await RequestService.get('report/all', params);
        setLoading(false);
        setReports(response);
        resolve(response);
      } catch (error) {
        setLoading(false);
        reject(error);
      }
    });
  }

  return (
    <ReportsContext.Provider
      value={{
        reports,
        setReports,
        loading,
        setLoading,
        getAll
      }}
    >
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={!!loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {children}
    </ReportsContext.Provider>
  );
}

// Hook from context
export function useReports() {
  const context = useContext(ReportsContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}