<template>
  <div class="mb-8 p-4 bg-white rounded shadow">
    <h1 class="title-gym">BULL'S GYM</h1>
    <!-- Botón para agregar nueva Pregunta -->
    <section class="mb-4">
      <button @click="toggleForm" class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 focus:outline-none transition-colors">
        {{ showForm ? 'Cerrar Formulario' : 'Agregar Nueva Pregunta' }}
      </button>
    </section>

    <!-- Formulario para agregar nueva Pregunta (se muestra/oculta al hacer clic en el botón) -->
    <section v-if="showForm" class="mb-8 p-4 bg-white rounded shadow">
      <h1 class="text-xl font-semibold mb-4 text-gray-900">{{ isEditing ? 'Editar Pregunta' : 'Crear nueva Pregunta' }}</h1>
      
      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-1 gap-4 mb-6">
          <input 
            v-model="formData.pregunta" 
            type="text" 
            placeholder="Pregunta" 
            class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
          <textarea 
            v-model="formData.respuesta" 
            placeholder="Respuesta" 
            class="w-full p-2 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required></textarea>
          <input 
            v-model="formData.categoria" 
            type="text" 
            placeholder="Categoría" 
            class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
          <input 
            v-model="formData.persona" 
            type="text" 
            placeholder="Persona" 
            class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <select 
            v-model="formData.estatus" 
            class="rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
            required>
            <option :value="null">Estatus de la Pregunta</option>
            <option :value="false">Inactivo</option>
            <option :value="true">Activo</option>
          </select>
        </div>
        <button type="submit" class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 focus:outline-none transition-colors">
          {{ isEditing ? 'Actualizar Pregunta' : 'Crear Pregunta' }}
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
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">PREGUNTA</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">RESPUESTA</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">CATEGORÍA</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">PERSONA</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">ESTATUS</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">FECHA CREACIÓN</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">FECHA ACTUALIZACIÓN</th>
            <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100 rounded-r-md">ACCIONES</th>
          </tr>
        </thead>
        <tbody class="bg-gray-200">
          <tr v-for="(pregunta, i) in preguntas" :key="pregunta.id" class="hover:bg-gray-300">
            <td class="h-[50px] text-center">{{ pregunta.id }}</td>
            <td class="text-center">{{ pregunta.pregunta }}</td>
            <td class="text-center">{{ pregunta.respuesta }}</td>
            <td class="text-center">{{ pregunta.categoria }}</td>
            <td class="text-center">{{ pregunta.persona }}</td>
            <td class="text-center">{{ pregunta.estatus ? 'Activo' : 'Inactivo' }}</td>
            <td class="text-center">{{ new Date(pregunta.fecha_creacion).toLocaleDateString() }}</td>
            <td class="text-center">{{ new Date(pregunta.fecha_actualizacion).toLocaleDateString() }}</td>
            <td class="flex justify-center space-x-2">
              <button @click="editPregunta(pregunta)" class="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition-colors flex items-center">
                Editar
              </button>
              <button @click="deletePregunta(pregunta.id, pregunta.pregunta)" class="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none transition-colors flex items-center">
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
        id: null,
        pregunta: '',
        respuesta: '',
        categoria: '',
        persona: '',
        estatus: true,
        fecha_creacion: new Date().toISOString(),
        fecha_actualizacion: new Date().toISOString()
      },
      preguntas: [], // Lista de preguntas
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
          const response = await axios.put(`https://gimnasio-deploy.onrender.com/preguntas/${this.formData.id}`, this.formData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          });
          const index = this.preguntas.findIndex(p => p.id === this.formData.id);
          this.preguntas.splice(index, 1, response.data); // Actualiza la pregunta en la lista
        } else {
          const response = await axios.post('https://gimnasio-deploy.onrender.com/preguntas/', this.formData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          });
          this.preguntas.push(response.data); // Añade la nueva pregunta a la lista
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
    async deletePregunta(id, pregunta) {
      if (confirm(`¿Estás seguro de que deseas eliminar la pregunta "${pregunta}"?`)) {
        try {
          await axios.delete(`https://gimnasio-deploy.onrender.com/preguntas/${id}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          });
          this.getPreguntas(); // Recargar la lista de preguntas después de la eliminación
        } catch (error) {
          this.errorMessage = 'Ocurrió un error al eliminar la pregunta.';
        }
      }
    },
    editPregunta(pregunta) {
      this.formData = { ...pregunta };
      this.formData.fecha_creacion = new Date(pregunta.fecha_creacion).toISOString();
      this.formData.fecha_actualizacion = new Date(pregunta.fecha_actualizacion).toISOString();
      this.isEditing = true;
      this.showForm = true;
    },
    async getPreguntas() {
      try {
        const response = await axios.get('https://gimnasio-deploy.onrender.com/preguntas/', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });
        this.preguntas = response.data;
      } catch (error) {
        this.errorMessage = 'Ocurrió un error al obtener las preguntas.';
      }
    },
    resetForm() {
      this.formData = {
        id: null,
        pregunta: '',
        respuesta: '',
        categoria: '',
        persona: '',
        estatus: true,
        fecha_creacion: new Date().toISOString(),
        fecha_actualizacion: new Date().toISOString()
      };
      this.isEditing = false;
      this.errorMessage = '';
    }
  },
  mounted() {
    this.getPreguntas(); // Carga las preguntas cuando se monta el componente
  }
};
</script>

<style scoped>
/* Agrega estilos específicos si es necesario */
</style>
