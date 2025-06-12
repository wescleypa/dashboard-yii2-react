import React, { useState } from 'react';
import Appbar from '../../components/Appbar.component';
import {
  Button, IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip
} from '@mui/material';
import { Add, Refresh, Search } from '@mui/icons-material';

/* App bar whith filters */
const Filters = ({ onFilter, handleRefresh, onCreate }) => {
  const [searchTerm, setSearchTerm] = useState('');

  function handleChange(term) {
    onFilter(term);
    setSearchTerm(term);
  }

  return (
    <Appbar
      title="Gerenciamento de clientes"
      action={
        <>
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              size="small"
              placeholder="Pesquisar cliente..."
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search color="primary" />
                    </InputAdornment>
                  )
                }
              }}
              value={searchTerm}
              onChange={(e) => handleChange(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: 'none'
                  },
                },
              }}
            />

            <Tooltip title="Recarregar">
              <IconButton onClick={handleRefresh}>
                <Refresh color="primary" />
              </IconButton>
            </Tooltip>
          </Stack>

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={onCreate}
            sx={{ borderRadius: 3 }}
          >
            Novo cliente
          </Button>
        </>
      }
    />
  );
};

export default Filters;