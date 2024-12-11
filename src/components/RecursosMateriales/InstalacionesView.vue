<template>
    <div>
        <!-- Botón para abrir el formulario -->
        <button @click="showForm= true"
            class="mb-4 bg-green-600 hover:bg-green-700 text-white font-extrabold py-2 px-4 rounded-xl text-center">
            Crear Nueva Instalación
        </button>

        <!-- Formulario -->
        <div v-if="showForm">
            <form  ref="formInstalacion">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <!-- Campos del formulario -->
                    <input type="text" v-model="formInstalaciones.Sucursal_Id" name="Sucursal_Id" id="Sucursal_Id"
                        class="font-bold hover:bg-blue-100 focus:bg-blue-100 rounded-sm shadow-sm focus:ring-0 w-full px-3 py-2 mb-5 border border-gray-300 rounded-xl placeholder-gray-400"
                        placeholder="Sucursal">

                    <input type="text" v-model="formInstalaciones.Descripcion" name="Descripcion" id="Descripcion"
                        class="font-bold hover:bg-blue-100 focus:bg-blue-100 rounded-sm shadow-sm focus:ring-0 w-full px-3 py-2 mb-5 border border-gray-300 rounded-xl placeholder-gray-400"
                        placeholder="Descripción">

                    <input type="text" v-model="formInstalaciones.Tipo" name="Tipo" id="Tipo"
                        class="font-bold hover:bg-blue-100 focus:bg-blue-100 rounded-sm shadow-sm focus:ring-0 w-full px-3 py-2 mb-5 border border-gray-300 rounded-xl placeholder-gray-400"
                        placeholder="Tipo">

                    <select v-model="formInstalaciones.Calificacion" name="Calificaciones" id="Calificaciones"
                        class="font-bold hover:bg-blue-100 focus:bg-blue-100 rounded-sm shadow-sm focus:ring-0 w-full px-3 py-2 mb-5 border border-gray-300 rounded-xl placeholder-gray-400">
                        <option value="">-- Selecciona calificación --</option>
                        <option value="Exelente_servicio">Excelente servicio</option>
                        <option value="Buen_servicio">Buen servicio</option>
                        <option value="Servicio_Regular">Servicio Regular</option>
                        <option value="Puede_mejorar_el_servicio">Puede mejorar el servicio</option>
                    </select>

                    <input type="text" v-model="formInstalaciones.Horario_Disponible" name="Horario_Disponible"
                        id="Horario_Disponible"
                        class="font-bold hover:bg-blue-100 focus:bg-blue-100 rounded-sm shadow-sm focus:ring-0 w-full px-3 py-2 mb-5 border border-gray-300 rounded-xl placeholder-gray-400"
                        placeholder="Horario Disponible">

                    <input type="text" v-model="formInstalaciones.Servicio" name="Servicio" id="Servicio"
                        class="font-bold hover:bg-blue-100 focus:bg-blue-100 rounded-sm shadow-sm focus:ring-0 w-full px-3 py-2 mb-5 border border-gray-300 rounded-xl placeholder-gray-400"
                        placeholder="Servicio">

                    <input type="text" v-model="formInstalaciones.Observaciones" name="Observaciones" id="Observaciones"
                        class="font-bold hover:bg-blue-100 focus:bg-blue-100 rounded-sm shadow-sm focus:ring-0 w-full px-3 py-2 mb-5 border border-gray-300 rounded-xl placeholder-gray-400"
                        placeholder="Observaciones">
                </div>

                <!-- Botones del formulario -->
                <div class="text-center">
                    <button type="submit"
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3 cursor-pointer transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105 rounded-xl text-center">
                        {{ isEditing ? 'Actualizar' : 'Enviar' }}
                    </button>
                    <!-- Botón para cerrar el formulario -->
                <button @click="resetForm()"
                    class="w-full bg-red-600 hover:bg-red-700 text-white font-extrabold py-2 px-4 rounded-xl text-center mt-4">
                    Cancelar
                </button>
                </div>
            </form>
        </div>

        <!-- Tabla de datos -->
        <div class="mt-8">
            <table class="w-full bg-white text-left text-sm text-gray-900 rounded">
                <thead class="bg-gray-50 text-center">
                    <tr>
                        <th scope="col" class="px-4 py-2 bg-gray-900 font-medium text-gray-100 rounded-l-md">Id</th>
                        <th class="px-4 py-2 bg-gray-900 font-medium text-gray-100">Sucursal</th>
                        <th class="px-4 py-2 bg-gray-900 font-medium text-gray-100">Descripción</th>
                        <th class="px-4 py-2 bg-gray-900 font-medium text-gray-100">Tipo</th>
                        <th class="px-4 py-2 bg-gray-900 font-medium text-gray-100">Calificación</th>
                        <th class="px-4 py-2 bg-gray-900 font-medium text-gray-100">Horario Disponible</th>
                        <th class="px-4 py-2 bg-gray-900 font-medium text-gray-100">Servicio</th>
                        <th class="px-4 py-2 bg-gray-900 font-medium text-gray-100">Observaciones</th>
                        <th class="px-4 py-2 bg-gray-900 font-medium text-gray-100 rounded-r-md">Acciones</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="instalacion in instalaciones" :key="instalacion.id">
                        <td class="h-[50px] text-center">{{ instalacion.Id }}</td>
                        <td class="text-center">{{ instalacion.Sucursal_Id }}</td>
                        <td class="text-center">{{ instalacion.Descripcion }}</td>
                        <td class="text-center">{{ instalacion.Tipo }}</td>
                        <td class="text-center">{{ instalacion.Calificacion }}</td>
                        <td class="text-center">{{ instalacion.Horario_Disponible }}</td>
                        <td class="text-center">{{ instalacion.Servicio }}</td>
                        <td class="text-center">{{ instalacion.Observaciones }}</td>
                        <td class="text-center">
                            <div class="flex justify-center space-x-2">
                                <button @click="editInstalacion(instalacion)"
                                    class="px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition-colors text-xs">Editar</button>
                                <button @click="deleteInstalacion(instalacion.Id)"
                                    class="px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none transition-colors text-xs">Eliminar</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
  

