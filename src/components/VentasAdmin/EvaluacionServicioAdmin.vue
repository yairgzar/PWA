<template>
  <div>
    <h1 class="title-gym">BULL'S GYM</h1>
    <h1 class="text-xl font-bold mb-4">Evaluaciones de Servicios</h1>

    <button @click="toggleForm" class="bg-blue-500 text-white px-4 py-2 mb-4">
      {{ isEditing ? 'Cancelar Edición' : 'Agregar Nueva Evaluación' }}
    </button>

    <div v-if="showForm">
      <form @submit.prevent="submitForm" class="bg-gray-100 p-4 mb-4 rounded">
        <div class="mb-4">
          <label for="usuario_id" class="block text-sm font-medium text-gray-700">Usuario ID:</label>
          <input type="number" v-model="formData.Usuario_ID" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
        </div>

        <div class="mb-4">
          <label for="servicios" class="block text-sm font-medium text-gray-700">Servicio:</label>
          <select v-model="formData.Servicios" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required>
            <option value="SNutricion">Servicios de nutrición</option>
            <option value="HP">Horarios y precios</option>
            <option value="C">Comunidad</option>
            <option value="PE">Programas de entretenimiento</option>
          </select>
        </div>

        <div class="mb-4">
          <label for="calificacion" class="block text-sm font-medium text-gray-700">Calificación:</label>
          <input type="text" v-model="formData.Calificacion" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
        </div>

        <div class="mb-4">
          <label for="criterio" class="block text-sm font-medium text-gray-700">Criterio:</label>
          <input type="text" v-model="formData.Criterio" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
        </div>

        <div class="mb-4">
          <label for="estatus" class="block text-sm font-medium text-gray-700">Estatus:</label>
          <select 
            v-model="formData.Estatus" 
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" 
            required>
            <option :value="null">Seleccione un estatus</option>
            <option :value="true">Activo</option>
            <option :value="false">Inactivo</option>
          </select>
        </div>
        
        <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">
          {{ isEditing ? 'Actualizar Evaluación' : 'Crear Evaluación' }}
        </button>
      </form>
    </div>

    <section class="table-responsive">
      <table class="w-full bg-white text-left text-sm text-gray-900 rounded">
        <thead class="bg-gray-50 text-center">
          <tr>
            <th scope="col" class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th scope="col" class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario ID</th>
            <th scope="col" class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Servicio</th>
            <th scope="col" class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Calificación</th>
            <th scope="col" class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Criterio</th>
            <th scope="col" class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Estatus</th>
            <th scope="col" class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Registro</th>
            <th scope="col" class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="evaluacion in evaluaciones" :key="evaluacion.ID" class="hover:bg-gray-100">
            <td class="px-6 py-4 whitespace-nowrap">{{ evaluacion.ID }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ evaluacion.Usuario_ID }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ evaluacion.Servicios }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ evaluacion.Calificacion }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ evaluacion.Criterio }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ evaluacion.Estatus ? 'Activo' : 'Inactivo' }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ new Date(evaluacion.Fecha_Registro).toLocaleDateString() }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button @click="editEvaluacion(evaluacion)" class="bg-yellow-500 text-white px-4 py-2 mr-2 rounded">Editar</button>
              <button @click="deleteEvaluacion(evaluacion.ID)" class="bg-red-500 text-white px-4 py-2 rounded">Eliminar</button>
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
      evaluaciones: [],
      formData: {
        ID: null,
        Usuario_ID: '',
        Servicios: '',
        Calificacion: '',
        Criterio: '',
        Estatus: false,
        Fecha_Registro: new Date().toISOString(),
      },
      showForm: false,
      isEditing: false,
    };
  },
  methods: {
    toggleForm() {
      this.resetForm();
      this.showForm = !this.showForm;
    },
    async submitForm() {
      try {
        if (this.isEditing) {
          await axios.put(`https://gimnasio-deploy.onrender.com/evaluaciones_serv/${this.formData.ID}`, this.formData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          });
        } else {
          await axios.post('https://gimnasio-deploy.onrender.com/evaluaciones_serv/', this.formData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          });
        }
        this.getEvaluaciones();
        this.resetForm();
        this.showForm = false;
      } catch (error) {
        console.error("Hubo un error al enviar el formulario:", error);
      }
    },
    async deleteEvaluacion(id) {
      if (confirm('¿Estás seguro de que deseas eliminar esta evaluación?')) {
        try {
          await axios.delete(`https://gimnasio-deploy.onrender.com/evaluaciones_serv/${id}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          });
          this.getEvaluaciones();
        } catch (error) {
          console.error("Hubo un error al eliminar la evaluación:", error);
        }
      }
    },
    editEvaluacion(evaluacion) {
      this.formData = { ...evaluacion };
      this.isEditing = true;
      this.showForm = true;
    },
    resetForm() {
      this.formData = {
        ID: null,
        Usuario_ID: '',
        Servicios: '',
        Calificacion: '',
        Criterio: '',
        Estatus: false,
        Fecha_Registro: new Date().toISOString(),
      };
      this.isEditing = false;
    },
    async getEvaluaciones() {
      try {
        const response = await axios.get('https://gimnasio-deploy.onrender.com/evaluaciones_serv/', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });
        this.evaluaciones = response.data;
      } catch (error) {
        console.error("Hubo un error al cargar las evaluaciones:", error);
      }
    },
  },
  mounted() {
    this.getEvaluaciones();
  }
};
</script>

<style scoped>
.table-responsive {
  overflow-x: auto;
}
</style>
