<template>
    <div>
      <h1 class="text-2xl xl:text-3xl font-extrabold mb-6">Agregar Opinión</h1>
  
      <!-- Formulario para añadir una nueva opinión -->
      <form @submit.prevent="addOpinion">
        <input
          v-model="newOpinion.Descripcion"
          class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
          type="text" placeholder="Descripción" required
        />
        <input
          v-model="newOpinion.Tipo"
          class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
          type="text" placeholder="Tipo" required
        />
        <button
          class="mt-5 tracking-wide font-semibold bg-red-700 text-red-100 w-full py-4 rounded-lg hover:bg-red-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
          type="submit"
        >
          Enviar Opinión
        </button>
      </form>
  
      <!-- Listado de opiniones -->
      <h2 class="text-xl font-bold mt-10">Mis Opiniones</h2>
      <table class="min-w-full bg-white mt-5">
        <thead>
          <tr>
            <th class="py-2">Descripción</th>
            <th class="py-2">Tipo</th>
            <th class="py-2">Fecha Registro</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="opinion in opinions" :key="opinion.Descripcion">
            <td class="border px-4 py-2">{{ opinion.Descripcion }}</td>
            <td class="border px-4 py-2">{{ opinion.Tipo }}</td>
            <td class="border px-4 py-2">{{ opinion.Registro }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        opinions: [
          // Aquí podrías cargar las opiniones del cliente desde un API o servicio
          { Descripcion: "Excelente servicio", Tipo: "Positivo", Registro: "2024-08-01" },
          { Descripcion: "Buena experiencia", Tipo: "Positivo", Registro: "2024-08-10" }
        ],
        newOpinion: {
          Descripcion: "",
          Tipo: "",
          Registro: new Date().toISOString().split('T')[0]  // Fecha actual
        }
      };
    },
    methods: {
      addOpinion() {
        if (this.newOpinion.Descripcion && this.newOpinion.Tipo) {
          this.opinions.push({ ...this.newOpinion });
          this.newOpinion = { Descripcion: "", Tipo: "", Registro: new Date().toISOString().split('T')[0] };
        }
      }
    }
  };
  </script>
  