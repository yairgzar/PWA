<!-- src/components/EmpleadosChart.vue -->
<template>
    <div>
      <canvas id="empleadosChart"></canvas>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Chart from 'chart.js/auto';
  
  export default {
    data() {
      return {
        empleados: []
      };
    },
    async created() {
      await this.getEmpleados();
      this.renderChart();
    },
    methods: {
      async getEmpleados() {
        try {
          const response = await axios.get('https://gimnasio-deploy.onrender.com/empleados/', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          this.empleados = response.data;
        } catch (error) {
          console.error('Error al cargar empleados:', error);
        }
      },
      renderChart() {
        const areasCount = this.empleados.reduce((acc, empleado) => {
          const areaId = empleado.Area_ID;
          if (!acc[areaId]) {
            acc[areaId] = 0;
          }
          acc[areaId]++;
          return acc;
        }, {});
  
        // Para los nombres de áreas, necesitarás un mapeo, si no tienes los nombres puedes usar los IDs directamente
        // Si tienes nombres, puedes hacer un mapeo aquí
        const labels = Object.keys(areasCount);
        const data = Object.values(areasCount);
  
        const ctx = document.getElementById('empleadosChart').getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Número de Empleados por Área',
              data: data,
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              borderColor: 'rgba(153, 102, 255, 1)',
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
  