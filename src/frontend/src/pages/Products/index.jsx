import React, { useEffect, useState } from 'react';
import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Grid,
  Popover,
  Typography,
} from '@mui/material';
import ProductCard from './product';
import ProductModal from './modal';
import Filters from './Filters';
import { useProduct } from '../../providers/product.provider';
import { useToast } from '../../providers/toast.provider';

const ProductsPage = ({ setPage }) => {
  const { products, getAll, action } = useProduct();
  const { showToast, showPromiseToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [popoverInactive, setPopoverInactive] = React.useState(null);
  const [popoverDelete, setPopoverDelete] = React.useState(null);
  const [productsFiltered, setFiltered] = useState([]);

  useEffect(() => {
    setFiltered(products);
  }, [products]); // INITIAL DATA

  async function getAllProducts() { // GET ALL PRODUCTS
    setLoading(true);
    await getAll()
      .catch(err => {
        showToast('error', `Falha ao buscar produtos: ${err?.message}`);
        setPage(null);
        return;
      })
      .finally(() => {
        setLoading(false);
      })
  }

  useEffect(() => {
    if (!!loading && !products?.length) { // If you are charging for the first time
      getAllProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFilter = (filter) => {
    let result = [...products]; // ORIGINAL PRODUCTS BY FILTER

    // FILTER BY SEARCH TERM
    if (filter?.search?.length) {
      const searchTerm = filter.search.toLowerCase();
      result = result.filter(item =>
        item.name.toLowerCase().includes(searchTerm) ||
        (item.desc && item.desc.toLowerCase().includes(searchTerm))
      );
    }

    // ORDER BY
    if (filter.sort) {
      const sortBy = filter.sort;
      result = [...result].sort((a, b) => {
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        } else if (sortBy === 'price') {
          return a.price - b.price;
        }
        return 0;
      });
    }

    setFiltered(result);
  }

  // ACTIONS CRUD
  async function handleAction(action, product) {
    setPopoverInactive(null);
    setPopoverDelete(null);

    if (action === 'update') {
      setSelected(product)
      setOpenModal(true);
    } else if (action === 'create') {
      setSelected(null)
      setOpenModal(true);
    } else if (action === 'inactive') { // In this case, receive object with product and event
      setPopoverInactive(product?.event);
      setSelected(product?.product);
    } else if (action === 'delete') { // In this case, receive object with product and event
      setPopoverDelete(product?.event);
      setSelected(product?.product);
    }
  }

  async function submitAction() { // DELETE/INACTIVE PRODUCT
    if (selected?.id === null || selected?.id === undefined) return;

    const isDelete = !!popoverDelete;
    setPopoverInactive(null);
    setPopoverDelete(null);
    const body = {};

    if (!isDelete) {
      body['active'] = !!parseInt(selected?.active) ? 0 : 1;
    }

    await action(!!isDelete ? 'delete' : 'put', selected?.id, body)
      .then(res => {
        showToast('success', 'Produto atualizado');

        if (!!isDelete)
          getAllProducts();
      })
      .catch(err => {
        showToast('error', `Falha ao atualizar produto: ${err?.message}`);
      })

    setSelected(null);
  }

  async function onSubmit(formData) { // UPDATE/CREATE PRODUCT
    const request = !!selected ? 'put' : 'post';
    const id = !!selected ? selected?.id : null;
    setOpenModal(false);

    showPromiseToast(
      action(request, id, formData)
        .then(res => {
          if (request === 'post') getAllProducts(); // SUCCESS -> REFRESH
        })
        .catch(err => {
          setOpenModal(true);
          throw err;
        }),
      {
        peding: 'Salvando produto...',
        success: {
          render: (res) => {
            return 'Produto atualizado';
          }
        },
        error: {
          render: (err) => {
            setOpenModal(true);
            return `Falha ao atualizar produto: ${err?.data?.message || err?.message || err?.data}`
          }
        }
      }
    );
  };

  const closePopover = () => {
    if (!!popoverDelete) {
      setPopoverDelete(null);
      setSelected(null);
    } else {
      setPopoverInactive(null);
      setSelected(null)
    }
  };

  return (
    <div>
      {/* Loading products */}
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={!products?.length && !!loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* App bar with filters */}
      <Filters
        onFilter={onFilter}
        handleRefresh={getAllProducts}
        onCreate={() => {
          setSelected(null);
          setOpenModal(true);
        }}
      />

      {/* No registered product */}
      {!products?.length && !loading && (
        <Typography variant='caption' sx={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          Nenhum produto cadastrado ainda.
        </Typography>
      )}

      {/* Product list */}
      <ProductsGrid
        products={productsFiltered}
        handleAction={handleAction}
      />

      {/* Product modal (new or update) */}
      <ProductModal
        open={!!openModal}
        onClose={() => setOpenModal(false)}
        mode={!selected ? 'create' : 'update'}
        product={selected}
        onSubmit={onSubmit}
      />

      {/*  Actions Popover */}
      <Popover
        id={'action-pop'}
        open={!!popoverInactive || !!popoverDelete}
        anchorEl={popoverInactive || popoverDelete}
        onClose={closePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>
          Você tem certeza disso ?
        </Typography>

        <Container sx={{ mb: 2 }}>
          <Button onClick={submitAction} color="error">Sim, prosseguir</Button>
          <Button onClick={closePopover}>Cancelar</Button>
        </Container>
      </Popover>
    </div>
  );
};

export default ProductsPage;

// GRID LIST PRODUCTS
const ProductsGrid = ({ products, handleAction }) => {
  return (
    <Grid container spacing={2}>
      {products?.map(p => (
        <Grid key={p?.id} size={{ xs: 12, sm: 3 }}>
          <ProductCard
            key={p?.id}
            product={p}
            handleAction={handleAction}
          />
        </Grid>
      ))}
    </Grid>
  );
};