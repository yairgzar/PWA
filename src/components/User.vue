<template>
    <div class="mb-8 p-4 bg-white rounded shadow">
      <!-- Sección del Formulario -->
      <section class="mb-8 p-4 bg-white rounded shadow">
        <h1 class="text-xl font-semibold mb-4 text-gray-900">Crear nuevo Usuario</h1>
        <p class="text-gray-700 mb-6">Ingresa la información correspondiente para crear un nuevo usuario.</p>
  
        <form @submit.prevent="submitForm">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input 
              v-model="user.Persona_Id" 
              type="number" 
              placeholder="ID de Persona" 
              class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
              required>
            <input 
              v-model="user.Nombre_Usuario" 
              type="text" 
              placeholder="Nombre de Usuario" 
              class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
              required>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input 
              v-model="user.Correo_Electronico" 
              type="email" 
              placeholder="Correo Electrónico" 
              class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
              required>
            <input 
              v-model="user.Contrasena" 
              type="password" 
              placeholder="Contraseña" 
              class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
              required>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input 
              v-model="user.Numero_Telefononico_Movil" 
              type="text" 
              placeholder="Número Telefónico Móvil" 
              class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
              required>
            <select 
              v-model="user.Estatus" 
              class="rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
              required>
              <option :value="null">Seleccionar Estatus</option>
              <option :value="'Activo'">Activo</option>
              <option :value="'Inactivo'">Inactivo</option>
            </select>
          </div>
          <button type="submit" class="px-4 py-2 rounded bg-red-600 text-white hover:bg-gray-600 focus:outline-none transition-colors">
            Crear Usuario
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
              <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">Persona ID</th>
              <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">NOMBRE DE USUARIO</th>
              <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">CORREO ELECTRÓNICO</th>
              <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">CONTRASEÑA</th>
              <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">NÚMERO TELEFÓNICO MÓVIL</th>
              <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">ESTATUS</th>
              <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">FECHA REGISTRO</th>
              <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">FECHA ACTUALIZACIÓN</th>
              <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100 rounded-r-md">ACCIONES</th>
            </tr>
          </thead>
          <tbody class="bg-gray-200">
            <tr v-for="(user, i) in users" :key="user.ID" class="hover:bg-gray-500">
              <td class="h-[50px] text-center">{{ user.ID }}</td>
              <td class="text-center">{{ user.Persona_Id }}</td>
              <td class="text-center">{{ user.Nombre_Usuario }}</td>
              <td class="text-center">{{ user.Correo_Electronico }}</td>
              <td class="text-center">{{ user.Contrasena }}</td>
              <td class="text-center">{{ user.Numero_Telefononico_Movil }}</td>
              <td class="text-center">{{ user.Estatus }}</td>
              <td class="text-center">{{ user.Fecha_Registro }}</td>
              <td class="text-center">{{ user.Fecha_Actualizacion }}</td>
              <td class="flex justify-center">
                <router-link :to="{ path: 'edit/' + user.ID }" class="px-4 mt-1 py-2 rounded-md bg-red-600 text-white hover:bg-gray-600">
                  <i class="fa-solid fa-edit"></i> Editar
                </router-link> &nbsp;
                <button class="px-4 mt-1 py-2 rounded-md bg-red-600 text-white hover:bg-gray-600" @click="eliminar(user.ID, user.Nombre_Usuario)">
                  <i class="fa-solid fa-trash"></i> Eliminar
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
        user: {
          Persona_Id: '',
          Nombre_Usuario: '',
          Correo_Electronico: '',
          Contrasena: '',
          Numero_Telefononico_Movil: '',
          Estatus: null,
          Fecha_Registro: new Date().toISOString(),
          Fecha_Actualizacion: new Date().toISOString()
        },
        users: [], // Lista de usuarios
        errorMessage: ''
      };
    },
    methods: {
      async submitForm() {
        console.log('Datos del formulario:', this.user);
        try {
          const response = await axios.post('https://gimnasio-deploy.onrender.com/users/', this.user);
          console.log('Respuesta del servidor:', response.data);
          
          // Añadir el nuevo usuario a la lista
          this.users.push(response.data);
          
          // Reiniciar el formulario
          this.user = {
            Persona_Id: '',
            Nombre_Usuario: '',
            Correo_Electronico: '',
            Contrasena: '',
            Numero_Telefononico_Movil: '',
            Estatus: null,
            Fecha_Registro: new Date().toISOString(),
            Fecha_Actualizacion: new Date().toISOString()
          };
        } catch (error) {
          console.error('Error al enviar los datos:', error);
          this.errorMessage = 'Ocurrió un error al enviar los datos. Por favor, intente nuevamente.';
        }
      },
      async eliminar(id, nombreUsuario) {
        const confirmacion = confirm(`¿Estás seguro de que deseas eliminar al usuario ${nombreUsuario}?`);
        if (confirmacion) {
          try {
            await axios.delete(`https://gimnasio-deploy.onrender.com/users/${id}`);
            this.users = this.users.filter(user => user.ID !== id);
          } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            this.errorMessage = 'Ocurrió un error al eliminar el usuario. Por favor, intente nuevamente.';
          }
        }
      },
      async obtenerUsuarios() {
        try {
          const response = await axios.get('https://gimnasio-deploy.onrender.com/users/');
          this.users = response.data;
        } catch (error) {
          console.error('Error al obtener la lista de usuarios:', error);
          this.errorMessage = 'Ocurrió un error al obtener la lista de usuarios. Por favor, intente nuevamente.';
        }
      }
    },
    mounted() {
      this.obtenerUsuarios();
    }
  };
  </script>
  