<template>
  <div class="mb-8 p-4 bg-white rounded shadow">
    <h1 class="title-gym">BULL'S GYM</h1>
    
    <!-- Botón para mostrar el formulario -->
    <section class="mb-4">
      <button @click="toggleForm" class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 focus:outline-none transition-colors">
        {{ showForm ? 'Cerrar Formulario' : 'Crear Nueva Rutina' }}
      </button>
    </section>

    <!-- Formulario para agregar o editar rutina (se muestra/oculta al hacer clic en el botón) -->
    <section v-if="showForm" class="mb-8 p-4 bg-white rounded shadow">
      <h1 class="text-xl font-semibold mb-4 text-gray-900">{{ isEditing ? 'Editar Rutina' : 'Crear Nueva Rutina' }}</h1>
      
      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input 
            v-model="formData.Nombre" 
            type="text" 
            placeholder="Nombre de la Rutina" 
            class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
          <input 
            v-model="formData.Programa_Saludable_ID" 
            type="number" 
            placeholder="Programa Saludable" 
            class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
          <input 
            v-model="formData.Fecha_Registro" 
            type="date" 
            placeholder="Fecha Registro" 
            class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input 
            v-model="formData.Fecha_Actualizacion" 
            type="date" 
            placeholder="Fecha Actualización" 
            class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
          <input 
            v-model="formData.Tiempo_Aproximado" 
            type="text" 
            placeholder="Tiempo Aproximado" 
            class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
          <select 
            v-model="formData.Estatus" 
            class="rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
            <option value="">Selecciona estatus de la rutina</option>
            <option value="Actual">Actual</option>
            <option value="Suspendida">Suspendida</option>
            <option value="Concluida">Concluida</option>
          </select>
        </div>
        <div class="grid grid-cols-1 mb-6">
          <input 
            v-model="formData.Resultados_Esperados" 
            type="text" 
            placeholder="Resultados Esperados" 
            class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
        </div>
        <button type="submit" class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 focus:outline-none transition-colors">
          {{ isEditing ? 'Actualizar Rutina' : 'Crear Rutina' }}
        </button>
      </form>
      <div v-if="errorMessage" class="text-red-600 mt-4">{{ errorMessage }}</div>
    </section>

    <!-- Sección de la Tabla -->
    <section class="m-4">
        <table class="w-full bg-white text-left text-sm text-gray-900 rounded">
          <thead class="bg-gray-50 text-center">
            <tr>
              <!-- Encabezados de la tabla -->
              <th scope="col" class="px-6 py-4 bg-red-900 font-medium text-gray-100">ID</th>
              <th scope="col" class="px-6 py-4 bg-red-900 font-medium text-gray-100">NOMBRE</th>
              <th scope="col" class="px-6 py-4 bg-red-900 font-medium text-gray-100">PROGRAMA</th>
              <th scope="col" class="px-6 py-4 bg-red-900 font-medium text-gray-100">FECHA REGISTRO</th>
              <th scope="col" class="px-6 py-4 bg-red-900 font-medium text-gray-100">FECHA ACTUALIZACIÓN</th>
              <th scope="col" class="px-6 py-4 bg-red-900 font-medium text-gray-100">TIEMPO APROXIMADO</th>
              <th scope="col" class="px-6 py-4 bg-red-900 font-medium text-gray-100">ESTATUS</th>
              <th scope="col" class="px-6 py-4 bg-red-900 font-medium text-gray-100">RESULTADOS ESPERADOS</th>
              <th scope="col" class="px-6 py-4 bg-red-900 font-medium text-gray-100">ACCIONES</th>
            </tr>
          </thead>
          <tbody class="bg-gray-200">
            <tr v-for="(rutina, i) in rutinas" :key="rutina.ID" class="hover:bg-gray-300">
              <td class="h-[50px] text-center">{{ rutina.ID }}</td>
              <td class="text-center">{{ rutina.Nombre }}</td>
              <td class="text-center">{{ rutina.Programa_Saludable_ID }}</td>
              <td class="text-center">{{ new Date(rutina.Fecha_Registro).toLocaleDateString() }}</td>
              <td class="text-center">{{ new Date(rutina.Fecha_Actualizacion).toLocaleDateString() }}</td>
              <td class="text-center">{{ rutina.Tiempo_Aproximado }}</td>
              <td class="text-center">{{ rutina.Estatus ? 'Actual' : 'Suspendida' }}</td>
              <td class="text-center">{{ rutina.Resultados_Esperados }}</td>
              <td class="flex justify-center space-x-2">
                <button @click="editRutina(rutina)" class="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition-colors flex items-center">
                  Editar
                </button>
                <button @click="deleteRutina(rutina.ID, rutina.Nombre)" class="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none transition-colors flex items-center">
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
      showForm: false, // Controla la visibilidad del formulario
      isEditing: false, // Indica si estamos en modo de edición
      formData: {
        ID: null,
        Nombre: '',
        Programa_Saludable_ID: '',
        Fecha_Registro: new Date().toISOString(),
        Fecha_Actualizacion: new Date().toISOString(),
        Tiempo_Aproximado: '',
        Estatus: '',
        Resultados_Esperados: ''
      },
      rutinas: [], // Lista de rutinas
      errorMessage: ''
    };
  },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm; // Muestra u oculta el formulario
      if (!this.showForm) {
        this.resetForm(); // Resetea el formulario al cerrar
      }
    },
    async submitForm() {
      try {
        if (this.isEditing) {
          const response = await axios.put(`https://gimnasio-deploy.onrender.com/rutina/${this.formData.ID}`, this.formData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          });
          const index = this.rutinas.findIndex(r => r.ID === this.formData.ID);
          this.rutinas.splice(index, 1, response.data); // Actualiza la rutina en la lista
        } else {
          const response = await axios.post('https://gimnasio-deploy.onrender.com/rutinas',this.formData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          });
          this.rutinas.push(response.data); // Agrega la nueva rutina a la lista
        }
        this.toggleForm(); // Cierra el formulario
        this.resetForm(); // Resetea el formulario
      } catch (error) {
        console.error(error);
        this.errorMessage = 'Error al guardar la rutina. Por favor, inténtelo de nuevo.';
      }
    },
    editRutina(rutina) {
      this.formData = { ...rutina }; // Carga los datos de la rutina seleccionada en el formulario
      this.isEditing = true; // Activa el modo de edición
      this.showForm = true; // Muestra el formulario
    },
    async deleteRutina(id, nombre) {
      if (confirm(`¿Estás seguro de que quieres eliminar la rutina "${nombre}"?`)) {
        try {
          await axios.delete(`https://gimnasio-deploy.onrender.com/rutina/${id}`, {            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          });
          this.rutinas = this.rutinas.filter(rutina => rutina.ID !== id); // Elimina la rutina de la lista
        } catch (error) {
          console.error(error);
          this.errorMessage = 'Error al eliminar la rutina. Por favor, inténtelo de nuevo.';
        }
      }
    },
    resetForm() {
      this.formData = {
        ID: null,
        Nombre: '',
        Programa_Saludable_ID: '',
        Fecha_Registro: new Date().toISOString(),
        Fecha_Actualizacion: new Date().toISOString(),
        Tiempo_Aproximado: '',
        Estatus: '',
        Resultados_Esperados: ''
      };
      this.isEditing = false;
    },
    async fetchRutinas() {
      try {
        const response = await axios.get('https://gimnasio-deploy.onrender.com/rutinas/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });
        this.rutinas = response.data;
      } catch (error) {
        console.error(error);
        this.errorMessage = 'No se pudo cargar la lista de rutinas.';
      }
    },
    async deleteRutina(id) {
      try {
        await axios.delete(`https://gimnasio-deploy.onrender.com/rutina/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        this.rutinas = this.rutinas.filter(rutina => rutina.ID !== id);
      } catch (error) {
        console.error(error);
        this.errorMessage = 'No se pudo eliminar la rutina. Inténtalo de nuevo.';
      }
    },
    editRutina(rutina) {
      this.formData = { ...rutina };
      this.isEditing = true;
      this.editingID = rutina.ID;
      this.showForm = true;
    }
  },
  mounted() {
    this.fetchRutinas();
  }
};
</script>

<style scoped>
.table-responsive {
  overflow-x: auto;
}
</style>


