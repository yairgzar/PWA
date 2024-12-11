<template>
  <div class="mb-8 p-4 bg-white rounded shadow">
    <!-- Botón para mostrar el formulario -->
    <button 
      v-if="!formVisible" 
      @click="showForm" 
      class="px-4 py-2 mb-4 rounded bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition-colors"
    >
      Crear Empleado
    </button>

    <!-- Sección del Formulario -->
    <section v-if="formVisible" class="mb-8 p-4 bg-white rounded shadow">
      <h1 class="text-xl font-semibold mb-4 text-gray-900">{{ editMode ? 'Actualizar Empleado' : 'Crear nuevo Empleado' }}</h1>
      <p class="text-gray-700 mb-6">{{ editMode ? 'Actualiza la información del empleado seleccionado.' : 'Ingresa la información correspondiente para crear un nuevo empleado.' }}</p>
      
      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input 
            v-model="empleado.Area_ID" 
            type="text" 
            placeholder="Área ID" 
            class="p-2 rounded-lg w-full bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required
          />
          <input 
            v-model="empleado.Puesto_ID" 
            type="text" 
            placeholder="Puesto ID" 
            class="p-2 rounded-lg w-full bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required
          />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input 
            v-model="empleado.Persona_ID" 
            type="text" 
            placeholder="Persona ID" 
            class="p-2 rounded-lg w-full bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required
          />
          <input 
            v-model="empleado.Numero_Empleado" 
            type="text" 
            placeholder="Número de Empleado" 
            class="p-2 rounded-lg w-full bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required
          />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <select 
            v-model="empleado.Estatus" 
            class="p-2 rounded-lg w-full bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required
          >
            <option :value="null">Estatus del Empleado</option>
            <option :value="false">Inactivo</option>
            <option :value="true">Activo</option>
          </select>
        </div>
        <button 
          type="submit" 
          class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 focus:outline-none transition-colors"
        >
          {{ editMode ? 'Actualizar Empleado' : 'Crear Empleado' }}
        </button>
        <button 
          type="button" 
          @click="resetForm"
          class="ml-4 px-4 py-2 rounded bg-gray-400 text-white hover:bg-gray-500 focus:outline-none transition-colors"
        >
          Cancelar
        </button>
      </form>
      <div v-if="errorMessage" class="text-red-600 mt-4">{{ errorMessage }}</div>
    </section>

    <!-- Sección de la Tabla -->
    <section v-if="!formVisible" class="table-responsive">
      <table class="w-full bg-white text-left text-sm text-gray-900 rounded shadow">
        <thead class="bg-gray-50 text-center">
          <tr>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100 rounded-l-md">ID</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">ÁREA ID</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">FECHA CONTRATACIÓN</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">PUESTO ID</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">PERSONA ID</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">NÚMERO EMPLEADO</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">FECHA REGISTRO</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">FECHA ACTUALIZACIÓN</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">ESTATUS</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100 rounded-r-md">ACCIONES</th>
          </tr>
        </thead>
        <tbody class="bg-gray-200">
          <tr v-for="(empleado, i) in empleados" :key="empleado.ID" class="hover:bg-gray-300">
            <td class="h-[50px] text-center">{{ empleado.ID }}</td>
            <td class="text-center">{{ empleado.Area_ID }}</td>
            <td class="text-center">{{ formatDate(empleado.Fecha_Contratacion) }}</td>
            <td class="text-center">{{ empleado.Puesto_ID }}</td>
            <td class="text-center">{{ empleado.Persona_ID }}</td>
            <td class="text-center">{{ empleado.Numero_Empleado }}</td>
            <td class="text-center">{{ formatDate(empleado.Fecha_Registro) }}</td>
            <td class="text-center">{{ formatDate(empleado.Fecha_Actualizacion) }}</td>
            <td class="text-center">{{ empleado.Estatus ? 'Activo' : 'Inactivo' }}</td>
            <td class="flex justify-center">
              <button 
                @click="editEmpleado(empleado)" 
                class="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition-colors flex items-center"
              >
               Editar
              </button> &nbsp;
              <button 
              class="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none transition-colors flex items-center"
                @click="eliminar(empleado.ID, empleado.Numero_Empleado)"
              >
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
      empleado: {
        Area_ID: '',
        Fecha_Contratacion: new Date().toISOString(),
        Puesto_ID: '',
        Persona_ID: '',
        Numero_Empleado: '',
        Fecha_Registro: new Date().toISOString(),
        Fecha_Actualizacion: new Date().toISOString(),
        Estatus: false
      },
      empleados: [], // Lista de empleados
      errorMessage: '',
      editMode: false,
      editingID: null, // ID del empleado que se está editando
      formVisible: false // Controla la visibilidad del formulario
    };
  },
  methods: {
    showForm() {
      this.formVisible = true;
    },
    async submitForm() {
      try {
        if (this.editMode) {
          await axios.put(`https://gimnasio-deploy.onrender.com/empleado/${this.editingID}`, this.empleado, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          });
          this.getEmpleados();
        } else {
          const response = await axios.post('https://gimnasio-deploy.onrender.com/empleados/', this.empleado, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          });
          this.empleados.push(response.data);
        }
        this.resetForm();
      } catch (error) {
        console.error(error);
        this.errorMessage = 'Hubo un error al enviar los datos. Inténtalo de nuevo.';
      }
    },
    resetForm() {
      this.empleado = {
        Area_ID: '',
        Fecha_Contratacion: new Date().toISOString(),
        Puesto_ID: '',
        Persona_ID: '',
        Numero_Empleado: '',
        Fecha_Registro: new Date().toISOString(),
        Fecha_Actualizacion: new Date().toISOString(),
        Estatus: false
      };
      this.errorMessage = '';
      this.formVisible = false;
      this.editMode = false;
      this.editingID = null;
    },
    editEmpleado(empleado) {
      this.empleado = { ...empleado };
      this.editMode = true;
      this.editingID = empleado.ID;
      this.formVisible = true;
    },
    async eliminar(id, numeroEmpleado) {
      try {
        await axios.delete(`https://gimnasio-deploy.onrender.com/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });
        this.empleados = this.empleados.filter(emp => emp.ID !== id);
      } catch (error) {
        console.error(error);
        this.errorMessage = 'Hubo un error al eliminar el empleado. Inténtalo de nuevo.';
      }
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString();
    },
    async getEmpleados() {
      try {
        const response = await axios.get('https://gimnasio-deploy.onrender.com/empleados/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });
        this.empleados = response.data;
      } catch (error) {
        console.error(error);
        this.errorMessage = 'No se pudieron cargar los empleados. Inténtalo de nuevo.';
      }
    }
  },
  mounted() {
    this.getEmpleados();
  }
};
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí */
</style>
