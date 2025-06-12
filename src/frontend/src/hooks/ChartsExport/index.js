import { exportPDF } from "./pdf.export";
import { exportExcel } from "./excel.export";

export const normalizeData = (salesData) => {
  if (!salesData) return [];

  if (Array.isArray(salesData)) {
    // [{month: "Jun", month_num: "06", sales: 20}]
    return salesData.map(item => [item.month, item.sales]);
  } else if (salesData.labels && salesData.values) {
    // {labels: ["Jun"], values: [20]}
    return salesData.labels.map((label, i) => [label, salesData.values[i]]);
  }

  return [];
};

const useExportReports = () => {
  return {
    exportExcel,
    exportPDF
  }
};

export default useExportReports;