<script>
import axios from 'axios'

export default {
    data() {
        return {
            formInstalaciones: {
                Sucursal_Id: '',
                Descripcion: '',
                Tipo: '',
                Calificacion: '',
                Horario_Disponible: '',
                Servicio: '',
                Observaciones: ''
            },
            instalaciones: [], // Para almacenar los datos obtenidos
            isEditing: false,    // Estado de edición
            editId: null,         // ID del ítem en edición
            showForm: false // Variable para controlar la visibilidad del formulario
        }
    },


    methods: {
        extractFormInstalaciones() {
            const InstalacionesInformacion = {
                Sucursal_Id: parseInt(this.formInstalaciones.Sucursal_Id),
                Descripcion: this.formInstalaciones.Descripcion,
                Tipo: this.formInstalaciones.Tipo,
                Calificacion: this.formInstalaciones.Calificacion,
                Horario_Disponible: this.formInstalaciones.Horario_Disponible,
                Servicio: this.formInstalaciones.Servicio,
                Observaciones: this.formInstalaciones.Observaciones,
                Estatus: true,
                Fecha_Registro: new Date().toISOString(),
                Fecha_Actualizacion: new Date().toISOString(),
            };

            const url = "https://gimnasio-deploy.onrender.com/instalacion/";
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            };

            axios
                .post(url, InstalacionesInformacion, { headers })
                .then((response) => {
                    console.log("Datos enviados a la base", response.data);
                    this.fetchInstalaciones(); // Actualizar la tabla después de enviar
                    this.resetForm();
                    this.isEditing = false; // Opcional: establece el modo de edición en falso
                })
                .catch((error) => { console.error(error) });
        },

        fetchInstalaciones() {
            const url = "https://gimnasio-deploy.onrender.com/instalacion/";
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            };

            axios
                .get(url, { headers })
                .then((response) => {
                    this.instalaciones = response.data; // Actualizar la lista de instalaciones
                })
                .catch((error) => { console.error(error) });
        },

        editInstalacion(instalacion) {
            this.isEditing = true;
            this.editId = instalacion.Id;
            // Cargar los datos en el formulario
            this.formInstalaciones = {
                Sucursal_Id: instalacion.Sucursal_Id,
                Descripcion: instalacion.Descripcion,
                Tipo: instalacion.Tipo,
                Calificacion: instalacion.Calificacion,
                Horario_Disponible: instalacion.Horario_Disponible,
                Servicio: instalacion.Servicio,
                Observaciones: instalacion.Observaciones,
            };
            this.showForm = true;  // Muestra el formulario en modo edición
        },

        updateIntalacion() {
            if (!this.editId) {
                console.error("Edit ID is missing.");
                return;
            }

            const instalacionesInformacion = {
                Sucursal_Id: parseInt(this.formInstalaciones.Sucursal_Id),
                Descripcion: this.formInstalaciones.Descripcion,
                Tipo: this.formInstalaciones.Tipo,
                Calificacion: this.formInstalaciones.Calificacion,
                Horario_Disponible: this.formInstalaciones.Horario_Disponible,
                Servicio: this.formInstalaciones.Servicio,
                Observaciones: this.formInstalaciones.Observaciones,
                Estatus: true,
                Fecha_Registro: new Date().toISOString(),
                Fecha_Actualizacion: new Date().toISOString(),
            };

            const url = `https://gimnasio-deploy.onrender.com/instalacion/${this.editId}/`;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            };

            axios
                .put(url, instalacionesInformacion, { headers })
                .then((response) => {
                    console.log("Datos actualizados", response.data);
                    this.fetchInstalaciones();  // Actualiza la tabla después de actualizar
                    this.resetForm();  // Resetea el formulario y cambia el modo a no edición
                })
                .catch((error) => { console.error(error); });
        },


        deleteInstalacion(Id) {
            console.log("ID a eliminar:", Id);
            const url = `https://gimnasio-deploy.onrender.com/instalacion/${Id}`;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            };

            axios
                .delete(url, { headers })
                .then((response) => {
                    this.fetchInstalaciones();  // Actualiza la tabla después de eliminar
                })
                .catch((error) => { console.error(error) });
        },
        closeModal() {
            this.showModal = false;  // Oculta el modal
        },

        resetForm() {
            this.formInstalaciones = {
                Sucursal_Id: '',
                Descripcion: '',
                Tipo: '',
                Calificacion: '',
                Horario_Disponible: '',
                Servicio: '',
                Observaciones: ''
            };
            this.isEditing = false;
            this.editId = null;
            this.showForm = false;  // Oculta el formulario
        }
    },
    mounted() {
        this.fetchInstalaciones();  // Cargar datos al montar el componente
    }
}
</script>
