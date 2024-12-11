<template>
  <div class="mb-1 p-4 bg-red rounded shadow">
  <div class="grid grid-cols-1 gap-4 mb-6">

        <h1 class="text-xl font-semibold mb-4 text-gray-900">Registro de Instructores</h1>
        <p class="text-sm text-gray-500 mt-4">Complete el formulario para registrar un nuevo instructor en el sistema.</p>

        <div class="mt-8">
          <img src="https://c8.alamy.com/comp/DRRP55/young-fitness-instructor-gym-people-spinning-DRRP55.jpg" alt="Imagen del Instructor"
            class="w-full h-auto rounded-lg shadow-md" />
        </div>
      </div>
      <div class="mb-8 p-4 bg-white rounded shadow">
      <Stepper :steps="['Datos Básicos', 'Experiencia y Contratación', 'Detalles del Instructor']" @submit="handleSubmit">
        <template class="grid grid-cols-1 md:grid-cols-1 gap-4 mb-6" v-slot="{ currentStep }">
          <div v-if="currentStep === 0" class="mb-6 p-4 bg-red rounded shadow items-center">
            <!-- Datos Básicos -->
            <div class="grid grid-cols-1 gap-4 mb-4">
              <label class="block uppercase tracking-wide text-xs font-bold">Título de Cortesía</label>
              <input v-model="formData.titulo" type="text" placeholder="Título de Cortesía"
                class="w-full shadow-inner p-4 border-0 bg-gray-100 text-gray-800 text-sm outline-blue-500 focus:bg-transparent" />
            </div>
            <div class="grid grid-cols-1 gap-4 mb-6">
              <label class="block uppercase tracking-wide text-xs font-bold">Nombre</label>
              <input v-model="formData.nombre" type="text" placeholder="Nombre"
                class="w-full shadow-inner p-4 border-0 bg-gray-100 text-gray-800 text-sm outline-blue-500 focus:bg-transparent" />
            </div>
            <div class="mb-4">
              <label class="block uppercase tracking-wide text-xs font-bold">Primer Apellido</label>
              <input v-model="formData.primerApellido" type="text" placeholder="Primer Apellido"
                class="w-full shadow-inner p-4 border-0 bg-gray-100 text-gray-800 text-sm outline-blue-500 focus:bg-transparent" />
            </div>
            <div class="mb-4">
              <label class="block uppercase tracking-wide text-xs font-bold">Segundo Apellido</label>
              <input v-model="formData.segundoApellido" type="text" placeholder="Segundo Apellido"
                class="w-full shadow-inner p-4 border-0 bg-gray-100 text-gray-800 text-sm outline-blue-500 focus:bg-transparent" />
            </div>
            <div class="mb-4">
              <label class="block uppercase tracking-wide text-xs font-bold">Fecha de Nacimiento</label>
              <input v-model="formData.fechaNacimiento" type="date" placeholder="Fecha de Nacimiento"
                class="w-full shadow-inner p-4 border-0 bg-gray-100 text-gray-800 text-sm outline-blue-500 focus:bg-transparent" />
            </div>
            <div class="mb-4">
              <label class="block uppercase tracking-wide text-xs font-bold">Fotografía</label>
              <input @change="handleFileUpload" type="file" placeholder="Fotografía"
                class="w-full shadow-inner p-4 border-0 bg-gray-100 text-gray-800 text-sm outline-blue-500 focus:bg-transparent" />
            </div>
            <div class="mb-4">
              <label class="block uppercase tracking-wide text-xs font-bold">Género</label>
              <select v-model="formData.genero" class="w-full shadow-inner p-4 border-0 bg-gray-100 text-gray-800 text-sm outline-blue-500 focus:bg-transparent">
                <option value="">Selecciona Género</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="block uppercase tracking-wide text-xs font-bold">Tipo de Sangre</label>
              <select v-model="formData.tipoSangre" class="w-full shadow-inner p-4 border-0 bg-gray-100 text-gray-800 text-sm outline-blue-500 focus:bg-transparent">
                <option value="">Selecciona Tipo de Sangre</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="block uppercase tracking-wide text-xs font-bold">Estatus</label>
              <select v-model="formData.estatus" class="w-full shadow-inner p-4 border-0 bg-gray-100 text-gray-800 text-sm outline-blue-500 focus:bg-transparent">
                <option value="">Selecciona Estatus</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          </div>

          <div v-if="currentStep === 1"  class="mb-1 p-4 bg-red rounded shadow items-center">
            <!-- Experiencia y Contratación -->
            <div class="mb-4">
              <label class="block uppercase tracking-wide text-xs font-bold">Área ID</label>
              <input v-model="formData.areaId" type="number" placeholder="Área ID"
                class="w-full shadow-inner p-4 border-0 bg-gray-100 text-gray-800 text-sm outline-blue-500 focus:bg-transparent" />
            </div>
            <div class="mb-4">
              <label class="block uppercase tracking-wide text-xs font-bold">Fecha de Contratación</label>
              <input v-model="formData.fechaContratacion" type="date" placeholder="Fecha de Contratación"
                class="w-full shadow-inner p-4 border-0 bg-gray-100 text-gray-800 text-sm outline-blue-500 focus:bg-transparent" />
            </div>
            <div class="mb-4">
              <label class="block uppercase tracking-wide text-xs font-bold">Puesto ID</label>
              <input v-model="formData.puestoId" type="text" placeholder="Puesto ID"
                class="w-full shadow-inner p-4 border-0 bg-gray-100 text-gray-800 text-sm outline-blue-500 focus:bg-transparent" />
            </div>
            <div class="mb-4">
              <label class="block uppercase tracking-wide text-xs font-bold">Número de Empleado</label>
              <input v-model="formData.numeroEmpleado" type="text" placeholder="Número de Empleado"
                class="w-full shadow-inner p-4 border-0 bg-gray-100 text-gray-800 text-sm outline-blue-500 focus:bg-transparent" />
            </div>
          </div>

          <div v-if="currentStep === 2"  class="mb-1 p-4 bg-red rounded shadow items-center">
            <!-- Detalles del Instructor -->
            <div class="mb-4">
              <label class="block uppercase tracking-wide text-xs font-bold">Persona ID</label>
              <input v-model="formData.personaId" type="text" placeholder="Persona ID"
                class="w-full shadow-inner p-4 border-0 bg-gray-100 text-gray-800 text-sm outline-blue-500 focus:bg-transparent" />
            </div>
            <div class="mb-4">
              <label class="block uppercase tracking-wide text-xs font-bold">Email</label>
              <input v-model="formData.email" type="email" placeholder="Email"
                class="w-full shadow-inner p-4 border-0 bg-gray-100 text-gray-800 text-sm outline-blue-500 focus:bg-transparent" />
            </div>
            <div class="mb-4">
              <label class="block uppercase tracking-wide text-xs font-bold">Teléfono</label>
              <input v-model="formData.telefono" type="tel" placeholder="Teléfono"
                class="w-full shadow-inner p-4 border-0 bg-gray-100 text-gray-800 text-sm outline-blue-500 focus:bg-transparent" />
            </div>
            <div class="mb-4">
              <label class="block uppercase tracking-wide text-xs font-bold">Dirección</label>
              <input v-model="formData.direccion" type="text" placeholder="Dirección"
                class="w-full shadow-inner p-4 border-0 bg-gray-100 text-gray-800 text-sm outline-blue-500 focus:bg-transparent" />
            </div>
            <div class="mb-4">
              <label class="block uppercase tracking-wide text-xs font-bold">Especialidad</label>
              <input v-model="formData.specialty" type="text" placeholder="Especialidad"
                class="w-full shadow-inner p-4 border-0 bg-gray-100 text-gray-800 text-sm outline-blue-500 focus:bg-transparent" />
            </div>
            <div class="mb-4">
              <label class="block uppercase tracking-wide text-xs font-bold">Años de Experiencia</label>
              <input v-model="formData.yearsOfExperience" type="number" placeholder="Años de Experiencia"
                class="w-full shadow-inner p-4 border-0 bg-gray-100 text-gray-800 text-sm outline-blue-500 focus:bg-transparent" />
            </div>
            <div class="mb-4">
              <label class="block uppercase tracking-wide text-xs font-bold">Clientes Atendidos</label>
              <input v-model="formData.totalClientsAttended" type="number" placeholder="Clientes Atendidos"
                class="w-full shadow-inner p-4 border-0 bg-gray-100 text-gray-800 text-sm outline-blue-500 focus:bg-transparent" />
            </div>
            <div class="mb-4">
              <label class="block uppercase tracking-wide text-xs font-bold">Estado</label>
              <select v-model="formData.status" class="w-full shadow-inner p-4 border-0 bg-gray-100 text-gray-800 text-sm outline-blue-500 focus:bg-transparent">
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="block uppercase tracking-wide text-xs font-bold">Calificación</label>
              <input v-model="formData.rating" type="number" placeholder="Calificación"
                class="w-full shadow-inner p-4 border-0 bg-gray-100 text-gray-800 text-sm outline-blue-500 focus:bg-transparent" />
            </div>
          </div>
        </template>
      </Stepper>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Stepper from '../Stepper.vue';

