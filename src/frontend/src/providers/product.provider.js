import React, {
  createContext,
  useContext,
  useState
} from 'react';
import { RequestService } from '../services/request.service';
import { Backdrop, CircularProgress } from '@mui/material';

// Context
const ProductContext = createContext();

// Provider
export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  /*  Get all products */
  const getAll = async () => {
    setLoading(true)
    await RequestService.get(`products`)
      .then(res => {
        setProducts(res);
      })
      .catch(err => {
        throw err?.response?.data || err;
      })
      .finally(() => {
        setLoading(false);
      })
  };

  /* Get products from client */
  const getByClient = async (clientID) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await RequestService.get(`products?customer_id=${clientID}`);
        resolve(response);
      } catch (error) {
        reject(error?.response?.data || error);
      }
    });
  };

  /* Change especific product */
  const action = async (action, productID, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Request
        const url = action === 'put' || action === 'delete' ? `products/${productID}` : `products`
        const response = await RequestService[action](url, data);

        // State update
        setProducts(prevProducts => prevProducts.map(product =>
          parseInt(product.id) === parseInt(productID) ? { ...product, ...data } : product
        ));

        resolve(response);
      } catch (error) {
        let err = error?.response?.data || error
        err = Array.isArray(err) ? 'campos obrigatórios nao foram preenchidos' : err;
        reject(err);
      }
    });
  };

  return (
    <ProductContext.Provider
      value={{
        getByClient,
        getAll,
        products,
        action
      }}
    >
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={!!loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {children}
    </ProductContext.Provider>
  );
}

// Hook from context
export function useProduct() {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}