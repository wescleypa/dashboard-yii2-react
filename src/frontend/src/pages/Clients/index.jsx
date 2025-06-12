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
import { useClient } from '../../providers/client.provider';
import { useToast } from '../../providers/toast.provider';
import Filters from './Filters';
import ClientCard from './client';
import ClientModal from './modal';

const ClientsPage = ({ setPage }) => {
  const { clients, getAll, action, removeProduct, addProduct } = useClient();
  const [loading, setLoading] = useState(true);
  const [clientsFiltered, setFiltered] = useState([]);

  const { showToast, showPromiseToast } = useToast();
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [popoverDelete, setPopoverDelete] = React.useState(null);

  useEffect(() => {
    setFiltered(clients);

    const sel = clients?.find(c => parseInt(c?.id) === parseInt(selected?.id));
    if (sel !== undefined) {
      setSelected(sel);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clients]);

  async function getAllClients() { // GET ALL CLIENTS
    setLoading(true);
    await getAll()
      .catch(err => {
        showToast('error', `Falha ao buscar clientes: ${err?.message}`);
        setPage(null);
        return;
      })
      .finally(() => {
        setLoading(false);
      })
  }

  useEffect(() => {
    if (!!loading && !clients?.length) { // If you are charging for the first time
      getAllClients();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFilter = (term) => {
    let result = [...clients]; // INITIAL CLIENTS BY FILTER

    // FILTER CLIENT BASED ON SEARCH TERM
    if (term?.length) {
      const searchTerm = term.toLowerCase();
      result = result.filter(client =>
        client.name.toLowerCase().includes(searchTerm)
      );
    }

    setFiltered(result);
  }

  // ACTIONS CRUD
  async function handleAction(action, client) {
    setPopoverDelete(null);

    if (action === 'update') {
      setSelected(client)
      setOpenModal(true);
    } else if (action === 'create') {
      setSelected(null)
      setOpenModal(true);
    } else if (action === 'delete') { // In this case, receive object with client and event
      setPopoverDelete(client?.event);
      setSelected(client?.client);
    }
  }

  async function submitDelete() { // DELETE CLIENT
    if (selected?.id === null || selected?.id === undefined) return;
    setPopoverDelete(null);

    await action('delete', selected?.id, null)
      .then(res => {
        showToast('success', 'Cliente atualizado');
        getAllClients();
      })
      .catch(err => {
        showToast('error', `Falha ao atualizar cliente: ${err?.message}`);
      })

    setSelected(null);
  }

  // Função para encontrar diferenças
  function encontrarDiferencas(arr1, arr2) {
    // Extrai os IDs do primeiro array
    const idsArr1 = arr1.map(item => item.id);

    // Filtra o segundo array para encontrar itens que não estão no primeiro
    const diferencas = arr2.filter(item => !idsArr1.includes(item.id));

    return diferencas;
  }

  async function onSubmit(formData) { // UPDATE/CREATE CLIENT
    setLoading(true);
    if (formData?.products?.length && selected !== null) {
      const removeItem = encontrarDiferencas(formData?.products, selected?.clientProducts);

      if (!!removeItem?.length) { // REMOVE PRODUCT
        for (const p of removeItem) {
          await removeProduct(selected?.id, p?.id)
            .catch(err => {
              showToast('error', `Nao foi possível remover o produto: ${err?.message}`);
            })
        }
      }

      for (const p of formData?.products) { // ADD PRODUCT
        if (!!p?.new) {
          await addProduct(selected?.id, p)
            .catch(err => {
              showToast('error', `Nao foi possível remover o produto: ${err?.message}`);
            })
        }
      }
    }

    const request = !!selected ? 'put' : 'post';
    const id = !!selected ? selected?.id : null;
    setOpenModal(false);

    showPromiseToast(
      action(request, id, formData)
        .then(res => {
          if (request === 'post') getAllClients();
        })
        .catch(err => {
          setOpenModal(true);
          throw err;
        }),
      {
        peding: 'Salvando cliente...',
        success: {
          render: (res) => {
            return 'Cliente atualizado';
          }
        },
        error: {
          render: (err) => {
            return `Falha ao atualizar cliente: ${err?.data?.message || err?.message || err?.data}`
          }
        }
      }
    );
  };

  const closePopover = () => {
    setPopoverDelete(null);
    setSelected(null);
  };

  return (
    <div>
      {/* Loading clients */}
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={!clients?.length && !!loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* App bar with filters */}
      <Filters
        onFilter={onFilter}
        handleRefresh={getAllClients}
        onCreate={() => {
          setSelected(null);
          setOpenModal(true);
        }}
      />

      {/* No registered client */}
      {!clients?.length && !loading && (
        <Typography variant='caption' sx={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          Nenhum cliente cadastrado ainda.
        </Typography>
      )}

      {/* Clients list */}
      <ClientsGrid
        clients={clientsFiltered}
        handleAction={handleAction}
      />

      {/* Client modal (new or update) */}
      <ClientModal
        open={!!openModal}
        onClose={() => setOpenModal(false)}
        mode={!selected ? 'create' : 'update'}
        client={selected}
        onSubmit={onSubmit}
      />

      {/*  Actions Popover */}
      <Popover
        id={'action-pop'}
        open={!!popoverDelete}
        anchorEl={popoverDelete}
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
          <Button onClick={submitDelete} color="error">Sim, prosseguir</Button>
          <Button onClick={closePopover}>Cancelar</Button>
        </Container>
      </Popover>
    </div>
  );
};

export default ClientsPage;

// CLIENT GRID LIST
const ClientsGrid = ({ clients, handleAction }) => {
  return (
    <Grid container spacing={2}>
      {clients?.map(c => (
        <Grid key={c?.id} size={{ xs: 12, sm: 3 }}>
          <ClientCard
            key={c?.id}
            client={c}
            handleAction={handleAction}
          />
        </Grid>
      ))}
    </Grid>
  );
};