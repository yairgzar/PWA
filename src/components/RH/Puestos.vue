<template>
  <div class="mb-8 p-4 bg-white rounded shadow">
    <!-- Botón para agregar nuevo Puesto -->
    <section class="mb-4">
      <button @click="toggleForm" class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition-colors">
        {{ showForm ? 'Cerrar Formulario' : 'Agregar Nuevo Puesto' }}
      </button>
    </section>

    <!-- Formulario para agregar nuevo Puesto (se muestra/oculta al hacer clic en el botón) -->
    <section v-if="showForm" class="mb-8 p-4 bg-white rounded shadow">
      <h1 class="text-xl font-semibold mb-4 text-gray-900">{{ isEditing ? 'Editar Puesto' : 'Crear Nuevo Puesto' }}</h1>
      
      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input 
            v-model="formData.Nombre" 
            type="text" 
            placeholder="Nombre del Puesto" 
            class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
          <input 
            v-model="formData.Salario" 
            type="text" 
            placeholder="Salario" 
            class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
        </div>
        <div class="grid grid-cols-1 mb-6">
          <textarea 
            v-model="formData.Descripcion" 
            placeholder="Descripción del Puesto" 
            class="w-full p-2 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required></textarea>
        </div>
        <div class="grid grid-cols-1 mb-6">
          <textarea 
            v-model="formData.Requisitos" 
            placeholder="Requisitos" 
            class="w-full p-2 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required></textarea>
        </div>
        <div class="grid grid-cols-1 mb-6">
          <select 
            v-model="formData.Estatus" 
            class="rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
            <option :value="null">Estatus del Puesto</option>
            <option :value="false">Inactivo</option>
            <option :value="true">Activo</option>
          </select>
        </div>
        <button type="submit" class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition-colors">
          {{ isEditing ? 'Actualizar Puesto' : 'Crear Puesto' }}
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
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">DESCRIPCIÓN</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">SALARIO</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">REQUISITOS</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">ESTATUS</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">FECHA REGISTRO</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">FECHA ACTUALIZACIÓN</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100 rounded-r-md">ACCIONES</th>
          </tr>
        </thead>
        <tbody class="bg-gray-200">
          <tr v-for="(puesto, i) in puestos" :key="puesto.ID" class="hover:bg-gray-300">
            <td class="h-[50px] text-center">{{ puesto.ID }}</td>
            <td class="text-center">{{ puesto.Nombre }}</td>
            <td class="text-center">{{ puesto.Descripcion }}</td>
            <td class="text-center">{{ puesto.Salario }}</td>
            <td class="text-center">{{ puesto.Requisitos }}</td>
            <td class="text-center">{{ puesto.Estatus ? 'Activo' : 'Inactivo' }}</td>
            <td class="text-center">{{ new Date(puesto.Fecha_Registro).toLocaleDateString() }}</td>
            <td class="text-center">{{ new Date(puesto.Fecha_Actualizacion).toLocaleDateString() }}</td>
            <td class="flex justify-center space-x-2">
              <button @click="editPuesto(puesto)" class="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 focus:outline-none transition-colors flex items-center">
                Editar
              </button>
              <button @click="deletePuesto(puesto.ID, puesto.Nombre)" class="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none transition-colors flex items-center">
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
        Descripcion: '',
        Salario: '',
        Requisitos: '',
        Estatus: false,
        Fecha_Registro: new Date().toISOString(),
        Fecha_Actualizacion: new Date().toISOString()
      },
      puestos: [], // Lista de puestos
      errorMessage: ''
    };
  },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm; // Muestra o oculta el formulario
      if (!this.showForm) {
        this.resetForm(); // Resetea el formulario al cerrar
      }
    },
    async submitForm() {
      try {
        if (this.isEditing) {
          const response = await axios.put(`https://gimnasio-deploy.onrender.com/puesto/${this.formData.ID}`, this.formData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          });
          const index = this.puestos.findIndex(p => p.ID === this.formData.ID);
          this.puestos.splice(index, 1, response.data); // Actualiza el puesto en la lista
        } else {
          const response = await axios.post('https://gimnasio-deploy.onrender.com/puestos/', this.formData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          });
          this.puestos.push(response.data); // Añade el nuevo puesto a la lista
        }
        this.resetForm(); // Resetea el formulario después de guardar
        this.toggleForm(); // Cierra el formulario
      } catch (error) {
        if (error.response && error.response.status === 422) {
          this.errorMessage = 'Datos no válidos. Verifique los campos del formulario.';
        } else {
          this.errorMessage = 'Ocurrió un error inesperado.';
        }
      }
    },
    async deletePuesto(id, nombre) {
      if (confirm(`¿Estás seguro de que deseas eliminar el puesto "${nombre}"?`)) {
        try {
          await axios.delete(`https://gimnasio-deploy.onrender.com/puesto/${id}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          });
          this.puestos = this.puestos.filter(puesto => puesto.ID !== id); // Elimina el puesto de la lista
        } catch (error) {
          this.errorMessage = 'Ocurrió un error al intentar eliminar el puesto.';
        }
      }
    },
    editPuesto(puesto) {
      this.formData = { ...puesto }; // Rellena el formulario con los datos del puesto a editar
      this.isEditing = true;
      this.showForm = true; // Muestra el formulario de edición
    },
    resetForm() {
      this.formData = {
        ID: null,
        Nombre: '',
        Descripcion: '',
        Salario: '',
        Requisitos: '',
        Estatus: false,
        Fecha_Registro: new Date().toISOString(),
        Fecha_Actualizacion: new Date().toISOString()
      };
      this.isEditing = false;
      this.errorMessage = ''; // Limpia el mensaje de error
    },
    async fetchPuestos() {
      try {
        const response = await axios.get('https://gimnasio-deploy.onrender.com/puestos/', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });
        this.puestos = response.data; // Carga la lista de puestos
      } catch (error) {
        this.errorMessage = 'Ocurrió un error al cargar los puestos.';
      }
    }
  },
  mounted() {
    this.fetchPuestos(); // Carga la lista de puestos al montar el componente
  }
};
</script>

<style scoped>
/* Añade aquí estilos específicos para el componente */
</style>
