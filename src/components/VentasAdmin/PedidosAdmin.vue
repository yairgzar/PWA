<template>
  <div class="mb-8 p-4 bg-white rounded shadow">
    <h1 class="title-gym">BULL'S GYM</h1>
    <!-- Botón para agregar nuevo Pedido -->
    <section class="mb-4">
      <button @click="toggleForm" class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 focus:outline-none transition-colors">
        {{ showForm ? 'Cerrar Formulario' : 'Agregar Nuevo Pedido' }}
      </button>
    </section>

    <!-- Formulario para agregar nuevo Pedido (se muestra/oculta al hacer clic en el botón) -->
    <section v-if="showForm" class="mb-8 p-4 bg-white rounded shadow">
      <h1 class="text-xl font-semibold mb-4 text-gray-900">{{ isEditing ? 'Editar Pedido' : 'Crear nuevo Pedido' }}</h1>
      
      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <select 
            v-model="formData.Tipo" 
            class="rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
            <option :value="null">Tipo de Pedido</option>
            <option value="Promocion">Promoción</option>
            <option value="Descuento">Descuento</option>
            <option value="Precio_Tienda">Precio Tienda</option>
          </select>
          <input 
            v-model="formData.Total_Productos" 
            type="number" 
            placeholder="Total de Productos" 
            class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
        </div>
        <div class="grid grid-cols-1 gap-4 mb-6">
          <input 
            v-model="formData.Costo_Total" 
            type="number" 
            placeholder="Costo Total" 
            class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <select 
            v-model="formData.Estatus" 
            class="rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
            <option :value="null">Estatus del Pedido</option>
            <option :value="false">Inactivo</option>
            <option :value="true">Activo</option>
          </select>
        </div>
        <button type="submit" class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 focus:outline-none transition-colors">
          {{ isEditing ? 'Actualizar Pedido' : 'Crear Pedido' }}
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
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">TIPO</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">TOTAL PRODUCTOS</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">COSTO TOTAL</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">ESTATUS</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">FECHA REGISTRO</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">FECHA ACTUALIZACIÓN</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100 rounded-r-md">ACCIONES</th>
          </tr>
        </thead>
        <tbody class="bg-gray-200">
          <tr v-for="(pedido, i) in pedidos" :key="pedido.ID" class="hover:bg-gray-300">
            <td class="h-[50px] text-center">{{ pedido.ID }}</td>
            <td class="text-center">{{ pedido.Tipo }}</td>
            <td class="text-center">{{ pedido.Total_Productos }}</td>
            <td class="text-center">{{ pedido.Costo_Total }}</td>
            <td class="text-center">{{ pedido.Estatus ? 'Activo' : 'Inactivo' }}</td>
            <td class="text-center">{{ new Date(pedido.Fecha_Registro).toLocaleDateString() }}</td>
            <td class="text-center">{{ new Date(pedido.Fecha_Actualizacion).toLocaleDateString() }}</td>
            <td class="flex justify-center space-x-2">
              <button @click="editPedido(pedido)" class="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition-colors flex items-center">
                Editar
              </button>
              <button @click="deletePedido(pedido.ID, pedido.Tipo)" class="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none transition-colors flex items-center">
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
        Tipo: '',
        Total_Productos: '',
        Costo_Total: '',
        Estatus: false,
        Fecha_Registro: new Date().toISOString(),
        Fecha_Actualizacion: new Date().toISOString()
      },
      pedidos: [], // Lista de pedidos
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
          const response = await axios.put(`https://gimnasio-deploy.onrender.com/pedidos/${this.formData.ID}`, this.formData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          });
          const index = this.pedidos.findIndex(p => p.ID === this.formData.ID);
          this.pedidos.splice(index, 1, response.data); // Actualiza el pedido en la lista
        } else {
          const response = await axios.post('https://gimnasio-deploy.onrender.com/pedidos/', this.formData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          });
          this.pedidos.push(response.data); // Añade el nuevo pedido a la lista
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
    async deletePedido(id, tipo) {
      if (confirm(`¿Estás seguro de que deseas eliminar el pedido de tipo "${tipo}"?`)) {
        try {
          await axios.delete(`https://gimnasio-deploy.onrender.com/pedidos/${id}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          });
          this.getPedidos(); // Recargar la lista de pedidos después de eliminar
        } catch (error) {
          console.error("Hubo un error al eliminar el pedido:", error);
        }
      }
    },
    editPedido(pedido) {
      this.formData = { ...pedido }; // Carga los datos del pedido en el formulario
      this.isEditing = true; // Cambia a modo de edición
      this.showForm = true; // Muestra el formulario
    },
    resetForm() {
      this.formData = {
        ID: null,
        Tipo: '',
        Total_Productos: '',
        Costo_Total: '',
        Estatus: false,
        Fecha_Registro: new Date().toISOString(),
        Fecha_Actualizacion: new Date().toISOString()
      };
      this.isEditing = false; // Resetea el estado de edición
      this.errorMessage = '';
    },
    async getPedidos() {
      try {
        const response = await axios.get('https://gimnasio-deploy.onrender.com/pedidos', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });
        this.pedidos = response.data; // Carga los pedidos en la lista
      } catch (error) {
        console.error("Hubo un error al cargar los pedidos:", error);
      }
    },
  },
  mounted() {
    this.getPedidos(); // Cargar la lista de pedidos al montar el componente
  }
};
</script>