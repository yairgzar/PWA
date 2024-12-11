<template>
    <div>
      <h2>Total de Preguntas</h2>
      <div v-if="totalPreguntas !== null">
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
        preguntas: [],
        totalPreguntas: null,
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
                  return `Total: ${context.raw}`;
                }
              }
            }
          }
        }
      };
    },
    async created() {
      await this.getPreguntas();
      this.totalPreguntas = this.preguntas.length;
      this.updateChart();
    },
    methods: {
      async getPreguntas() {
        try {
          const response = await axios.get('https://gimnasio-deploy.onrender.com/preguntas/', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          this.preguntas = response.data;
        } catch (error) {
          console.error("Ocurrió un error al obtener las preguntas:", error);
        }
      },
      updateChart() {
        this.chartData = {
          labels: ['Total de Preguntas'],
          datasets: [
            {
              label: 'Cantidad',
              data: [this.totalPreguntas],
              backgroundColor: ['rgba(255, 159, 64, 0.2)'],
              borderColor: ['rgba(255, 159, 64, 1)'],
              borderWidth: 1
            }
          ]
        };
      }
    }
  };
  </script>
  
  <style scoped>
  /* Puedes agregar estilos específicos para esta gráfica aquí */
  </style>
  