<template>
    <div>
      <h2>Total de Productos</h2>
      <div v-if="totalProductos !== null">
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
        productos: [],
        totalProductos: null,
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
      await this.getProductos();
      this.totalProductos = this.productos.length;
      this.updateChart();
    },
    methods: {
      async getProductos() {
        try {
          const response = await axios.get('https://gimnasio-deploy.onrender.com/productos', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          this.productos = response.data.map(producto => ({
            ...producto,
            Precio_actual: parseFloat(producto.Precio_actual)
          }));
        } catch (error) {
          console.error("Hubo un error al cargar los productos:", error);
        }
      },
      updateChart() {
        this.chartData = {
          labels: ['Total de Productos'],
          datasets: [
            {
              label: 'Cantidad',
              data: [this.totalProductos],
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
  