export default {
  components: { Stepper },
  data() {
    return {
      currentStep: 0,
      formData: {
        titulo: '',
        nombre: '',
        primerApellido: '',
        segundoApellido: '',
        fechaNacimiento: '',
        fotografia: '',
        genero: '',
        tipoSangre: '',
        estatus: true,
        areaId: '',
        fechaContratacion: '',
        puestoId: '',
        personaId: '',
        numeroEmpleado: '',
        email: '',
        telefono: '',
        direccion: '',
        specialty: '',
        yearsOfExperience: '',
        totalClientsAttended: '',
        status: true,
        rating: 0
      }
    };
  },
  methods: {
    handleSubmit() {
      if (this.currentStep === 0) {
        this.submitPersonaData();
      } else if (this.currentStep === 1) {
        this.submitEmpleadoData();
      } else if (this.currentStep === 2) {
        this.submitInstructorData();
      }
    },
    submitPersonaData() {
      const personaData = {
        Titulo_Cortesia: this.formData.titulo,
        Nombre: this.formData.nombre,
        Primer_Apellido: this.formData.primerApellido,
        Segundo_Apellido: this.formData.segundoApellido,
        Fecha_Nacimiento: this.formData.fechaNacimiento,
        Fotografia: this.formData.fotografia, // Debes asegurarte de manejar este campo correctamente
        Genero: this.formData.genero,
        Tipo_Sangre: this.formData.tipoSangre,
        Estatus: this.formData.estatus,
        Fecha_Registro: new Date().toISOString(),
        Fecha_Actualizacion: new Date().toISOString()
      };

      axios.post('https://gimnasio-deploy.onrender.com/personas', personaData)
        .then(response => {
          console.log('Datos de persona enviados', response.data);
          // Almacenar el ID de la persona para el siguiente paso
          this.formData.personaId = response.data.id; // Ajusta según la respuesta de tu API
        })
        .catch(error => {
          console.error('Error al enviar los datos de persona', error);
        });
    },
    submitEmpleadoData() {
      const empleadoData = {
        Area_ID: this.formData.areaId,
        Fecha_Contratacion: this.formData.fechaContratacion,
        Puesto_ID: this.formData.puestoId,
        Persona_ID: this.formData.personaId,
        Numero_Empleado: this.formData.numeroEmpleado,
        Fecha_Registro: new Date().toISOString(),
        Fecha_Actualizacion: new Date().toISOString(),
        Estatus: this.formData.estatus
      };

      axios.post('https://gimnasio-deploy.onrender.com/empleados', empleadoData)
        .then(response => {
          console.log('Datos de empleado enviados', response.data);
        })
        .catch(error => {
          console.error('Error al enviar los datos de empleado', error);
        });
    },
    submitInstructorData() {
      const instructorData = {
        name: this.formData.nombre,
        email: this.formData.email,
        specialty: this.formData.specialty,
        years_of_experience: this.formData.yearsOfExperience,
        total_clients_attended: this.formData.totalClientsAttended,
        status: this.formData.status,
        registration_date: new Date().toISOString(),
        update_date: new Date().toISOString(),
        rating: this.formData.rating
      };

      axios.post('https://gimnasio-deploy.onrender.com/instructores', instructorData)
        .then(response => {
          console.log('Datos de instructor enviados', response.data);
        })
        .catch(error => {
          console.error('Error al enviar los datos de instructor', error);
        });
    },
    handleFileUpload(event) {
      this.formData.fotografia = event.target.files[0];
    }
  }
};
</script>

<style scoped>
/* Aquí puedes añadir estilos personalizados */
</style>
