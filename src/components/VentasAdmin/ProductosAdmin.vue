<template>
  <div class="mb-8 p-4 bg-white rounded shadow">
    <h1 class="title-gym">BULL'S GYM</h1>
    <!-- Botón para agregar nuevo Producto -->
    <section class="mb-4">
      <button @click="toggleForm" class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 focus:outline-none transition-colors">
        {{ showForm ? 'Cerrar Formulario' : 'Agregar Nuevo Producto' }}
      </button>
    </section>

    <!-- Formulario para agregar nuevo Producto (se muestra/oculta al hacer clic en el botón) -->
    <section v-if="showForm" class="mb-8 p-4 bg-white rounded shadow">
      <h1 class="text-xl font-semibold mb-4 text-gray-900">{{ isEditing ? 'Editar Producto' : 'Crear Nuevo Producto' }}</h1>
      
      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input 
            v-model="formData.Nombre" 
            type="text" 
            placeholder="Nombre del Producto" 
            class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
          <input 
            v-model="formData.Marca" 
            type="text" 
            placeholder="Marca" 
            class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
          <input 
            v-model="formData.Cod_barras" 
            type="text" 
            placeholder="Código de Barras" 
            class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
        </div>
        <div class="grid grid-cols-1 mb-6">
          <textarea 
            v-model="formData.Descripcion" 
            placeholder="Descripción del Producto" 
            class="w-full p-2 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required></textarea>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input 
            v-model.number="formData.Precio_actual" 
            type="number" 
            step="0.01" 
            placeholder="Precio Actual" 
            class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
          <input 
            v-model="formData.Fotografia" 
            type="text" 
            placeholder="Fotografía URL" 
            class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
          <select 
            v-model="formData.Estatus" 
            class="rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
            <option :value="null">Estatus del Producto</option>
            <option :value="false">Inactivo</option>
            <option :value="true">Activo</option>
          </select>
          <input 
            v-model="formData.Presentacion" 
            type="text" 
            placeholder="Presentación" 
            class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
        </div>
        <button type="submit" class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 focus:outline-none transition-colors">
          {{ isEditing ? 'Actualizar Producto' : 'Crear Producto' }}
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
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">MARCA</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">CÓDIGO BARRAS</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">DESCRIPCIÓN</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">PRESENTACIÓN</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">PRECIO ACTUAL</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">FOTOGRAFÍA</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">ESTATUS</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">FECHA REGISTRO</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">FECHA ACTUALIZACIÓN</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100 rounded-r-md">ACCIONES</th>
          </tr>
        </thead>
        <tbody class="bg-gray-200">
          <tr v-for="(producto, i) in productos" :key="producto.ID" class="hover:bg-gray-300">
            <td class="h-[50px] text-center">{{ producto.ID }}</td>
            <td class="text-center">{{ producto.Nombre }}</td>
            <td class="text-center">{{ producto.Marca }}</td>
            <td class="text-center">{{ producto.Cod_barras }}</td>
            <td class="text-center">{{ producto.Descripcion }}</td>
            <td class="text-center">{{ producto.Presentacion }}</td>
            <td class="text-center">
              {{ isNaN(parseFloat(producto.Precio_actual)) ? '0.00' : parseFloat(producto.Precio_actual).toFixed(2) }}
            </td>
            <td class="text-center">{{ producto.Fotografia }}</td>
            <td class="text-center">{{ producto.Estatus ? 'Activo' : 'Inactivo' }}</td>
            <td class="text-center">{{ new Date(producto.Fecha_registro).toLocaleDateString() }}</td>
            <td class="text-center">{{ new Date(producto.Fecha_actualizacion).toLocaleDateString() }}</td>
            <td class="flex justify-center space-x-2">
              <button @click="editProducto(producto)" class="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition-colors flex items-center">
                Editar
              </button>
              <button @click="deleteProducto(producto.ID, producto.Nombre)" class="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none transition-colors flex items-center">
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
        Marca: '',
        Cod_barras: '',
        Descripcion: '',
        Presentacion: '', // Asegúrate de que este campo esté aquí
        Precio_actual: 0,
        Fotografia: '',
        Estatus: false,
        Fecha_registro: new Date().toISOString(),
        Fecha_actualizacion: new Date().toISOString()
      },
      productos: [], // Lista de productos
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
        console.log(this.formData); // Verifica los datos del formulario
        this.formData.Precio_actual = parseFloat(this.formData.Precio_actual);
        if (isNaN(this.formData.Precio_actual)) {
          this.errorMessage = 'El precio actual debe ser un número válido.';
          return;
        }

        if (this.isEditing) {
          const response = await axios.put(`https://gimnasio-deploy.onrender.com/productos/${this.formData.ID}`, this.formData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          });
          const index = this.productos.findIndex(p => p.ID === this.formData.ID);
          this.productos.splice(index, 1, response.data); // Actualiza el producto en la lista
        } else {
          const response = await axios.post('https://gimnasio-deploy.onrender.com/productos/', this.formData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          });
          this.productos.push(response.data); // Añade el nuevo producto a la lista
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
    async deleteProducto(id, nombre) {
      if (confirm(`¿Estás seguro de que deseas eliminar el producto "${nombre}"?`)) {
        try {
          await axios.delete(`https://gimnasio-deploy.onrender.com/productos/${id}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          });
          this.getProductos(); // Recargar la lista de productos después de eliminar
        } catch (error) {
          console.error("Hubo un error al eliminar el producto:", error);
        }
      }
    },
    editProducto(producto) {
      this.formData = { ...producto }; // Carga los datos del producto en el formulario
      this.isEditing = true; // Activa el modo de edición
      this.showForm = true; // Muestra el formulario
    },
    async getProductos() {
      try {
        const response = await axios.get('https://gimnasio-deploy.onrender.com/productos/', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });
        console.log(response.data); // Verifica la respuesta del API
        this.productos = response.data.map(producto => ({
          ...producto,
          Precio_actual: parseFloat(producto.Precio_actual)
        }));
      } catch (error) {
        console.error("Hubo un error al cargar los productos:", error);
      }
    },
    resetForm() {
      this.formData = {
        ID: null,
        Nombre: '',
        Marca: '',
        Cod_barras: '',
        Descripcion: '',
        Presentacion: '', // Asegúrate de que este campo se resetea aquí
        Precio_actual: 0,
        Fotografia: '',
        Estatus: false,
        Fecha_registro: new Date().toISOString(),
        Fecha_actualizacion: new Date().toISOString()
      };
      this.isEditing = false;
      this.errorMessage = '';
    }
  },
  mounted() {
    this.getProductos(); // Carga los productos al montar el componente
  }
};
</script>

<style scoped>
/* Estilos personalizados */
</style>
