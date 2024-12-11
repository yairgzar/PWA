<!-- src/components/HorariosChart.vue -->
<template>
  <div class="chart-container">
    <canvas id="horariosChart"></canvas>
  </div>
</template>

<script>
import axios from 'axios';
import Chart from 'chart.js/auto';

export default {
  data() {
    return {
      horarios: []
    };
  },
  async created() {
    await this.fetchHorarios();
    this.renderChart();
  },
  methods: {
    async fetchHorarios() {
      try {
        const response = await axios.get('https://gimnasio-deploy.onrender.com/schedules/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.horarios = response.data;
        console.log('Datos de horarios:', this.horarios); // Verifica los datos recibidos
      } catch (error) {
        console.error('Error al cargar horarios:', error);
      }
    },
    renderChart() {
      if (!this.horarios.length) {
        console.error('No hay datos para mostrar');
        return;
      }

      // Contar cuántos horarios hay por tipo
      const tiposCount = this.horarios.reduce((acc, horario) => {
        const tipo = horario.Tipo;
        if (!acc[tipo]) {
          acc[tipo] = 0;
        }
        acc[tipo]++;
        return acc;
      }, {});

      // Obtener las etiquetas y los datos para la gráfica
      const labels = Object.keys(tiposCount);
      const data = Object.values(tiposCount);

      // Crear la gráfica
      const ctx = document.getElementById('horariosChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Número de Horarios por Tipo',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  let label = context.label || '';
                  if (label) {
                    label += ': ' + context.raw;
                  }
                  return label;
                }
              }
            }
          },
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
