<template>
  <div class="mb-8 p-4 bg-white rounded shadow">
    <h1 class="title-gym">BULL'S GYM</h1>
    <!-- Botón para agregar nueva Opinión -->
    <section class="mb-4">
      <button @click="toggleForm" class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 focus:outline-none transition-colors">
        {{ showForm ? 'Cerrar Formulario' : 'Agregar Nueva Opinión' }}
      </button>
    </section>

    <!-- Formulario para agregar nueva Opinión (se muestra/oculta al hacer clic en el botón) -->
    <section v-if="showForm" class="mb-8 p-4 bg-white rounded shadow">
      <h1 class="text-xl font-semibold mb-4 text-gray-900">{{ isEditing ? 'Editar Opinión' : 'Crear nueva Opinión' }}</h1>
      
      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-1 gap-4 mb-6">
          <textarea 
            v-model="formData.descripcion" 
            placeholder="Descripción" 
            class="w-full p-2 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required></textarea>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input 
            v-model="formData.tipo" 
            type="text" 
            placeholder="Tipo" 
            class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
          <input 
            v-model="formData.atencion_personal" 
            type="text" 
            placeholder="Atención Personal" 
            class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
        </div>
        <div class="grid grid-cols-1 mb-6">
          <select 
            v-model="formData.estatus" 
            class="rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
            <option :value="null">Estatus</option>
            <option :value="false">Inactivo</option>
            <option :value="true">Activo</option>
          </select>
        </div>
        <button type="submit" class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 focus:outline-none transition-colors">
          {{ isEditing ? 'Actualizar Opinión' : 'Crear Opinión' }}
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
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">DESCRIPCIÓN</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">TIPO</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">ATENCIÓN PERSONAL</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">ESTATUS</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">FECHA REGISTRO</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">FECHA ACTUALIZACIÓN</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100 rounded-r-md">ACCIONES</th>
          </tr>
        </thead>
        <tbody class="bg-gray-200">
          <tr v-for="(opinion, i) in opiniones" :key="opinion.id" class="hover:bg-gray-300">
            <td class="h-[50px] text-center">{{ opinion.id }}</td>
            <td class="text-center">{{ opinion.descripcion }}</td>
            <td class="text-center">{{ opinion.tipo }}</td>
            <td class="text-center">{{ opinion.atencion_personal }}</td>
            <td class="text-center">{{ opinion.estatus ? 'Activo' : 'Inactivo' }}</td>
            <td class="text-center">{{ new Date(opinion.fecha_registro).toLocaleDateString() }}</td>
            <td class="text-center">{{ new Date(opinion.fecha_actualizacion).toLocaleDateString() }}</td>
            <td class="flex justify-center space-x-2">
              <button @click="editOpinion(opinion)" class="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition-colors flex items-center">
                Editar
              </button>
              <button @click="deleteOpinion(opinion.id, opinion.descripcion)" class="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none transition-colors flex items-center">
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
        id: null,
        descripcion: '',
        tipo: '',
        respuesta: '',
        estatus: false,
        fecha_registro: new Date().toISOString(),
        fecha_actualizacion: new Date().toISOString(),
        atencion_personal: ''
      },
      opiniones: [],
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
        // Validar que el ID sea un entero válido antes de enviar
        if (this.isEditing && !Number.isInteger(this.formData.id)) {
          this.errorMessage = 'ID inválido para la edición.';
          return;
        }

        if (this.isEditing) {
          const response = await axios.put(`https://gimnasio-deploy.onrender.com/opiniones_clientes/${this.formData.id}`, this.formData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          });
          const index = this.opiniones.findIndex(o => o.id === this.formData.id);
          if (index !== -1) {
            this.opiniones.splice(index, 1, response.data);
          }
        } else {
          const response = await axios.post('https://gimnasio-deploy.onrender.com/opiniones_clientes/', this.formData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          });
          this.opiniones.push(response.data);
        }
        this.resetForm();
        this.toggleForm();
      } catch (error) {
        if (error.response && error.response.status === 422) {
          this.errorMessage = error.response.data.detail || 'Los datos proporcionados son inválidos.';
        } else {
          this.errorMessage = 'Ocurrió un error inesperado al intentar guardar.';
        }
      }
    },
    async deleteOpinion(id, descripcion) {
      if (confirm(`¿Estás seguro de que quieres eliminar la opinión "${descripcion}"?`)) {
        try {
          await axios.delete(`https://gimnasio-deploy.onrender.com/opiniones_clientes/${id}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          this.opiniones = this.opiniones.filter(opinion => opinion.id !== id);
        } catch (error) {
          this.errorMessage = 'Ocurrió un error inesperado al intentar eliminar.';
        }
      }
    },
    async getOpiniones() {
      try {
        const response = await axios.get('https://gimnasio-deploy.onrender.com/opiniones_clientes/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.opiniones = response.data;
      } catch (error) {
        this.errorMessage = 'Ocurrió un error al cargar las opiniones.';
      }
    },
    editOpinion(opinion) {
      this.formData = { ...opinion };
      this.showForm = true;
      this.isEditing = true;
      this.errorMessage = '';
    },
    resetForm() {
      this.formData = {
        id: null,
        descripcion: '',
        tipo: '',
        respuesta: '',
        estatus: false,
        fecha_registro: new Date().toISOString(),
        fecha_actualizacion: new Date().toISOString(),
        atencion_personal: ''
      };
      this.isEditing = false;
      this.errorMessage = '';
    }
  },
  mounted() {
    this.getOpiniones();
  }
};
</script>

<style scoped>
/* Aquí puedes añadir tus estilos personalizados */
</style>
