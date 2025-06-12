import React, {
  createContext,
  useContext,
  useState
} from 'react';
import { RequestService } from '../services/request.service';
import { Backdrop, CircularProgress } from '@mui/material';

// Context
const ClientContext = createContext();

// Provider
export function ClientProvider({ children }) {
  const [clients, setClients] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAll = async () => {
    try {
      const clients = await RequestService.get('clients?expand=clientProducts');
      setClients(clients);
    } catch (error) {
      throw error?.response?.data || error;
    } finally {
      setLoading(false);
    }
  };

  /* Change especific product */
  const action = async (action, clientID, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Request
        const url = action === 'post' ? 'clients' : `clients/${clientID}`;
        const response = await RequestService[action](url, data);

        // State update
        setClients(prev => prev.map(client =>
          parseInt(client.id) === parseInt(clientID) ? { ...client, ...data } : client
        ));

        console.log(action, response, data)
        if (action === 'post' && response?.id !== undefined && !!data?.products?.length) {
          for (const p of data?.products) { //PROVISOR
            await addProduct(response?.id, p)
              .catch(err => { })
          }
        }
        resolve(response);
      } catch (error) {
        let err = error?.response?.data || error
        err = Array.isArray(err) ? 'campos obrigatórios nao foram preenchidos' : err;
        reject(err);
      }
    });
  };

  const addProduct = async (clientID, product) => {
    return new Promise(async (resolve, reject) => {
      try {
        const productID = product?.id;

        // Request
        const formData = new URLSearchParams();
        formData.append('product', productID)
        formData.append('client', clientID);
        const response = await RequestService.post(`customer-products`, formData);

        // State update
        setClients(prev => prev.map(client => {
          if (parseInt(client.id) === parseInt(clientID)) {
            const existingProducts = client.clientProducts || [];
            return {
              ...client,
              clientProducts: [...existingProducts, { id: existingProducts?.length, product }]
            };
          }
          return client;
        }));

        resolve(response);
      } catch (error) {
        let err = error?.response?.data || error
        err = Array.isArray(err) ? 'campos obrigatórios nao foram preenchidos' : err;
        reject(err);
      }
    });
  };

  const removeProduct = async (clientID, customerID) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Request
        const response = await RequestService.delete(`customer-products/${customerID}`);

        setClients(prev => prev.map(client => {
          if (parseInt(client.id) === parseInt(clientID)) {
            return {
              ...client,
              clientProducts: client?.clientProducts?.filter(
                cp => cp.id !== parseInt(customerID)
              )
            }
          }
          return client;
        }));

        resolve(response);
      } catch (error) {
        let err = error?.response?.data || error;
        err = Array.isArray(err) ? 'Campos obrigatórios não foram preenchidos' : err;
        reject(err);
      }
    });
  };

  return (
    <ClientContext.Provider
      value={{
        clients,
        setClients,
        getAll,
        action,
        addProduct,
        removeProduct
      }}
    >
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={!!loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {children}
    </ClientContext.Provider>
  );
}

// Hook from context
export function useClient() {
  const context = useContext(ClientContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}