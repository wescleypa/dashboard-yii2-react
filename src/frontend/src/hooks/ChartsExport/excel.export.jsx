import * as XLSX from 'xlsx';
import { normalizeData } from '.';

export const exportExcel = (data, filters) => {
  if (!data) {
    alert('Nenhum dado disponível para exportar');
    return false;
  }

  try {
    let worksheet;
    let workbook = XLSX.utils.book_new();

    switch (filters.type) {
      case 'sales':
        const salesData = normalizeData(data.sales);
        worksheet = XLSX.utils.json_to_sheet(
          salesData.map((row, index) => ({
            Mês: row[0],
            'Vendas (R$)': row[1]
          }))
        );
        break;

      case 'products':
        worksheet = XLSX.utils.json_to_sheet(
          data.products.map(p => ({
            ID: p.id,
            Produto: p.name,
            'Vendas (unidades)': p.sales
          }))
        );
        break;

      case 'clients':
        worksheet = XLSX.utils.json_to_sheet(
          data.clients.map(c => ({
            ID: c.id,
            Cliente: c.name,
            Compras: c.purchases,
            'Última Compra': c.last_purchase
          }))
        );
        break;

      default:
        break;
    }

    XLSX.utils.book_append_sheet(workbook, worksheet, "Relatório");
    XLSX.writeFile(workbook, `relatorio_${filters.type}_${new Date().toISOString().slice(0, 10)}.xlsx`);
    return true;
  } catch (error) {
    console.error('Erro ao gerar Excel:', error);
    alert('Erro ao gerar Excel');
    return false;
  }
};