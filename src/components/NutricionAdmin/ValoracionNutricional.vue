<template>
    <div class="mb-8 p-4 bg-white rounded shadow">
      <!-- Botón para agregar nueva Valoración Nutricional -->
      <section class="mb-4">
        <button @click="toggleForm" class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 focus:outline-none transition-colors">
          {{ showForm ? 'Cerrar Formulario' : 'Agregar Nueva Valoración Nutricional' }}
        </button>
      </section>
  
      <!-- Formulario para agregar nueva Valoración Nutricional -->
      <section v-if="showForm" class="mb-8 p-4 bg-white rounded shadow">
        <h1 class="text-xl font-semibold mb-4 text-gray-900">{{ isEditing ? 'Editar Valoración Nutricional' : 'Crear nueva Valoración Nutricional' }}</h1>
  
        <form @submit.prevent="submitForm">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input 
              v-model="formData.Miembro_ID" 
              type="number" 
              placeholder="ID del Miembro" 
              class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
              required>
            <input 
              v-model="formData.Indicador_ID" 
              type="number" 
              placeholder="ID del Indicador" 
              class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
              required>
          </div>
          <div class="grid grid-cols-1 gap-4 mb-6">
            <input 
              v-model="formData.Pregunta_ID" 
              type="number" 
              placeholder="ID de la Pregunta" 
              class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
              required>
          </div>
          <div class="grid grid-cols-1 gap-4 mb-6">
            <input 
              v-model="formData.Valor" 
              type="text" 
              placeholder="Valor" 
              class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
              required>
            <input 
              v-model="formData.Comentarios" 
              type="text" 
              placeholder="Comentarios" 
              class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
          </div>
          <button type="submit" class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 focus:outline-none transition-colors">
            {{ isEditing ? 'Actualizar Valoración' : 'Crear Valoración' }}
          </button>
        </form>
        <div v-if="errorMessage" class="text-red-600 mt-4">{{ errorMessage }}</div>
      </section>
  
      <!-- Sección de la Tabla -->
      <section class="table-responsive">
        <table class="w-full bg-white text-left text-sm text-gray-900 rounded">
          <thead class="bg-gray-50 text-center">
            <tr>
              <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100 rounded-l-md">Miembro ID</th>
              <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">Indicador ID</th>
              <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">Pregunta ID</th>
              <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">Valor</th>
              <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">Comentarios</th>
              <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">Fecha Registro</th>
              <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">Fecha Actualización</th>
              <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100 rounded-r-md">Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-gray-200">
            <tr v-for="(valoracion, i) in valoraciones" :key="i" class="hover:bg-gray-300">
              <td class="h-[50px] text-center">{{ valoracion.Miembro_ID }}</td>
              <td class="text-center">{{ valoracion.Indicador_ID }}</td>
              <td class="text-center">{{ valoracion.Pregunta_ID }}</td>
              <td class="text-center">{{ valoracion.Valor }}</td>
              <td class="text-center">{{ valoracion.Comentarios }}</td>
              <td class="text-center">{{ new Date(valoracion.Fecha_Registro).toLocaleDateString() }}</td>
              <td class="text-center">{{ new Date(valoracion.Fecha_Actualizacion).toLocaleDateString() }}</td>
              <td class="flex justify-center space-x-2">
                <button @click="editValoracion(valoracion)" class="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition-colors flex items-center">
                  Editar
                </button>
                <button @click="deleteValoracion(valoracion.Miembro_ID, valoracion.Indicador_ID, valoracion.Pregunta_ID)" class="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none transition-colors flex items-center">
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        showForm: false, 
        isEditing: false,
        formData: {
          Miembro_ID: null,
          Indicador_ID: null,
          Pregunta_ID: null,
          Valor: '',
          Comentarios: '',
          Fecha_Registro: new Date().toISOString(),
          Fecha_Actualizacion: new Date().toISOString()
        },
        valoraciones: [], 
        errorMessage: ''
      };
    },
    methods: {
      toggleForm() {
        this.showForm = !this.showForm;
        if (!this.showForm) {
          this.resetForm();
        }
      },
      async submitForm() {
        try {
          if (this.isEditing) {
            const response = await axios.put(`https://gimnasio-deploy.onrender.com/valoracionNutricional/${this.formData.Miembro_ID}/${this.formData.Indicador_ID}/${this.formData.Pregunta_ID}`, this.formData, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
            });
            this.getValoraciones(); 
          } else {
            const response = await axios.post('https://gimnasio-deploy.onrender.com/valoracionNutricional/', this.formData, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
            });
            this.valoraciones.push(response.data);
          }
          this.resetForm();
          this.toggleForm();
        } catch (error) {
          if (error.response && error.response.status === 422) {
            this.errorMessage = 'Datos no válidos. Verifique los campos del formulario.';
          } else if (error.response && error.response.status === 400) {
            this.errorMessage = 'Valoración existente. Intenta nuevamente.';
          } else {
            this.errorMessage = 'Ocurrió un error inesperado.';
          }
        }
      },
      async deleteValoracion(miembro_id, indicador_id, pregunta_id) {
        if (confirm(`¿Estás seguro de que deseas eliminar la valoración?`)) {
          try {
            await axios.delete(`https://gimnasio-deploy.onrender.com/valoracionNutricional/${miembro_id}/${indicador_id}/${pregunta_id}`, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
            });
            this.getValoraciones(); 
          } catch (error) {
            console.error("Hubo un error al eliminar la valoración:", error);
          }
        }
      },
      editValoracion(valoracion) {
        this.formData = { ...valoracion };
        this.isEditing = true;
        this.showForm = true;
      },
      async getValoraciones() {
      try {
        const response = await axios.get('https://gimnasio-deploy.onrender.com/valoracionNutricional/', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });
        this.valoraciones = response.data;
      } catch (error) {
        console.error("Hubo un error al obtener las valoraciones:", error);
      }
    },
    resetForm() {
      this.formData = {
        Miembro_ID: null,
        Indicador_ID: null,
        Pregunta_ID: null,
        Valor: '',
        Comentarios: '',
        Fecha_Registro: new Date().toISOString(),
        Fecha_Actualizacion: new Date().toISOString()
      };
      this.isEditing = false;
      this.errorMessage = '';
    }
  },
  async created() {
    this.getValoraciones(); 
  }
};
</script>

<style scoped>
.table-responsive {
  overflow-x: auto;
}
</style>
