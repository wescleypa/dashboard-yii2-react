export default function ProductsReport(data) {
  return {
    series: [
      {
        data: data?.map(p => p.sales) || [],
        label: 'Vendas (unidades)',
        color: '#d32f2f',
      },
    ],
    height: 400,
    xAxis: [
      {
        data: data?.map(p => p.name) || [],
        scaleType: 'band',
      },
    ],
    margin: { left: 70 },
  };
}