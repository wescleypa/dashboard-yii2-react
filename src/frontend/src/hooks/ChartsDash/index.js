import { useState } from 'react';
import SalesChart from './sales.chart';
import ProductsChart from './products.chart';
import update from './update';

const CHART_TYPES = {
  SALES: 'sales',
  PRODUCTS: 'products'
};

export const useDashboardCharts = (data) => {
  const salesChart = SalesChart(data?.sales)
  const productsChart = ProductsChart(data?.products)

  const [charts, setCharts] = useState({
    [CHART_TYPES.SALES]: salesChart,
    [CHART_TYPES.PRODUCTS]: productsChart,
  });

  const updateChart = (chartType, newData) => update({ CHART_TYPES, setCharts, chartType, newData });

  return { charts, updateChart, CHART_TYPES };
};