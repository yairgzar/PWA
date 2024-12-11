<template>
    <div class="chart-container">
      <h2>Total de Instructores por Especialidad</h2>
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
        instructores: [],
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
      await this.getInstructores();
      this.updateChart();
    },
    methods: {
      async getInstructores() {
        try {
          const response = await axios.get('https://gimnasio-deploy.onrender.com/instructores', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          this.instructores = response.data;
        } catch (error) {
          console.error("Hubo un error al cargar los instructores:", error);
        }
      },
      updateChart() {
        // Agrupar instructores por especialidad
        const specialtyCounts = this.instructores.reduce((accumulator, instructor) => {
          const specialty = instructor.specialty;
          accumulator[specialty] = (accumulator[specialty] || 0) + 1;
          return accumulator;
        }, {});
  
        // Convertir el objeto a arrays para el gráfico
        const labels = Object.keys(specialtyCounts);
        const data = Object.values(specialtyCounts);
  
        this.chartData = {
          labels: labels,
          datasets: [
            {
              label: 'Número de Instructores',
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
  