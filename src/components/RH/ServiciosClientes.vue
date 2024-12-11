<template>
  <div class="mb-8 p-4 bg-white rounded shadow">
    <!-- Botón para agregar nuevo Servicio -->
    <section class="mb-4">
      <button @click="toggleForm" class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition-colors">
        {{ showForm ? 'Cerrar Formulario' : 'Agregar Nuevo Servicio' }}
      </button>
    </section>

    <!-- Formulario para agregar nuevo Servicio (se muestra/oculta al hacer clic en el botón) -->
    <section v-if="showForm" class="mb-8 p-4 bg-white rounded shadow">
      <h1 class="text-xl font-semibold mb-4 text-gray-900">{{ isEditing ? 'Editar Servicio' : 'Crear nuevo Servicio' }}</h1>
      
      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input 
            v-model="formData.Persona_ID" 
            type="text" 
            placeholder="ID de Persona" 
            class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
          <select 
            v-model="formData.Tipo_Servicio" 
            class="rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
            <option :value="null">Tipo de Servicio</option>
            <option v-for="(type, index) in serviceTypes" :key="index" :value="type">{{ type }}</option>
          </select>
        </div>
        <div class="grid grid-cols-1 gap-4 mb-6">
          <textarea 
            v-model="formData.Descripcion" 
            placeholder="Descripción del Servicio" 
            class="w-full p-2 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required></textarea>
          <textarea 
            v-model="formData.Comentarios" 
            placeholder="Comentarios del Servicio" 
            class="w-full p-2 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"></textarea>
        </div>
        <div class="grid grid-cols-1 mb-6">
          <select 
            v-model="formData.Estatus" 
            class="rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
            <option :value="null">Estatus del Servicio</option>
            <option :value="false">Inactivo</option>
            <option :value="true">Activo</option>
          </select>
        </div>
        <button type="submit" class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition-colors">
          {{ isEditing ? 'Actualizar Servicio' : 'Crear Servicio' }}
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
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">PERSONA ID</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">TIPO DE SERVICIO</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">DESCRIPCIÓN</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">COMENTARIOS</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">ESTATUS</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">FECHA REGISTRO</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">FECHA ACTUALIZACIÓN</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100 rounded-r-md">ACCIONES</th>
          </tr>
        </thead>
        <tbody class="bg-gray-200">
          <tr v-for="(servicio, i) in servicios" :key="servicio.ID" class="hover:bg-gray-300">
            <td class="h-[50px] text-center">{{ servicio.ID }}</td>
            <td class="text-center">{{ servicio.Persona_ID }}</td>
            <td class="text-center">{{ servicio.Tipo_Servicio }}</td>
            <td class="text-center">{{ servicio.Descripcion }}</td>
            <td class="text-center">{{ servicio.Comentarios }}</td>
            <td class="text-center">{{ servicio.Estatus ? 'Activo' : 'Inactivo' }}</td>
            <td class="text-center">{{ new Date(servicio.Fecha_Registro).toLocaleDateString() }}</td>
            <td class="text-center">{{ new Date(servicio.Fecha_Actualizacion).toLocaleDateString() }}</td>
            <td class="flex justify-center space-x-2">
              <button @click="editServicio(servicio)" class="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition-colors flex items-center">
                Editar
              </button>
              <button @click="deleteServicio(servicio.ID, servicio.Persona_ID)" class="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none transition-colors flex items-center">
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
        Persona_ID: '',
        Tipo_Servicio: '',
        Descripcion: '',
        Comentarios: '',
        Estatus: false,
        Fecha_Registro: new Date().toISOString(),
        Fecha_Actualizacion: new Date().toISOString()
      },
      servicios: [], // Lista de servicios
      errorMessage: '',
      serviceTypes: ['Consulta', 'Reclamo', 'Sugerencia'], // Opciones para Tipo de Servicio
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
          const response = await axios.put(`https://gimnasio-deploy.onrender.com/servicio_cliente/${this.formData.ID}`, this.formData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          });
          const index = this.servicios.findIndex(s => s.ID === this.formData.ID);
          this.servicios.splice(index, 1, response.data); // Actualiza el servicio en la lista
        } else {
          const response = await axios.post('https://gimnasio-deploy.onrender.com/servicios_clientes/', this.formData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          });
          this.servicios.push(response.data); // Añade el nuevo servicio a la lista
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
    async deleteServicio(id, personaID) {
      if (confirm(`¿Estás seguro de que deseas eliminar el servicio con Persona_ID ${personaID}?`)) {
        try {
          await axios.delete(`https://gimnasio-deploy.onrender.com/servicio_cliente/${id}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          });
          this.servicios = this.servicios.filter(servicio => servicio.ID !== id); // Elimina el servicio de la lista
        } catch (error) {
          this.errorMessage = 'No se pudo eliminar el servicio.';
        }
      }
    },
    editServicio(servicio) {
      this.formData = { ...servicio }; // Carga los datos en el formulario
      this.isEditing = true; // Activa el modo de edición
      this.showForm = true; // Muestra el formulario
    },
    async getServicios() {
      try {
        const response = await axios.get('https://gimnasio-deploy.onrender.com/servicios_clientes/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });
        this.servicios = response.data; // Carga los servicios en la lista
      } catch (error) {
        this.errorMessage = 'No se pudieron cargar los servicios.';
      }
    },
    resetForm() {
      this.formData = {
        ID: null,
        Persona_ID: '',
        Tipo_Servicio: '',
        Descripcion: '',
        Comentarios: '',
        Estatus: false,
        Fecha_Registro: new Date().toISOString(),
        Fecha_Actualizacion: new Date().toISOString()
      };
      this.isEditing = false;
      this.errorMessage = '';
    }
  },
  mounted() {
    this.getServicios(); // Carga los servicios cuando el componente se monta
  }
};
</script>

<style scoped>
/* Puedes agregar estilos específicos aquí si es necesario */
</style>
