export default function SalesReport(data) {
  return {
    series: [
      {
        data: Array.isArray(data?.values) ? data?.values : [],
        label: 'Vendas (R$)',
        color: '#1976d2',
      },
    ],
    height: 400,
    xAxis: [
      {
        data: Array.isArray(data?.values) ? data?.labels : [],
        scaleType: 'band',
      },
    ],
    margin: { left: 70 },
  };
}