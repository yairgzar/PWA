<template>
  <div class="mb-8 p-4 bg-white rounded shadow">
    <h1 class="title-gym">BULL'S GYM</h1>
    <!-- Botón para agregar nueva Promoción -->
    <section class="mb-4">
      <button @click="toggleForm" class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition-colors">
        {{ showForm ? 'Cerrar Formulario' : 'Agregar Nueva Promoción' }}
      </button>
    </section>

    <!-- Formulario para agregar nueva Promoción (se muestra/oculta al hacer clic en el botón) -->
    <section v-if="showForm" class="mb-8 p-4 bg-white rounded shadow">
      <h1 class="text-xl font-semibold mb-4 text-gray-900">{{ isEditing ? 'Editar Promoción' : 'Crear Nueva Promoción' }}</h1>

      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input 
            v-model.number="formData.Producto_id" 
            type="number" 
            placeholder="ID del Producto" 
            class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
          <select 
            v-model="formData.Tipo" 
            class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
            <option :value="null">Selecciona Tipo</option>
            <option value="Miembro">Miembro</option>
            <option value="Empleado">Empleado</option>
            <option value="Usuario">Usuario</option>
          </select>
          <select 
            v-model="formData.Aplicacion_en" 
            class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
            <option :value="null">Selecciona Aplicación</option>
            <option value="Tienda_virtual">Tienda virtual</option>
            <option value="Tienda_presencial">Tienda presencial</option>
          </select>
          <input 
            v-model="formData.Fecha_Registro" 
            type="date" 
            class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
          <input 
            v-model="formData.Fecha_Actualizacion" 
            type="date" 
            class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
        </div>
        <div class="grid grid-cols-1 mb-6">
          <select 
            v-model="formData.Estatus" 
            class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
            <option :value="null">Selecciona Estatus</option>
            <option :value="true">Activo</option>
            <option :value="false">Inactivo</option>
          </select>
        </div>
        <button type="submit" class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition-colors">
          {{ isEditing ? 'Actualizar Promoción' : 'Crear Promoción' }}
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
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">PRODUCTO ID</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">TIPO</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">APLICACIÓN</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">FECHA REGISTRO</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">FECHA ACTUALIZACIÓN</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">ESTATUS</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100 rounded-r-md">ACCIONES</th>
          </tr>
        </thead>
        <tbody class="bg-gray-200">
          <tr v-for="(promocion, i) in promociones" :key="promocion.ID" class="hover:bg-gray-300">
            <td class="h-[50px] text-center">{{ promocion.ID }}</td>
            <td class="text-center">{{ promocion.Producto_id }}</td>
            <td class="text-center">{{ promocion.Tipo }}</td>
            <td class="text-center">{{ promocion.Aplicacion_en }}</td>
            <td class="text-center">{{ new Date(promocion.Fecha_Registro).toLocaleDateString() }}</td>
            <td class="text-center">{{ new Date(promocion.Fecha_Actualizacion).toLocaleDateString() }}</td>
            <td class="text-center">{{ promocion.Estatus ? 'Activo' : 'Inactivo' }}</td>
            <td class="flex justify-center space-x-2">
              <button @click="editPromocion(promocion)" class="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition-colors flex items-center">
                Editar
              </button>
              <button @click="deletePromocion(promocion.ID, promocion.Producto_id)" class="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none transition-colors flex items-center">
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
        Producto_id: null,
        Tipo: '',
        Aplicacion_en: '',
        Fecha_Registro: new Date().toISOString().split('T')[0],
        Fecha_Actualizacion: new Date().toISOString().split('T')[0],
        Estatus: false
      },
      promociones: [], // Lista de promociones
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
        // Validación de los campos
        if (!this.formData.Producto_id || !this.formData.Tipo || !this.formData.Aplicacion_en) {
          this.errorMessage = 'Todos los campos deben ser completados.';
          return;
        }

        if (this.isEditing) {
          const response = await axios.put(`https://gimnasio-deploy.onrender.com/promociones/${this.formData.ID}`, this.formData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          });
          const index = this.promociones.findIndex(p => p.ID === this.formData.ID);
          this.promociones.splice(index, 1, response.data); // Actualiza la promoción en la lista
        } else {
          const response = await axios.post('https://gimnasio-deploy.onrender.com/promociones/', this.formData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          });
          this.promociones.push(response.data); // Añade la nueva promoción a la lista
        }
        this.resetForm(); // Resetea el formulario después de guardar
        this.toggleForm(); // Cierra el formulario
      } catch (error) {
        if (error.response && error.response.status === 422) {
          this.errorMessage = 'Datos no válidos. Verifique los campos del formulario.';
        } else if (error.response && error.response.status === 401) {
          this.errorMessage = 'No autorizado. Por favor, inicie sesión nuevamente.';
        } else if (error.response && error.response.status === 403) {
          this.errorMessage = 'Acceso denegado. No tiene permisos para realizar esta acción.';
        } else {
          this.errorMessage = 'Ocurrió un error inesperado.';
        }
      }
    },
    async deletePromocion(id, productoId) {
      if (confirm(`¿Estás seguro de que deseas eliminar la promoción para el producto ID "${productoId}"?`)) {
        try {
          await axios.delete(`https://gimnasio-deploy.onrender.com/promociones/${id}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          });
          this.getPromociones(); // Recargar la lista de promociones después de eliminar
        } catch (error) {
          console.error("Hubo un error al eliminar la promoción:", error);
        }
      }
    },
    editPromocion(promocion) {
      this.formData = { ...promocion }; // Carga los datos de la promoción en el formulario
      this.isEditing = true; // Activa el modo de edición
      this.showForm = true; // Muestra el formulario
    },
    async getPromociones() {
      try {
        const response = await axios.get('https://gimnasio-deploy.onrender.com/promociones', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });
        // Convertir Fecha_Registro y Fecha_Actualizacion a formato ISO
        this.promociones = response.data.map(promocion => ({
          ...promocion,
          Fecha_Registro: new Date(promocion.Fecha_Registro).toISOString().split('T')[0],
          Fecha_Actualizacion: new Date(promocion.Fecha_Actualizacion).toISOString().split('T')[0],
          Descuento: parseFloat(promocion.Descuento)
        }));
      } catch (error) {
        console.error("Hubo un error al cargar las promociones:", error);
      }
    },
    resetForm() {
      this.formData = {
        ID: null,
        Producto_id: null,
        Tipo: '',
        Aplicacion_en: '',
        Fecha_Registro: new Date().toISOString().split('T')[0],
        Fecha_Actualizacion: new Date().toISOString().split('T')[0],
        Estatus: false
      };
      this.isEditing = false;
      this.errorMessage = '';
    }
  },
  mounted() {
    this.getPromociones(); // Carga las promociones al montar el componente
  }
};
</script>

<style scoped>
/* Estilos personalizados */
</style>
