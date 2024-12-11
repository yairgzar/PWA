<template>
    <div class="mx-auto p-4">
      <h1 class="title-gym">BULL'S GYM</h1>
      <!-- Botón para agregar nuevo Instructor -->
      <section class="mb-4">
        <button @click="toggleForm" class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 focus:outline-none transition-colors">
          {{ showForm ? 'Cerrar Formulario' : 'Agregar Nuevo Instructor' }}
        </button>
      </section>
  
      <div class="bg-gray-900 dark:bg-gray-700 shadow rounded-lg p-6">
        <!-- Formulario para agregar nuevo Instructor (se muestra/oculta al hacer clic en el botón) -->
        <h1 class="text-xl font-semibold mb-4 text-gray-900">{{ isEditing ? 'Editar Instructor' : 'Crear nuevo Instructor' }}</h1>
        <section v-if="showForm" class="mb-8 p-4 dark:bg-gray-700 rounded shadow">
          <form @submit.prevent="submitForm">
            <!-- Campos del formulario -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input v-model="formData.name" type="text" placeholder="Nombre del Instructor" class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" required>
              <input v-model="formData.email" type="email" placeholder="Email del Instructor" class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" required>
              <select v-model="formData.specialty" class="rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" required>
                <option value="" disabled>Selecciona Especialidad</option>
                <option value="Aeróbico">Aeróbico</option>
                <option value="Resistencia">Resistencia</option>
                <option value="Flexibilidad">Flexibilidad</option>
                <option value="Fuerza">Fuerza</option>
              </select>
              <input v-model="formData.years_of_experience" type="number" placeholder="Años de Experiencia" class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" required>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input v-model="formData.total_clients_attended" type="number" placeholder="Total de Clientes Atendidos" class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
              <select v-model="formData.status" class="rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" required>
                <option value="" disabled>Estatus</option>
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </select>
              <input v-model="formData.rating" type="number" placeholder="Calificación" class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
            </div>
            <button type="submit" class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 focus:outline-none transition-colors">
              {{ isEditing ? 'Actualizar Instructor' : 'Crear Instructor' }}
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
                <th scope="col" class="px-6 py-4 bg-red-900 font-medium text-gray-100 rounded-r-md">ID</th>
                <th scope="col" class="px-6 py-4 bg-red-900 font-medium text-gray-100">NOMBRE</th>
                <th scope="col" class="px-6 py-4 bg-red-900 font-medium text-gray-100">EMAIL</th>
                <th scope="col" class="px-6 py-4 bg-red-900 font-medium text-gray-100">ESPECIALIDAD</th>
                <th scope="col" class="px-6 py-4 bg-red-900 font-medium text-gray-100">AÑOS DE EXPERIENCIA</th>
                <th scope="col" class="px-6 py-4 bg-red-900 font-medium text-gray-100">CLIENTES ATENDIDOS</th>
                <th scope="col" class="px-6 py-4 bg-red-900 font-medium text-gray-100">CALIFICACIÓN</th>
                <th scope="col" class="px-6 py-4 bg-red-900 font-medium text-gray-100">ESTATUS</th>
                <th scope="col" class="px-6 py-4 bg-red-900 font-medium text-gray-100">FECHA REGISTRO</th>
                <th scope="col" class="px-6 py-4 bg-red-900 font-medium text-gray-100">FECHA ACTUALIZACIÓN</th>
                <th scope="col" class="px-6 py-4 bg-red-900 font-medium text-gray-100 rounded-r-md">ACCIONES</th>
              </tr>
            </thead>
            <tbody class="bg-gray-200">
              <tr v-for="(instructor, i) in instructores" :key="instructor.id" class="hover:bg-gray-300">
                <td class="h-[50px] text-center">{{ instructor.id }}</td>
                <td class="text-center">{{ instructor.name }}</td>
                <td class="text-center">{{ instructor.email }}</td>
                <td class="text-center">{{ instructor.specialty }}</td>
                <td class="text-center">{{ instructor.years_of_experience }}</td>
                <td class="text-center">{{ instructor.total_clients_attended }}</td>
                <td class="text-center">{{ instructor.rating }}</td>
                <td class="text-center">{{ instructor.status ? 'Activo' : 'Inactivo' }}</td>
                <td class="text-center">{{ new Date(instructor.registration_date).toLocaleDateString() }}</td>
                <td class="text-center">{{ new Date(instructor.update_date).toLocaleDateString() }}</td>
                <td class="flex justify-center space-x-2">
                  <button @click="editInstructor(instructor)" class="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition-colors flex items-center">
                    Editar
                  </button>
                  <button @click="deleteInstructor(instructor.id, instructor.name)" class="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none transition-colors flex items-center">
                    Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
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
          name: '',
          email: '',
          specialty: '',
          years_of_experience: 0,
          total_clients_attended: 0,
          status: true,
          registration_date: new Date().toISOString(),
          update_date: null,
          rating: 0
        },
        instructores: [],
        errorMessage: ''
      };
    },
    methods: {
      toggleForm() {
        this.showForm = !this.showForm;
        if (this.showForm) {
          this.isEditing = false;
          this.resetForm();
        }
      },
      resetForm() {
        this.formData = {
          id: null,
          name: '',
          email: '',
          specialty: '',
          years_of_experience: 0,
          total_clients_attended: 0,
          status: true,
          registration_date: new Date().toISOString(),
          update_date: null,
          rating: 0
        };
        this.errorMessage = '';
      },
      async submitForm() {
        try {
          const url = this.isEditing ? `https://gimnasio-deploy.onrender.com/instructors/${this.formData.id}` : 'https://gimnasio-deploy.onrender.com/instructors';
          const method = this.isEditing ? 'put' : 'post';
  
          await axios({
            method,
            url,
            data: this.formData,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
  
          this.fetchInstructores();
          this.toggleForm();
        } catch (error) {
          this.errorMessage = 'Hubo un error al enviar el formulario.';
        }
      },
      async fetchInstructores() {
        try {
          const response = await axios.get('https://gimnasio-deploy.onrender.com/instructors', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          this.instructores = response.data;
        } catch (error) {
          console.error('Error al obtener los instructores:', error);
        }
      },
      editInstructor(instructor) {
        this.formData = { ...instructor };
        this.showForm = true;
        this.isEditing = true;
      },
      async deleteInstructor(id, name) {
        if (confirm(`¿Estás seguro de que quieres eliminar al instructor ${name}?`)) {
          try {
            await axios.delete(`https://gimnasio-deploy.onrender.com/instructors/${id}`, {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
            });
            this.fetchInstructores();
          } catch (error) {
            console.error('Error al eliminar el instructor:', error);
          }
        }
      }
    },
    mounted() {
      this.fetchInstructores();
    }
  };
  </script>
  
  <style scoped>
  /* Aquí puedes agregar estilos adicionales si es necesario */
  </style>
  