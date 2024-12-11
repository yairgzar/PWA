<template>
    <div class="chart-container">
      <h2>Total de Evaluaciones por Tipo de Servicio</h2>
      <div v-if="chartData" class="chart-wrapper">
        <Bar :data="chartData" :options="chartOptions" />
      </div>
      <div v-else>
        <p>Cargando datos...</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { Bar } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
  
  export default {
    components: {
      Bar
    },
    data() {
      return {
        evaluaciones: [],
        chartData: null,
        chartOptions: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `Cantidad: ${context.raw}`;
                }
              }
            }
          }
        }
      };
    },
    async created() {
      await this.getEvaluaciones();
      this.updateChart();
    },
    methods: {
      async getEvaluaciones() {
        try {
          const response = await axios.get('https://gimnasio-deploy.onrender.com/evaluaciones_serv/', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          this.evaluaciones = response.data;
        } catch (error) {
          console.error("Hubo un error al cargar las evaluaciones:", error);
        }
      },
      updateChart() {
        // Agrupar evaluaciones por tipo de servicio
        const serviceCounts = this.evaluaciones.reduce((accumulator, evaluation) => {
          const servicio = evaluation.Servicios;
          accumulator[servicio] = (accumulator[servicio] || 0) + 1;
          return accumulator;
        }, {});
  
        // Convertir el objeto a arrays para el gráfico
        const labels = [
          "Servicios de nutricion",
          "Horarios y precios",
          "Comunidad",
          "Programas de entretenimiento"
        ];
        const data = labels.map(label => serviceCounts[label] || 0);
  
        this.chartData = {
          labels: labels,
          datasets: [
            {
              label: 'Número de Evaluaciones',
              data: data,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }
          ]
        };
      }
    }
  };
  </script>
  
  <style scoped>
  .chart-container {
    margin: 20px;
  }
  
  .chart-wrapper {
    width: 100%;
    height: 300px; /* Ajusta la altura del gráfico */
  }
  </style>
  