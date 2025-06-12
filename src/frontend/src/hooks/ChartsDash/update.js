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
          data: {
            labels: newData.labels || [],
            datasets: [
              {
                ...prev[chartType]?.data?.datasets?.[0],
                data: newData.values || [],
              }
            ]
          }
        };
        break;

      case CHART_TYPES.PRODUCTS:
        updatedCharts[chartType] = {
          ...prev[chartType],
          labels: newData?.map(p => p.name),
          datasets: [
            {
              label: 'Vendas (unidades)',
              data: newData?.map(p => p.sales),
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
              borderColor: 'rgba(53, 162, 235, 1)',
              borderWidth: 2
            },
            {
              label: 'Receita (R$)',
              data: newData?.map(p => parseInt(p.sales) * p.sale_price),
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 2
            }
          ]
        };
        break;

      default:
        console.warn(`Tipo de gráfico não suportado: ${chartType}`);
    }

    return updatedCharts;
  });
};