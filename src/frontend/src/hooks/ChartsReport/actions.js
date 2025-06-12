export default function update({
  CHART_TYPES,
  setCharts,
  chartType,
  newData
}) {
  setCharts(prev => {
    const updatedCharts = { ...prev };

    switch (chartType) {
      case CHART_TYPES.SALES:
        updatedCharts[chartType] = {
          ...prev[chartType],
          series: [
            {
              ...prev[chartType].series[0],
              data: Array.isArray(newData.values) ? newData.values : [],
            },
          ],
          xAxis: [
            {
              ...prev[chartType].xAxis[0],
              data: Array.isArray(newData.values) ? newData.labels : [],
            },
          ],
        };
        break;

      case CHART_TYPES.PRODUCTS:
        updatedCharts[chartType] = {
          ...prev[chartType],
          series: [
            {
              ...prev[chartType].series[0],
              data: newData.map(p => p.sales),
            },
          ],
          xAxis: [
            {
              ...prev[chartType].xAxis[0],
              data: newData.map(p => p.name),
            },
          ],
        };
        break;

      case CHART_TYPES.CLIENTS:
        updatedCharts[chartType] = {
          ...prev[chartType],
          series: [
            {
              ...prev[chartType].series[0],
              data: newData.map(c => c.purchases),
            },
          ],
        };
        break;

      default:
        console.warn(`Tipo de gráfico não suportado: ${chartType}`);
    }

    return updatedCharts;
  });
};