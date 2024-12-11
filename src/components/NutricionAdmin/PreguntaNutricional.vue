<template>
    <div class="mb-8 p-4 bg-white rounded shadow">
      <!-- Botón para agregar nueva Pregunta Nutricional -->
      <section class="mb-4">
        <button @click="toggleForm" class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition-colors">
          {{ showForm ? 'Cerrar Formulario' : 'Agregar Nueva Pregunta Nutricional' }}
        </button>
      </section>
  
      <!-- Formulario para agregar/editar Pregunta Nutricional -->
      <section v-if="showForm" class="mb-8 p-4 bg-white rounded shadow">
        <h1 class="text-xl font-semibold mb-4 text-gray-900">{{ isEditing ? 'Editar Pregunta Nutricional' : 'Crear nueva Pregunta Nutricional' }}</h1>
        
        <form @submit.prevent="submitForm">
          <div class="grid grid-cols-1 gap-4 mb-6">
            <input 
              v-model="formData.Pregunta" 
              type="text" 
              placeholder="Pregunta" 
              class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
              required>
          </div>
          <button type="submit" class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition-colors">
            {{ isEditing ? 'Actualizar Pregunta' : 'Crear Pregunta' }}
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
              <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">PREGUNTA</th>
              <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">FECHA CREACIÓN</th>
              <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">FECHA ACTUALIZACIÓN</th>
              <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100 rounded-r-md">ACCIONES</th>
            </tr>
          </thead>
          <tbody class="bg-gray-200">
            <tr v-for="(p_nutricional, i) in p_nutricionales" :key="p_nutricional.ID" class="hover:bg-gray-300">
              <td class="h-[50px] text-center">{{ p_nutricional.ID }}</td>
              <td class="text-center">{{ p_nutricional.Pregunta }}</td>
              <td class="text-center">{{ new Date(p_nutricional.Fecha_Creacion).toLocaleDateString() }}</td>
              <td class="text-center">{{ new Date(p_nutricional.Fecha_Actualizacion).toLocaleDateString() }}</td>
              <td class="flex justify-center space-x-2">
                <button @click="editP_Nutricional(p_nutricional)" class="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition-colors flex items-center">
                  Editar
                </button>
                <button @click="deleteP_Nutricional(p_nutricional.ID, p_nutricional.Pregunta)" class="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none transition-colors flex items-center">
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
          Pregunta: '',
          Fecha_Creacion: new Date().toISOString(),
          Fecha_Actualizacion: new Date().toISOString()
        },
        p_nutricionales: [],
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
            const response = await axios.put(`https://gimnasio-deploy.onrender.com/p_nutricionales/${this.formData.ID}`, this.formData, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
            });
            const index = this.p_nutricionales.findIndex(p => p.ID === this.formData.ID);
            this.p_nutricionales.splice(index, 1, response.data);
          } else {
            const response = await axios.post('https://gimnasio-deploy.onrender.com/p_nutricionales/', this.formData, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
            });
            this.p_nutricionales.push(response.data);
          }
          this.resetForm();
          this.toggleForm();
        } catch (error) {
          if (error.response && error.response.status === 400) {
            this.errorMessage = 'Pregunta ya existente. Intenta con otra.';
          } else {
            this.errorMessage = 'Ocurrió un error inesperado.';
          }
        }
      },
      async deleteP_Nutricional(id, pregunta) {
        if (confirm(`¿Estás seguro de que deseas eliminar la pregunta "${pregunta}"?`)) {
          try {
            await axios.delete(`https://gimnasio-deploy.onrender.com/p_nutricionales/${id}`, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
            });
            this.getP_Nutricionales();
          } catch (error) {
            console.error("Hubo un error al eliminar la pregunta:", error);
          }
        }
      },
      editP_Nutricional(p_nutricional) {
        this.formData = { ...p_nutricional };
        this.isEditing = true;
        this.showForm = true;
      },
      async getP_Nutricionales() {
        try {
          const response = await axios.get('https://gimnasio-deploy.onrender.com/p_nutricionales', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          });
          this.p_nutricionales = response.data;
        } catch (error) {
          console.error("Hubo un error al cargar las preguntas nutricionales:", error);
        }
      },
      resetForm() {
        this.formData = {
          ID: null,
          Pregunta: '',
          Fecha_Creacion: new Date().toISOString(),
          Fecha_Actualizacion: new Date().toISOString()
        };
        this.isEditing = false;
        this.errorMessage = '';
      }
    },
    async created() {
      this.getP_Nutricionales();
    }
  };
  </script>
  
  <style scoped>
  .table-responsive {
    overflow-x: auto;
  }
  </style>
  