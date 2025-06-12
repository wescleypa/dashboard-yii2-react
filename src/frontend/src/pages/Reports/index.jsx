import React, { useEffect, useState } from 'react';
import {
  Box,
} from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { addDays } from 'date-fns';
import Filters from './Filters';
import { useReports } from '../../providers/reports.provider';
import { useToast } from '../../providers/toast.provider';
import { useChatsReport } from '../../hooks/ChartsReport';
import useExportReports from '../../hooks/ChartsExport';

const ReportsPage = ({ setPage }) => {
  const { exportPDF, exportExcel } = useExportReports();
  const { showToast } = useToast();
  const { getAll, reports } = useReports();
  const currentMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const [filters, setFilters] = useState({
    startDate: currentMonth,
    endDate: addDays(currentMonth, 30),
    type: 'sales',
    view: 'chart'
  });

  const { charts, updateChart, CHART_TYPES } = useChatsReport(reports);
  const handleExportPDF = () => exportPDF(reports, filters);
  const handleExportExcel = () => exportExcel(reports, filters);

  const onExport = (type) => {
    if (type === 'PDF') {
      handleExportPDF();
    } else {
      handleExportExcel();
    }
  }

  const getCharts = async (filter) => {
    let filtersSend = filters;

    if (filter) {
      if (Array.isArray(filter)) {
        filter.forEach(({ field, value }) => {
          if (field && value !== undefined) {
            filtersSend[field] = value;
          }
        });
      } else {
        filtersSend[filter.field] = filter.value
      }
    }

    let body = {
      startDate: filtersSend.startDate,
      endDate: filtersSend.endDate,
      type: filtersSend.view
    };

    await getAll(body)
      .then(res => {
        if (res?.sales) {
          updateChart(CHART_TYPES.SALES, res.sales);
        }
        if (res?.products) {
          updateChart(CHART_TYPES.PRODUCTS, res.products);
        }
        if (res?.clients) {
          updateChart(CHART_TYPES.CLIENTS, res.clients);
        }
      })
      .catch(err => {
        showToast('error', `Falha ao buscar relatórios: ${err?.message}`)
      });
  };

  useEffect(() => { // FIRST SEARCH
    if (!reports?.length) {
      getCharts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <Box>
      <Filters
        filters={filters}
        setFilters={setFilters}
        onFilter={getCharts}
        handleRefresh={getCharts}
        onExport={onExport}
      />

      {filters.view === 'chart' && (
        <BarChart {...charts[CHART_TYPES[filters.type.toUpperCase()]]} />
      )}

      {/* {filters.view === 'table' && ( IN FUTURE USE TABLE WITH LIMIT PRODUCTS BY PAGE
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>cell-row</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>row</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <TablePagination 
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Linhas por página:"
          />
        </TableContainer>
      )} */}
    </Box>
  );
};

export default ReportsPage;