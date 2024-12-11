<template>
  <div class="mb-8 p-4 bg-white rounded shadow">
    <!-- Botón para crear un nuevo horario -->
    <button @click="showForm" class="mb-4 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300">
      {{ showingForm ? 'Ocultar Formulario' : 'Crear Horario' }}
    </button>

    <!-- Sección del Formulario -->
    <section v-if="showingForm" class="mb-8 p-4 bg-white rounded shadow">
      <h1 class="text-xl font-semibold mb-4 text-gray-900">{{ isEditing ? 'Editar Horario' : 'Crear Horario' }}</h1>
      <p class="text-gray-700 mb-6">Ingresa la información correspondiente para {{ isEditing ? 'modificar' : 'crear' }} un Horario.</p>

      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input 
            v-model="horario.Usuario" 
            type="text" 
            placeholder="Usuario ID" 
            class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
          <input 
            v-model="horario.Tipo" 
            type="text" 
            placeholder="Tipo de horario" 
            class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <select 
            v-model="horario.Estatus" 
            class="rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
            <option :value="null">Estatus del Horario</option>
            <option :value="false">Inactivo</option>
            <option :value="true">Activo</option>
          </select>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input 
            v-model="horario.Empleado" 
            type="text" 
            placeholder="Empleado ID" 
            class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
          <input 
            v-model="horario.Sucursal" 
            type="text" 
            placeholder="Sucursal ID" 
            class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
          <input 
            v-model="horario.Servicio" 
            type="text" 
            placeholder="Servicio ID" 
            class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
        </div>
        <button type="submit" class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-300">
          {{ isEditing ? 'Actualizar Horario' : 'Crear Horario' }}
        </button>
      </form>
      <div v-if="errorMessage" class="text-red-600">{{ errorMessage }}</div>
    </section>

    <!-- Sección de la Tabla -->
    <section class="table-responsive">
      <table class="w-full bg-white text-left text-sm text-gray-900 rounded">
        <thead class="bg-gray-50 text-center">
          <tr>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100 rounded-l-md">ID</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">USUARIO ID</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">TIPO</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">FECHA INICIO</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">FECHA FIN</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">FECHA REGISTRO</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">ESTATUS</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">EMPLEADO ID</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">SUCURSAL ID</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">SERVICIO ID</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100 rounded-r-md">ACCIONES</th>
          </tr>
        </thead>
        <tbody class="bg-gray-200">
          <tr v-for="(horario, i) in horarios" :key="horario.ID" class="hover:bg-gray-500">
            <td class="h-[50px] text-center">{{ horario.ID }}</td>
            <td class="text-center">{{ horario.Usuario }}</td>
            <td class="text-center">{{ horario.Tipo }}</td>
            <td class="text-center">{{ horario.Fecha_Inicio }}</td>
            <td class="text-center">{{ horario.Fecha_Fin }}</td>
            <td class="text-center">{{ horario.Fecha_Registro }}</td>
            <td class="text-center">{{ horario.Estatus ? 'Activo' : 'Inactivo' }}</td>
            <td class="text-center">{{ horario.Empleado }}</td>
            <td class="text-center">{{ horario.Sucursal }}</td>
            <td class="text-center">{{ horario.Servicio }}</td>
            <td class="flex justify-center space-x-2">
              <button class="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition-colors flex items-center" @click="eliminar(horario.ID, horario.Usuario)">
                Eliminar
              </button>
              <router-link :to="{ path: '/horarios/' + horario.ID }" @click.native.prevent="editSchedule(horario)" class="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none transition-colors flex items-center">
                 Editar
              </router-link>
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
      horario: {
        Usuario: '',
        Tipo: '',
        Fecha_Inicio: new Date().toISOString(),
        Fecha_Fin: new Date().toISOString(),
        Fecha_Registro: new Date().toISOString(),
        Estatus: false,
        Empleado: '',
        Sucursal: '',
        Servicio: ''
      },
      horarios: [], // Lista de horarios
      errorMessage: '',
      isEditing: false,
      showingForm: false // Controla la visibilidad del formulario
    };
  },
  methods: {
    async submitForm() {
      try {
        if (this.isEditing) {
          // Lógica para actualizar un horario existente
          const response = await axios.put(`https://gimnasio-deploy.onrender.com/schedules/${this.horario.ID}`, this.horario, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });

          // Actualizar la lista de horarios
          const index = this.horarios.findIndex(h => h.ID === this.horario.ID);
          this.horarios.splice(index, 1, response.data);
        } else {
          // Lógica para crear un nuevo horario
          const response = await axios.post('https://gimnasio-deploy.onrender.com/schedules/', this.horario, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });

          // Agregar el nuevo horario a la lista
          this.horarios.push(response.data);
        }

        // Limpiar formulario y ocultar
        this.resetForm();
        this.showForm();
        
        // Redirigir al inicio después de crear o editar
        this.$router.push('/horarios');
      } catch (error) {
        this.errorMessage = 'Ocurrió un error. Por favor, inténtelo de nuevo.';
        console.error('Error:', error);
      }
    },

    showForm() {
      this.showingForm = !this.showingForm;
      this.resetForm();
    },

    resetForm() {
      this.horario = {
        Usuario: '',
        Tipo: '',
        Fecha_Inicio: new Date().toISOString(),
        Fecha_Fin: new Date().toISOString(),
        Fecha_Registro: new Date().toISOString(),
        Estatus: false,
        Empleado: '',
        Sucursal: '',
        Servicio: ''
      };
      this.isEditing = false;
      this.errorMessage = '';
    },

    editSchedule(horario) {
      this.horario = { ...horario };
      this.isEditing = true;
      this.showingForm = true;
    },

    async eliminar(horarioID) {
      try {
        await axios.delete(`https://gimnasio-deploy.onrender.com/schedules/${horarioID}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        // Eliminar el horario de la lista
        this.horarios = this.horarios.filter(h => h.ID !== horarioID);
      } catch (error) {
        console.error('Error:', error);
      }
    },

    async fetchHorarios() {
      try {
        const response = await axios.get('https://gimnasio-deploy.onrender.com/schedules/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.horarios = response.data;
      } catch (error) {
        console.error('Error:', error);
      }
    }
  },

  mounted() {
    this.fetchHorarios();
  }
};
</script>

<style scoped>
/* Estilos opcionales */
</style>
