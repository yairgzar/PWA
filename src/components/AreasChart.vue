<!-- src/components/AreasChart.vue -->
<template>
    <div>
      <canvas id="areasChart"></canvas>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Chart from 'chart.js/auto';
  
  export default {
    data() {
      return {
        areas: []
      };
    },
    async created() {
      await this.getAreas();
      this.renderChart();
    },
    methods: {
      async getAreas() {
        try {
          const response = await axios.get('https://gimnasio-deploy.onrender.com/areas', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          this.areas = response.data;
        } catch (error) {
          console.error('Error al cargar áreas:', error);
        }
      },
      renderChart() {
        const sucursalesCount = this.areas.reduce((acc, area) => {
          const sucursal = area.Sucursal;
          if (!acc[sucursal]) {
            acc[sucursal] = 0;
          }
          acc[sucursal]++;
          return acc;
        }, {});
  
        const labels = Object.keys(sucursalesCount);
        const data = Object.values(sucursalesCount);
  
        const ctx = document.getElementById('areasChart').getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Número de Áreas por Sucursal',
              data: data,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    }
  };
  </script>
  
  <style>
  /* Agrega estilos para la gráfica si es necesario */
  </style>
  