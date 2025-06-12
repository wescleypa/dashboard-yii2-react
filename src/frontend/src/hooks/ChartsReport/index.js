import { useEffect, useState } from 'react';
import SalesReport from './sales.chart';
import ProductsReport from './products.chart';
import ClientsReport from './clients.chart';
import update from './actions';

const CHART_TYPES = {
  SALES: 'sales',
  PRODUCTS: 'products',
  CLIENTS: 'clients',
};

export const useChatsReport = (data) => {
  const [charts, setCharts] = useState({
    [CHART_TYPES.SALES]: { series: [], xAxis: [], height: 400 },
    [CHART_TYPES.PRODUCTS]: { series: [], xAxis: [], height: 400 },
    [CHART_TYPES.CLIENTS]: { series: [], xAxis: [], height: 400 }
  });

  useEffect(() => {
    if (data) {
      setCharts({
        [CHART_TYPES.SALES]: SalesReport(data?.sales),
        [CHART_TYPES.PRODUCTS]: ProductsReport(data?.products),
        [CHART_TYPES.CLIENTS]: ClientsReport(data?.clients)
      });
    }
  }, [data]);

  const updateChart = (chartType, newData) =>
    update({ CHART_TYPES, setCharts, chartType, newData });

  return { charts, updateChart, CHART_TYPES };
};