<template>
    <div class="chart-container">
      <h2>Total de Ejercicios por Tipo</h2>
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
        ejercicios: [],
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
      await this.getEjercicios();
      this.updateChart();
    },
    methods: {
      async getEjercicios() {
        try {
          const response = await axios.get('https://gimnasio-deploy.onrender.com/ejercicios', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          this.ejercicios = response.data;
          this.updateChart(); // Actualiza el gráfico después de obtener los datos
        } catch (error) {
          console.error("Hubo un error al cargar los ejercicios:", error);
        }
      },
      updateChart() {
        // Agrupar ejercicios por tipo
        const tipoCounts = this.ejercicios.reduce((accumulator, ejercicio) => {
          const tipo = ejercicio.Tipo;
          accumulator[tipo] = (accumulator[tipo] || 0) + 1;
          return accumulator;
        }, {});
  
        // Convertir el objeto a arrays para el gráfico
        const labels = ["Aerobico", "Resistencia", "Flexibilidad", "Fuerza"];
        const data = labels.map(label => tipoCounts[label] || 0);
  
        this.chartData = {
          labels: labels,
          datasets: [
            {
              label: 'Número de Ejercicios',
              data: data,
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              borderColor: 'rgba(153, 102, 255, 1)',
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
  