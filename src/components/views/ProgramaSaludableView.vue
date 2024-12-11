<template>
  <div class="mb-8 p-4 bg-white rounded shadow">
    <h1 class="title-gym">BULL'S GYM</h1>
    
    <!-- Botón para mostrar el formulario -->
    <section class="mb-4">
      <button @click="toggleForm" class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 focus:outline-none transition-colors">
        {{ showForm ? 'Cerrar Formulario' : 'Crear Nuevo Programa' }}
      </button>
    </section>

    <!-- Formulario para agregar o editar programa (se muestra/oculta al hacer clic en el botón) -->
    <section v-if="showForm" class="mb-8 p-4 bg-white rounded shadow">
      <h1 class="text-xl font-semibold mb-4 text-gray-900">{{ isEditing ? 'Editar Programa' : 'Crear Nuevo Programa' }}</h1>
      
      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input 
            v-model="formData.Nombre" 
            type="text" 
            placeholder="Nombre del Programa" 
            class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
          <input 
            v-model="formData.Usuario_ID" 
            type="number" 
            placeholder="Usuario ID" 
            class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
          <input 
            v-model="formData.Instructor_ID" 
            type="number" 
            placeholder="Instructor ID" 
            class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input 
            v-model="formData.Fecha_Creacion" 
            type="date" 
            placeholder="Fecha Creación" 
            class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
          <input 
            v-model="formData.Fecha_Ultima_Actualizacion" 
            type="date" 
            placeholder="Fecha Última Actualización" 
            class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
          <input 
            v-model="formData.Duracion" 
            type="text" 
            placeholder="Duración" 
            class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
        </div>
        <div class="grid grid-cols-1 mb-6">
          <select 
            v-model="formData.Estatus" 
            class="rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
            <option value="">Selecciona estatus del programa</option>
            <option value="Registrado">Registrado</option>
            <option value="Inactivo">Inactivo</option>
            <option value="Completo">Completo</option>
          </select>
          <input 
            v-model="formData.Porcentaje_Avance" 
            type="number" 
            step="0.1" 
            placeholder="Porcentaje de Avance" 
            class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
        </div>
        <button type="submit" class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 focus:outline-none transition-colors">
          {{ isEditing ? 'Actualizar Programa' : 'Crear Programa' }}
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
            <th scope="col" class="px-6 py-4 bg-red-900 font-medium text-gray-100">USUARIO ID</th>
            <th scope="col" class="px-6 py-4 bg-red-900 font-medium text-gray-100">INSTRUCTOR ID</th>
            <th scope="col" class="px-6 py-4 bg-red-900 font-medium text-gray-100">FECHA CREACIÓN</th>
            <th scope="col" class="px-6 py-4 bg-red-900 font-medium text-gray-100">FECHA ÚLTIMA ACTUALIZACIÓN</th>
            <th scope="col" class="px-6 py-4 bg-red-900 font-medium text-gray-100">DURACIÓN</th>
            <th scope="col" class="px-6 py-4 bg-red-900 font-medium text-gray-100">ESTATUS</th>
            <th scope="col" class="px-6 py-4 bg-red-900 font-medium text-gray-100">PORCENTAJE AVANCE</th>
            <th scope="col" class="px-6 py-4 bg-red-900 font-medium text-gray-100">ACCIONES</th>
          </tr>
        </thead>
        <tbody class="bg-gray-200">
          <tr v-for="(programa, i) in programas" :key="programa.ID" class="hover:bg-gray-300">
            <td class="h-[50px] text-center">{{ programa.ID }}</td>
            <td class="text-center">{{ programa.Nombre }}</td>
            <td class="text-center">{{ programa.Usuario_ID }}</td>
            <td class="text-center">{{ programa.Instructor_ID }}</td>
            <td class="text-center">{{ new Date(programa.Fecha_Creacion).toLocaleDateString() }}</td>
            <td class="text-center">{{ new Date(programa.Fecha_Ultima_Actualizacion).toLocaleDateString() }}</td>
            <td class="text-center">{{ programa.Duracion }}</td>
            <td class="text-center">{{ programa.Estatus }}</td>
            <td class="text-center">{{ programa.Porcentaje_Avance }}%</td>
            <td class="flex justify-center space-x-2">
              <button @click="editPrograma(programa)" class="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition-colors flex items-center">
                Editar
              </button>
              <button @click="deletePrograma(programa.ID, programa.Nombre)" class="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none transition-colors flex items-center">
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
        Usuario_ID: '',
        Instructor_ID: '',
        Fecha_Creacion: new Date().toISOString(),
        Fecha_Ultima_Actualizacion: new Date().toISOString(),
        Duracion: '',
        Estatus: '',
        Porcentaje_Avance: 0
      },
      programas: [], // Lista de programas
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
          const response = await axios.put(`https://gimnasio-deploy.onrender.com/programa/${this.formData.ID}`, this.formData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          this.programas = this.programas.map(p => p.ID === response.data.ID ? response.data : p);
        } else {
          const response = await axios.post('https://gimnasio-deploy.onrender.com/programas_saludables/', this.formData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          this.programas.push(response.data);
        }
        this.resetForm();
        this.toggleForm();
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'Error al guardar el programa.';
      }
    },
    editPrograma(programa) {
      this.formData = { ...programa, Fecha_Creacion: new Date(programa.Fecha_Creacion).toISOString(), Fecha_Ultima_Actualizacion: new Date(programa.Fecha_Ultima_Actualizacion).toISOString() };
      this.isEditing = true;
      this.toggleForm();
    },
    async deletePrograma(id, nombre) {
      if (confirm(`¿Estás seguro de que quieres eliminar el programa "${nombre}"?`)) {
        try {
          await axios.delete(`https://gimnasio-deploy.onrender.com/programa/${id}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          this.programas = this.programas.filter(p => p.ID !== id);
        } catch (error) {
          this.errorMessage = error.response?.data?.message || 'Error al eliminar el programa.';
        }
      }
    },
    async fetchProgramas() {
      try {
        const response = await axios.get('https://gimnasio-deploy.onrender.com/programas_saludables', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.programas = response.data;
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'Error al obtener los programas.';
      }
    },
    resetForm() {
      this.formData = {
        ID: null,
        Nombre: '',
        Usuario_ID: '',
        Instructor_ID: '',
        Fecha_Creacion: new Date().toISOString(),
        Fecha_Ultima_Actualizacion: new Date().toISOString(),
        Duracion: '',
        Estatus: '',
        Porcentaje_Avance: 0
      };
      this.isEditing = false;
    }
  },
  mounted() {
    this.fetchProgramas();
  }
};
</script>

<style scoped>
/* Agrega aquí tus estilos personalizados si es necesario */
</style>
