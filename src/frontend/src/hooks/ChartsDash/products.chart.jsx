export default function ProductsChart(data) {
  return {
    labels: data?.map(p => p.name),
    datasets: [
      {
        label: 'Vendas (unidades)',
        data: data?.map(p => p.sales),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgba(53, 162, 235, 1)',
        borderWidth: 2
      },
      {
        label: 'Receita (R$)',
        data: data?.map(p => parseInt(p.sales) * p.sale_price),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2
      }
    ]
  };
}