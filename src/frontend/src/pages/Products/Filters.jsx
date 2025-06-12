import React, { useState } from 'react';
import Appbar from '../../components/Appbar.component';
import {
  Button, IconButton,
  InputAdornment,
  MenuItem, Select,
  Stack,
  TextField,
  Tooltip
} from '@mui/material';
import { Add, Refresh, Search, Sort } from '@mui/icons-material';

/* App bar whith filters */
const Filters = ({ onFilter, handleRefresh, onCreate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  function handleChange(field, value) {
    if (field === 'search') {
      onFilter({ search: value });
      setSearchTerm(value);
    } else if (field === 'sort') {
      onFilter({ sort: value });
      setSortBy(value);
    }
  }

  return (
    <Appbar
      title="Catálogo de Produtos"
      action={
        <>
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              size="small"
              placeholder="Pesquisar produtos..."
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
              onChange={(e) => handleChange('search', e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: 'none'
                  },
                },
              }}
            />

            <Select
              size="small"
              value={sortBy}
              onChange={(e) => handleChange('sort', e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <Sort fontSize="small" color="primary" />
                </InputAdornment>
              }
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '& .MuiSelect-icon': {
                  color: 'primary.main',
                }
              }}
            >
              <MenuItem value="name">Nome</MenuItem>
              <MenuItem value="price">Preço</MenuItem>
            </Select>

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
            Novo Produto
          </Button>
        </>
      }
    />
  );
};

export default Filters;