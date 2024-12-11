<template>
    <div>
      <h2>Total de Programas Saludables</h2>
      <div v-if="totalProgramas !== null">
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
        programas: [],
        totalProgramas: null,
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
      await this.getProgramas();
      this.totalProgramas = this.programas.length;
      this.updateChart();
    },
    methods: {
      async getProgramas() {
        try {
          const response = await axios.get('https://gimnasio-deploy.onrender.com/programas_saludables', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          this.programas = response.data;
        } catch (error) {
          console.error("Hubo un error al cargar los programas saludables:", error);
        }
      },
      updateChart() {
        this.chartData = {
          labels: ['Total de Programas Saludables'],
          datasets: [
            {
              label: 'Cantidad',
              data: [this.totalProgramas],
              backgroundColor: ['rgba(75, 192, 192, 0.2)'],
              borderColor: ['rgba(75, 192, 192, 1)'],
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
  