<template>
  <div class="mb-8 p-4 bg-white rounded shadow">
    <!-- Botón para agregar nueva Área -->
    <section class="mb-4">
      <button @click="toggleForm" class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 focus:outline-none transition-colors">
        {{ showForm ? 'Cerrar Formulario' : 'Agregar Nueva Área' }}
      </button>
    </section>

    <!-- Formulario para agregar nueva Área (se muestra/oculta al hacer clic en el botón) -->
    <section v-if="showForm" class="mb-8 p-4 bg-white rounded shadow">
      <h1 class="text-xl font-semibold mb-4 text-gray-900">{{ isEditing ? 'Editar Área' : 'Crear nueva Área' }}</h1>
      
      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input 
            v-model="formData.Nombre" 
            type="text" 
            placeholder="Nombre del Área" 
            class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
          <input 
            v-model="formData.Sucursal" 
            type="text" 
            placeholder="Sucursal" 
            class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
        </div>
        <div class="grid grid-cols-1 gap-4 mb-6">
          <textarea 
            v-model="formData.Descripcion" 
            placeholder="Descripción del Área" 
            class="w-full p-2 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required></textarea>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <select 
            v-model="formData.Estatus" 
            class="rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
            <option :value="null">Estatus del Área</option>
            <option :value="false">Inactivo</option>
            <option :value="true">Activo</option>
          </select>
        </div>
        <button type="submit" class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 focus:outline-none transition-colors">
          {{ isEditing ? 'Actualizar Área' : 'Crear Área' }}
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
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">SUCURSAL</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">ESTATUS</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">FECHA REGISTRO</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">FECHA ACTUALIZACIÓN</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100 rounded-r-md">ACCIONES</th>
          </tr>
        </thead>
        <tbody class="bg-gray-200">
          <tr v-for="(area, i) in areas" :key="area.ID" class="hover:bg-gray-300">
            <td class="h-[50px] text-center">{{ area.ID }}</td>
            <td class="text-center">{{ area.Nombre }}</td>
            <td class="text-center">{{ area.Descripcion }}</td>
            <td class="text-center">{{ area.Sucursal }}</td>
            <td class="text-center">{{ area.Estatus ? 'Activo' : 'Inactivo' }}</td>
            <td class="text-center">{{ new Date(area.Fecha_Registro).toLocaleDateString() }}</td>
            <td class="text-center">{{ new Date(area.Fecha_Actualizacion).toLocaleDateString() }}</td>
            <td class="flex justify-center space-x-2">
              <button @click="editArea(area)" class="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition-colors flex items-center">
                Editar
              </button>
              <button @click="deleteArea(area.ID, area.Nombre)" class="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none transition-colors flex items-center">
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
        Sucursal: '',
        Descripcion: '',
        Estatus: false,
        Fecha_Registro: new Date().toISOString(),
        Fecha_Actualizacion: new Date().toISOString()
      },
      areas: [], // Lista de áreas
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
          const response = await axios.put(`https://gimnasio-deploy.onrender.com/areas/${this.formData.ID}`, this.formData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          });
          const index = this.areas.findIndex(a => a.ID === this.formData.ID);
          this.areas.splice(index, 1, response.data); // Actualiza el área en la lista
        } else {
          const response = await axios.post('https://gimnasio-deploy.onrender.com/areas/', this.formData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          });
          this.areas.push(response.data); // Añade el nuevo área a la lista
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
    async deleteArea(id, nombre) {
      if (confirm(`¿Estás seguro de que deseas eliminar el área "${nombre}"?`)) {
        try {
          await axios.delete(`https://gimnasio-deploy.onrender.com/areas/${id}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          });
          this.getAreas(); // Recargar la lista de áreas después de eliminar
        } catch (error) {
          console.error("Hubo un error al eliminar el área:", error);
        }
      }
    },
    editArea(area) {
      this.formData = { ...area }; // Carga los datos del área en el formulario
      this.isEditing = true; // Activa el modo de edición
      this.showForm = true; // Muestra el formulario
    },
    async getAreas() {
      try {
        const response = await axios.get('https://gimnasio-deploy.onrender.com/areas', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });
        this.areas = response.data;
      } catch (error) {
        console.error("Hubo un error al cargar las áreas:", error);
      }
    },
    resetForm() {
      this.formData = {
        ID: null,
        Nombre: '',
        Sucursal: '',
        Descripcion: '',
        Estatus: false,
        Fecha_Registro: new Date().toISOString(),
        Fecha_Actualizacion: new Date().toISOString()
      };
      this.isEditing = false;
      this.errorMessage = '';
    }
  },
  mounted() {
    this.getAreas(); // Carga las áreas al montar el componente
  }
};
</script>

<style scoped>
/* Estilos personalizados */
</style>
