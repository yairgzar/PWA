<template>
    <div class="mb-8 p-4 bg-white rounded shadow">
      <!-- Botón para agregar nueva Dieta -->
      <section class="mb-4">
        <button @click="toggleForm" class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 focus:outline-none transition-colors">
          {{ showForm ? 'Cerrar Formulario' : 'Agregar Nueva Dieta' }}
        </button>
      </section>
  
      <!-- Formulario para agregar nueva Dieta -->
      <section v-if="showForm" class="mb-8 p-4 bg-white rounded shadow">
        <h1 class="text-xl font-semibold mb-4 text-gray-900">{{ isEditing ? 'Editar Dieta' : 'Crear nueva Dieta' }}</h1>
        
        <form @submit.prevent="submitForm">
          <div class="grid grid-cols-1 gap-4 mb-6">
            <input 
              v-model="formData.Nombre" 
              type="text" 
              placeholder="Nombre de la Dieta" 
              class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
              required>
          </div>
          <div class="grid grid-cols-1 gap-4 mb-6">
            <textarea 
              v-model="formData.Detalle" 
              placeholder="Detalle de la Dieta" 
              class="w-full p-2 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
              required></textarea>
            <textarea 
              v-model="formData.Descripcion" 
              placeholder="Descripción de la Dieta" 
              class="w-full p-2 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
              required></textarea>
            <textarea 
              v-model="formData.Objetivo" 
              placeholder="Objetivo de la Dieta" 
              class="w-full p-2 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
              required></textarea>
          </div>
          <div class="grid grid-cols-1 gap-4 mb-6">
            <select 
              v-model="formData.Estatus" 
              class="rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
              required>
              <option :value="true">Activo</option>
              <option :value="false">Inactivo</option>
            </select>
          </div>
          <button type="submit" class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 focus:outline-none transition-colors">
            {{ isEditing ? 'Actualizar Dieta' : 'Crear Dieta' }}
          </button>
        </form>
        <div v-if="errorMessage" class="text-red-600 mt-4">{{ errorMessage }}</div>
      </section>
  
      <!-- Sección de la Tabla -->
      <section class="table-responsive">
        <table class="w-full bg-white text-left text-sm text-gray-900 rounded">
          <thead class="bg-gray-50 text-center">
            <tr>
              <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100 rounded-l-md">ID</th>
              <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">NOMBRE</th>
              <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">DETALLE</th>
              <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">DESCRIPCIÓN</th>
              <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">OBJETIVO</th>
              <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">ESTATUS</th>
              <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">FECHA REGISTRO</th>
              <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">FECHA ACTUALIZACIÓN</th>
              <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100 rounded-r-md">ACCIONES</th>
            </tr>
          </thead>
          <tbody class="bg-gray-200">
            <tr v-for="(dieta, i) in dietas" :key="dieta.ID" class="hover:bg-gray-300">
              <td class="h-[50px] text-center">{{ dieta.ID }}</td>
              <td class="text-center">{{ dieta.Nombre }}</td>
              <td class="text-center">{{ dieta.Detalle }}</td>
              <td class="text-center">{{ dieta.Descripcion }}</td>
              <td class="text-center">{{ dieta.Objetivo }}</td>
              <td class="text-center">{{ dieta.Estatus ? 'Activo' : 'Inactivo' }}</td>
              <td class="text-center">{{ new Date(dieta.Fecha_Registro).toLocaleDateString() }}</td>
              <td class="text-center">{{ new Date(dieta.Fecha_Actualizacion).toLocaleDateString() }}</td>
              <td class="flex justify-center space-x-2">
                <button @click="editDieta(dieta)" class="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition-colors flex items-center">
                  Editar
                </button>
                <button @click="deleteDieta(dieta.ID, dieta.Nombre)" class="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none transition-colors flex items-center">
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
          ID: null,
          Nombre: '',
          Detalle: '',
          Descripcion: '',
          Objetivo: '',
          Estatus: true,  
          Fecha_Registro: new Date().toISOString(),
          Fecha_Actualizacion: new Date().toISOString()
        },
        dietas: [], 
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
            const response = await axios.put(`https://gimnasio-deploy.onrender.com/dietas/${this.formData.ID}`, this.formData, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
            });
            const index = this.dietas.findIndex(d => d.ID === this.formData.ID);
            this.dietas.splice(index, 1, response.data); 
          } else {
            const response = await axios.post('https://gimnasio-deploy.onrender.com/dietas/', this.formData, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
            });
            this.dietas.push(response.data);
          }
          this.resetForm();
          this.toggleForm(); 
        } catch (error) {
          if (error.response && error.response.status === 422) {
            this.errorMessage = 'Datos no válidos. Verifique los campos del formulario.';
          } else {
            this.errorMessage = 'Ocurrió un error inesperado.';
          }
        }
      },
      async deleteDieta(id, nombre) {
        if (confirm(`¿Estás seguro de que deseas eliminar la dieta "${nombre}"?`)) {
          try {
            await axios.delete(`https://gimnasio-deploy.onrender.com/dietas/${id}`, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
            });
            this.getDietas(); 
          } catch (error) {
            console.error("Hubo un error al eliminar la dieta:", error);
          }
        }
      },
      editDieta(dieta) {
        this.formData = { ...dieta }; 
        this.isEditing = true; 
        this.showForm = true; 
      },
      async getDietas() {
        try {
          const response = await axios.get('https://gimnasio-deploy.onrender.com/dietas', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          });
          this.dietas = response.data;
        } catch (error) {
          console.error("Hubo un error al cargar las dietas:", error);
        }
      },
      resetForm() {
        this.formData = {
          ID: null,
          Nombre: '',
          Detalle: '',
          Descripcion: '',
          Objetivo: '',
          Estatus: true,  
          Fecha_Registro: new Date().toISOString(),
          Fecha_Actualizacion: new Date().toISOString()
        };
        this.isEditing = false;
        this.errorMessage = '';
      }
    },
    mounted() {
      this.getDietas(); 
    }
  };
  </script>
  
  <style scoped>
  </style>  