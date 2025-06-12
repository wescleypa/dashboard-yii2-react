export default function ClientsReport(data) {
  return {
    series: [
      {
        data: data?.map(c => c.purchases) || [],
        label: 'Compras (qtd)',
        arcLabel: (item) => `${item.value}`,
        innerRadius: 30,
        outerRadius: 100,
        paddingAngle: 5,
        cornerRadius: 5,
        highlightScope: { faded: 'global', highlighted: 'item' },
        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
      },
    ],
    height: 400,
    xAxis: [
      {
        data: data?.map(c => c.name) || [],
        scaleType: 'band',
      },
    ],
    slotProps: {
      legend: {
        direction: 'row',
        position: { vertical: 'bottom', horizontal: 'middle' },
        padding: 0,
      },
    },
  };
}