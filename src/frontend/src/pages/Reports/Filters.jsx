import React, { useState } from 'react';
import Appbar from '../../components/Appbar.component';
import {
  Button, FormControl, IconButton,
  InputLabel,
  MenuItem, Select,
  Stack,
  TextField,
  Tooltip
} from '@mui/material';
import { BarChart, CurrencyExchangeOutlined, PictureAsPdf, Refresh, } from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ptBR from 'date-fns/locale/pt-BR';
import { addDays } from 'date-fns'


/* App bar whith filters */
const Filters = ({ filters, setFilters, onFilter, onExport, handleRefresh }) => {
  const [maxDate] = useState(addDays(new Date(filters.endDate), 90)); // Limit to 90 days

  const handleChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
      endDate: field === 'startDate' ? addDays(new Date(value), 30) : prev.endDate
    }));

    if (field !== 'startDate') {
      onFilter({ field, value });
    } else {
      onFilter([
        { field, value },
        { field: 'endDate', value: addDays(new Date(value), 30) }
      ]);
    }
  };

  return (
    <Appbar
      title="Relatórios"
      action={
        <Stack direction="row" spacing={2} alignItems="center">
          <FormControl fullWidth>
            <InputLabel>Tipo de Relatório</InputLabel>
            <Select
              value={filters.type}
              onChange={(e) => handleChange('type', e.target.value)}
              label="Tipo de Relatório"
            >
              <MenuItem value="sales">Vendas</MenuItem>
              <MenuItem value="products">Produtos</MenuItem>
              <MenuItem value="clients">Clientes</MenuItem>
            </Select>
          </FormControl>


          <FormControl fullWidth>
            <InputLabel>Visualização</InputLabel>
            <Select
              value={filters.view}
              onChange={(e) => handleChange('view', e.target.value)}
              label="Visualização"
            >
              <MenuItem value="chart">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <BarChart fontSize="small" />
                  <span>Gráfico</span>
                </Stack>
              </MenuItem>
          {/*     <MenuItem value="table">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Table fontSize="small" />
                  <span>Tabela</span>
                </Stack>
              </MenuItem> */}
            </Select>
          </FormControl>

          <Stack direction="row" spacing={2}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
              <DatePicker
                label="Data Inicial"
                value={filters.startDate}
                onAccept={(value) => handleChange('startDate', value)}
                renderInput={(params) => <TextField {...params} fullWidth />}
                inputFormat="dd/MM/yyyy"
              />
              <DatePicker
                label="Data Final"
                value={filters.endDate}
                onAccept={(value) => handleChange('endDate', value)}
                renderInput={(params) => <TextField {...params} fullWidth />}
                inputFormat="dd/MM/yyyy"
                minDate={addDays(new Date(filters.startDate), 1)}
                maxDate={maxDate}
              />
            </LocalizationProvider>
          </Stack>

          <Button
            variant="outlined"
            startIcon={<PictureAsPdf />}
            onClick={() => onExport('PDF')}
            color="error"
            sx={{ p: '10px 40px' }}
          >
            PDF
          </Button>
          <Button
            variant="outlined"
            startIcon={<CurrencyExchangeOutlined />}
            onClick={() => onExport('EXCEL')}
            color="success"
            sx={{ p: '10px 40px' }}
          >
            Excel
          </Button>


          <Tooltip title="Recarregar">
            <IconButton onClick={handleRefresh}>
              <Refresh color="primary" />
            </IconButton>
          </Tooltip>
        </Stack>
      }
    />
  );
};

export default Filters;