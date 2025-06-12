import autoTable from "jspdf-autotable";
import { normalizeData } from ".";
import jsPDF from "jspdf";

export const exportPDF = (data, filters) => {
  try {
    if (!data) {
      throw new Error('Nenhum dado disponível para exportar');
    }

    const doc = new jsPDF();
    const dateRange = `${filters.startDate.toLocaleDateString()} - ${filters.endDate.toLocaleDateString()}`;

    // Título do relatório
    doc.setFontSize(16);
    doc.text(`Relatório de ${filters.type} - ${dateRange}`, 14, 20);

    // Configurações da tabela
    const tableConfig = {
      startY: 30,
      headStyles: {
        fillColor: [33, 150, 243],
        textColor: 255,
        fontStyle: 'bold'
      },
      bodyStyles: {
        fillColor: [245, 245, 245],
        textColor: 0
      }
    };

    switch (filters.type) {
      case 'sales':
        const salesRows = normalizeData(data.sales);
        autoTable(doc, {
          head: [['Mês', 'Vendas']],
          body: salesRows,
          ...tableConfig
        });
        break;

      case 'products':
        autoTable(doc, {
          head: [['ID', 'Produto', 'Vendas']],
          body: data.products.map(p => [p.id, p.name, p.sales]),
          ...tableConfig
        });
        break;

      case 'clients':
        autoTable(doc, {
          head: [['ID', 'Cliente', 'Compras', 'Última Compra']],
          body: data.clients.map(c => [c.id, c.name, c.purchases, c.last_purchase]),
          ...tableConfig
        });
        break;

      default:
        throw new Error('Tipo de relatório não suportado');
    }

    doc.save(`relatorio_${filters.type}_${new Date().toISOString().slice(0, 10)}.pdf`);
    return true;
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    alert(`Erro ao exportar PDF: ${error.message}`);
    return false;
  }
};