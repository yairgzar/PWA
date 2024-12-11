<template>
    <div>
      <h1 class="title-gym text-center">Evaluar Servicios</h1>
      <main class="w-[100%] h-auto ml-2">
        <section class="mx-auto p-4">
          <div class="bg-gray-900 dark:bg-gray-700 shadow rounded-lg p-6">
            <h1 class="text-xl font-semibold mb-4 text-gray-100 dark:text-gray-100">Evaluar Servicio</h1>
            <p class="text-gray-100 dark:text-gray-100 mb-6">
              Ingresa la información correspondiente para evaluar el servicio que recibiste.
            </p>
            <form @submit.prevent="agregarEvaluacion">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <input v-model="form.usuarioId" type="number" placeholder="ID del Usuario" required
                       class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                <input v-model="form.calificacion" type="number" placeholder="Calificación" required min="1" max="5"
                       class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <input v-model="form.criterio" type="text" placeholder="Criterio" required
                       class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                <select v-model="form.servicios" required
                        class="rounded-lg w-full font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                  <option value="">Seleccionar Servicio</option>
                  <option value="servicio1">Servicio 1</option>
                  <option value="servicio2">Servicio 2</option>
                  <!-- Añadir más opciones según los servicios disponibles -->
                </select>
              </div>
              <div class="grid grid-cols-1 mb-6">
                <input v-model="form.fechaRegistro" type="date" placeholder="Fecha de Registro" required
                       class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
              </div>
              <button type="submit" class="px-4 py-2 w-[30%] rounded bg-red-600 text-white hover:bg-gray-600 focus:outline-none transition-colors">
                Enviar Evaluación
              </button>
            </form>
          </div>
          <hr class="border-2 m-4 mt-1">
        </section>
        <section class="m-4">
          <table class="w-full bg-white text-left text-sm text-gray-900 rounded">
            <thead class="bg-gray-50 text-center">
              <tr>
                <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100 rounded-l-md">ID</th>
                <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">ID del Usuario</th>
                <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">Calificación</th>
                <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">Criterio</th>
                <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">Servicio</th>
                <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">Fecha de Registro</th>
              </tr>
            </thead>
            <tbody class="bg-gray-200">
              <tr v-for="evaluacion in evaluaciones" :key="evaluacion.id" class="hover:bg-gray-500">
                <td class="text-center">{{ evaluacion.id }}</td>
                <td class="text-center">{{ evaluacion.usuarioId }}</td>
                <td class="text-center">{{ evaluacion.calificacion }}</td>
                <td class="text-center">{{ evaluacion.criterio }}</td>
                <td class="text-center">{{ evaluacion.servicios }}</td>
                <td class="text-center">{{ evaluacion.fechaRegistro }}</td>
              </tr>
            </tbody>
          </table>
          <hr class="border-2 mt-4">
        </section>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          usuarioId: null,
          calificacion: '',
          criterio: '',
          servicios: '',
          fechaRegistro: ''
        },
        evaluaciones: [
          // Ejemplo de datos, debes reemplazar con datos reales o dinámicos
          {
            id: 1,
            usuarioId: 101,
            calificacion: 5,
            criterio: 'Excelente',
            servicios: 'Servicio 1',
            fechaRegistro: '2024-08-19'
          },
          // Más evaluaciones...
        ]
      };
    },
    methods: {
      agregarEvaluacion() {
        // Añadir la nueva evaluación a la lista
        const newId = this.evaluaciones.length ? this.evaluaciones[this.evaluaciones.length - 1].id + 1 : 1;
        this.evaluaciones.push({ ...this.form, id: newId });
        // Limpiar formulario
        this.form = {
          usuarioId: null,
          calificacion: '',
          criterio: '',
          servicios: '',
          fechaRegistro: ''
        };
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos personalizados */
  </style>
  