import { useEffect } from "react";
import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Line, Pie } from "react-chartjs-2";
import DefaultPageComponent from "../../components/Defaultpage.component";
import { useDashboardCharts } from "../../hooks/ChartsDash";
import { useReports } from "../../providers/reports.provider";
import { useToast } from "../../providers/toast.provider";
import { Refresh } from "@mui/icons-material";

// ChartJS components register
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const clientAcquisitionData = { // FAKE VALUES
  labels: ['Orgânico', 'Redes Sociais', 'Indicação', 'E-mail', 'Outros'],
  datasets: [
    {
      data: [45, 25, 15, 10, 5],
      backgroundColor: [
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 99, 132, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)'
      ],
      borderWidth: 1
    }
  ]
};

export default function DashboardPage() {
  const { showToast } = useToast();
  const { getAll, reports } = useReports();
  const {
    charts,
    updateChart,
    CHART_TYPES
  } = useDashboardCharts(reports);
  let loading = false;

  const getCharts = async () => { // GET ALL DATA REPORTS
    await getAll()
      .then(res => {
        if (res?.sales) {
          updateChart(CHART_TYPES.SALES, res.sales);
        }
        if (res?.products) {
          updateChart(CHART_TYPES.PRODUCTS, res.products);
        }
      })
      .catch(err => {
        showToast('error', `Falha ao buscar estatísticas: ${err?.message}`)
      })
      .finally(() => {
        loading = false;
      })
  };

  useEffect(() => { // FIRST SEARCH
    if (!reports?.length && !loading) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      loading = true;
      getCharts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DefaultPageComponent title="Painel de Controle" action={
      <IconButton onClick={getCharts}>
        <Refresh color="primary" />
      </IconButton>
    }>
      {/* PRIMARY CHARTS */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Box sx={{ height: 400 }}>
              <Line
                data={charts[CHART_TYPES.SALES]?.data}
                options={charts[CHART_TYPES.SALES]?.options}
              />
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Origem dos Clientes (Nao implementado*)
            </Typography>
            <Box sx={{ height: 350 }}>
              <Pie data={clientAcquisitionData} />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* PRODUCTS */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Performance dos Produtos
        </Typography>
        <Box sx={{ height: 400 }}>
          <Bar
            data={charts[CHART_TYPES.PRODUCTS]}
            options={{
              responsive: true,
              scales: {
                x: { stacked: false },
                y: { stacked: false }
              }
            }}
          />
        </Box>
      </Paper>
    </DefaultPageComponent>
  )
}