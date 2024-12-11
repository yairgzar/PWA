<template>
  <div class="min-h-screen flex justify-center">
    <div class="max-w-screen-xl m-12 sm:m-10 bg-gray-900 shadow sm:rounded-lg flex justify-center flex-1">
      <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
        <div class="mt-24 ml-20 flex flex-col items-center">
          <h1 class="text-2xl xl:text-3xl font-extrabold text-gray-100">Sign In</h1>
          <div class="w-full flex-1 mt-8">
            <div class="w-full">
              <label for="Nombre_Usuario" class="block text-gray-100 mt-8">Nombre de Usuario</label>
              <input type="text" required id="Nombre_Usuario" v-model="user.Nombre_Usuario"
                     class="w-full border-gray-300 bg-gray-800 text-gray-100 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500">

              <label for="Contrasena" class="block text-gray-100 mt-8">Contraseña</label>
              <input type="password" required id="Contrasena" v-model="user.Contrasena"
                     class="w-full border-gray-300 bg-gray-800 text-gray-100 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500">
              
              <button type="button" @click="login" class="mt-5 tracking-wide font-semibold bg-red-700 text-gray-100 w-full py-4 rounded-lg hover:bg-gray-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                <span class="ml-3">Iniciar Sesión</span>
              </button>

              <p class="mt-6 text-xs text-gray-100 text-center">
                I agree to abide by templatana's
                <a href="#" class="border-b border-gray-500 border-dotted">Terms of Service</a>
                and its
                <a href="#" class="border-b border-gray-500 border-dotted">Privacy Policy</a>
              </p>

              <div class="flex mt-7 items-center text-center w-full">
                <hr class="border-gray-300 w-[60%] rounded-md">
                <a href="/signUp" class="text-sm text-gray-100 hover:text-gray-500 w-[50%]">Crea una Cuenta</a>
                <hr class="border-gray-300 w-[60%] rounded-md">
              </div>
              <div class="flex mt-7 items-center text-center w-full">
                <hr class="border-gray-300 w-[60%] rounded-md">
                <a href="/User" class="text-sm text-gray-100 hover:text-gray-500 w-[50%]">Crea un Usuario</a>
                <hr class="border-gray-300 w-[60%] rounded-md">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-1 bg-gray-900 text-center hidden lg:flex">
        <div class="m-12 w-full bg-contain bg-center bg-no-repeat" style="background-image: url('https://imgs.search.brave.com/wRpc4525FFIjVnyo56N6skWxpk8Pa7DTxzT5VlHG4b0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90by1ncmF0aXMv/bXVqZXItdGlyby1j/b21wbGV0by1heXVk/YW5kby1ob21icmVz/LWdpbW5hc2lvXzIz/LTIxNDk3NDQ2ODAu/anBnP3NpemU9NjI2/JmV4dD1qcGc');">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '@/apiClient'; // Importa la instancia de Axios

export default {
  data() {
    return {
      user: {
        Nombre_Usuario: '',
        Correo_Electronico: '', // Campo vacío
        Contrasena: '',
        Numero_Telefononico_Movil: '' // Campo vacío
      }
    };
  },
  methods: {
    async login() {
      if (!this.user.Nombre_Usuario || !this.user.Contrasena) {
        alert("Por favor, complete todos los campos.");
        return;
      }

      try {
        const response = await apiClient.post('/login/', JSON.stringify(this.user));
        
        // Guarda el token en el almacenamiento local
        localStorage.setItem('token', response.data);

        // Manejar el éxito del inicio de sesión
        this.$router.push('/home');
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        alert("Error al iniciar sesión. Detalles: " + JSON.stringify(error));
      }
    }
  }
};
</script>
