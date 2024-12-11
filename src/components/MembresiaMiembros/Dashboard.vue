<template>
    <div class="container">
        <div class="chart-container">
            <h2 class="chart-title">Distribución de membresías por tipo</h2>

            <p class="chart-description">
                Esta gráfica muestra la distribución de los diferentes tipos de membresías disponibles en el sistema.
            </p>

            <div class="graphic-container">
                <doughnut-chart :data="tipoMembresias.chartData" :options="tipoMembresias.chartOptions" />
            </div>
        </div>
        <div class="chart-container">
            <h2 class="chart-title">Cantidad de miembros en {{ instanciaFecha.getFullYear() }}</h2>

            <p class="chart-description">
                Esta gráfica muestra la cantidad de miembros conseguidos en {{ instanciaFecha.getFullYear() }} en el
                sistema.
            </p>

            <div class="graphic-container">
                <LineChart :data="cantidadMiembros.chartData" :options="cantidadMiembros.chartOptions" />
            </div>
        </div>
    </div>
</template>
<script>
import { Doughnut, Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, ArcElement, CategoryScale, LinearScale, PointElement, LineController } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, ArcElement, CategoryScale, LinearScale, PointElement, LineController)

export default {
    components: {
        DoughnutChart: Doughnut,
        LineChart: Line
    },
    data() {
        return {
            token: localStorage.getItem("token"),
            instanciaFecha: new Date(),
            tipoMembresias: {
                labels: [],
                data: [],
                chartData: {
                    labels: ['Red', 'Blue'],
                    datasets: [
                        {
                            label: 'Membresías por tipo',
                            backgroundColor: ['#FF6384', '#36A2EB'],
                            data: [300, 50]
                        }
                    ]
                },
                chartOptions: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                font: {
                                    size: 16
                                },
                                boxWidth: 40
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function (tooltipItem) {
                                    return tooltipItem.label + ': ' + tooltipItem.raw;
                                },
                                bodyFont: {
                                    size: 20,
                                },
                                padding: 10,
                                boxPadding: 5,
                            }
                        }
                    }
                }
            },
            cantidadMiembros: {
                chartData: {
                    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                    datasets: [
                        {
                            label: 'Cantidad de miembros',
                            data: [40, 45, 35, 50, 60, 55, 70],
                            borderColor: '#9C5F04',
                            backgroundColor: 'rgba(66, 165, 245, 0.2)',
                            fill: true,
                            tension: 0.1
                        }
                    ]
                },
                chartOptions: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                font: {
                                    size: 16
                                },
                                boxWidth: 40
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function (tooltipItem) {
                                    return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Meses'
                            }
                        },
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Cantidad de membresías'
                            }
                        }
                    }
                }
            }
        }
    },
    methods: {
        async getMembresiasCountByType() {
            const url = "https://gimnasio-deploy.onrender.com/tipo_membresias/"

            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }

            const apiData = await response.json();
            console.log('Respuesta de la API:', apiData);

            this.labels = Object.keys(apiData)
            this.data = Object.values(apiData)

            this.tipoMembresias.chartData = {
                labels: [...this.labels],
                datasets: [
                    {
                        label: 'Membresías por tipo',
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                        data: [...this.data]
                    }
                ]
            };
        },
        async getMiembrosCount() {
            const url = "https://gimnasio-deploy.onrender.com/miembros_count/"

            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }

            const apiData = await response.json();
            console.log('Respuesta de la API:', apiData);

            this.data = Object.values(apiData)

            this.cantidadMiembros.chartData = {
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'].slice(0, this.data.length),
                datasets: [
                    {
                        label: 'Cantidad de miembros',
                        data: [...this.data],
                        borderColor: '#9C5F04',
                        backgroundColor: 'rgba(66, 165, 245, 0.2)',
                        fill: true,
                        tension: 0.1
                    }
                ]
            };
        }
    },
    created() {
        this.getMembresiasCountByType()
        this.getMiembrosCount()
    }
}
</script>
<style scoped>
.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 20px;
    margin: 0 auto;
    max-width: 100%;
    box-sizing: border-box;
}

.chart-container {
    flex: 1 1 calc(50% - 40px);
    margin: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 30%;
    height: auto;
}

.chart-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
}

.chart-description {
    font-size: 16px;
    margin-bottom: 20px;
    color: #666;
}

.graphic-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 85%;
}
</style>