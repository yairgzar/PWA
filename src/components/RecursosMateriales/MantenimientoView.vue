<template>
    <div class="mb-8 p-4 bg-white rounded shadow">
        <button @click="showForm = true"
            class="mb-4 bg-green-600 hover:bg-green-700 text-white font-extrabold py-2 px-4 rounded-xl text-center">
            Nuevo mantenimiento
        </button>
        <div v-if="showForm">
            <label for="" class="block mt-3 text-xl text-gray-700 text-center font-extrabold">
                Mantenimiento
            </label>
            <form @submit.prevent="isEditing ? updateMantenimiento() : extractFormMantenimiento()" ref="formMantenimiento">

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

                    <!-- <label class="px-1 block text-sm uppercase text-gray-500 mb-2 font-extrabold">Equipo</label> -->
                    <input type="text" v-model="formMantenimiento.Equipo" name="Equipo" id="Equipo"
                        class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        placeholder="Equipo">
                    <!-- <label class="px-1 block text-sm uppercase text-gray-500 mb-2 font-extrabold">Descripción</label> -->
                    <input type="text" v-model="formMantenimiento.Descripcion" name="Descripcion" id="Descripcion"
                        class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        placeholder="Descripción">

                    <!-- <label class="px-1 block text-sm uppercase text-gray-500 mb-2 font-extrabold">Responsable</label> -->
                    <input type="text" v-model="formMantenimiento.Responsable" name="Responsable" id="Responsable"
                        class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        placeholder="Responsable">

                    <!-- <label class="px-1 block text-sm uppercase text-gray-500 mb-2 font-extrabold">Costo</label> -->
                    <input type="text" v-model="formMantenimiento.Costo" name="Costo" id="Costo"
                        class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        placeholder="Costo">
                </div>

                <button type="submit"
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3 cursor-pointer transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105 rounded-xl text-center">
                    {{ isEditing ? 'Actualizar' : 'Enviar' }}
                </button>
                <button @click="resetForm()"
                    class="w-full bg-red-600 hover:bg-red-700 text-white font-extrabold py-2 px-4 rounded-xl text-center mt-4">
                    Cancelar
                </button>

            </form>
        </div>
        <!-- Tabla para mostrar los datos -->
        <div class="mt-8 overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                <thead class="bg-gray-50 text-gray-600 uppercase">
                    <tr>
                        <th scope="col" class="px-4 py-2 bg-gray-900 font-medium text-gray-100 rounded-l-md w-1/15">Id</th>
                        <th class="px-4 py-2 bg-gray-900 font-medium text-gray-100 w-1/5">Equipo</th>
                        <th class="px-4 py-2 bg-gray-900 font-medium text-gray-100 w-1/6">Descripción</th>
                        <th class="px-4 py-2 bg-gray-900 font-medium text-gray-100 w-1/6">Responsable</th>
                        <th class="px-4 py-2 bg-gray-900 font-medium text-gray-100 w-1/6">Costo</th>
                        <th class="px-4 py-2 bg-gray-900 font-medium text-gray-100 w-1/6">Fecha Actualización</th>
                        <th class="px-4 py-2 bg-gray-900 font-medium text-gray-100 w-1/6">Estatus</th>
                        <th class="px-4 py-2 bg-gray-900 font-medium text-gray-100 rounded-r-md w-1/3">Acciones</th>
                    </tr>
                </thead>
                <tbody class="bg-gray-50 text-center">
                    <tr v-for="mantenimiento in mantenimientos" :key="mantenimiento.id">
                        <td class="h-[50px] text-center">{{ mantenimiento.Id }}</td>
                        <td class="px-6 py-4 whitespace-nowrap rounded-lg text-sm">{{ mantenimiento.Equipo }}</td>
                        <td class="px-6 py-4 whitespace-nowrap rounded-lg text-sm">{{ mantenimiento.Descripcion }}</td>
                        <td class="px-6 py-4 whitespace-nowrap rounded-lg text-sm">{{ mantenimiento.Responsable }}</td>
                        <td class="px-6 py-4 whitespace-nowrap rounded-lg text-sm">{{ mantenimiento.Costo }}</td>
                        <td class="px-6 py-4 whitespace-nowrap rounded-lg text-sm">{{ mantenimiento.Fecha_Actualizacion }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap rounded-lg text-sm">
                            {{ mantenimiento.Estatus ? 'Activo' : 'Inactivo' }}
                        </td>

                        <td class="px-6 py-4 whitespace-nowrap rounded-lg text-sm">
                            <div class="flex justify-center space-x-2">

                                <button @click="editMantenimiento(mantenimiento)"
                                class="px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition-colors flex items-center text-xs">Editar</button>
                                <button @click="deleteMantenimiento(mantenimiento.Id)"
                                class="px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none transition-colors flex items-center text-xs">Eliminar</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            formMantenimiento: {
                Equipo: '',
                Descripcion: '',
                Responsable: '',
                Costo: '',
            },
            mantenimientos: [],  // Lista de mantenimientos
            isEditing: false,    // Estado de edición
            editId: null,        // ID del ítem en edición
            showForm: false
        };
    },
    methods: {
        extractFormMantenimiento() {
            const mantenimientosInformacion = {
                Equipo: this.formMantenimiento.Equipo,
                Descripcion: this.formMantenimiento.Descripcion,
                Responsable: this.formMantenimiento.Responsable,
                Costo: parseFloat(this.formMantenimiento.Costo),
                Estatus: true,
                Fecha_mantenimiento: new Date().toISOString(),
                Fecha_Actualizacion: new Date().toISOString(),
            };

            const url = "https://gimnasio-deploy.onrender.com/mantenimiento/";
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOb21icmVfVXN1YXJpbyI6ImVtaWxpbyIsIkNvcnJlb19FbGVjdHJvbmljbyI6InN0cmluZyIsIkNvbnRyYXNlbmEiOiIxMjMiLCJOdW1lcm9fVGVsZWZvbmljb19Nb3ZpbCI6InN0cmluZyJ9.Ir0I1JqKFHpdVeH1Wo63X8ubqCCRyYwAMXy516dhg8k';  // Reemplazar con el token real

            axios
                .post(url, mantenimientosInformacion, { headers: { Authorization: `Bearer ${token}` } })
                .then((response) => {
                    console.log("Datos enviados a la base", response.data);
                    this.fetchMantenimientos();  // Actualiza la tabla después de enviar
                    this.resetForm();  // Resetea el formulario
                })
                .catch((error) => { console.error(error); });
        },

        fetchMantenimientos() {
            const url = "https://gimnasio-deploy.onrender.com/mantenimiento/";
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOb21icmVfVXN1YXJpbyI6ImVtaWxpbyIsIkNvcnJlb19FbGVjdHJvbmljbyI6InN0cmluZyIsIkNvbnRyYXNlbmEiOiIxMjMiLCJOdW1lcm9fVGVsZWZvbmljb19Nb3ZpbCI6InN0cmluZyJ9.Ir0I1JqKFHpdVeH1Wo63X8ubqCCRyYwAMXy516dhg8k';  // Reemplazar con el token real

            axios
                .get(url, { headers: { Authorization: `Bearer ${token}` } })
                .then((response) => {
                    this.mantenimientos = response.data;
                })
                .catch((error) => { console.error(error); });
        },

        editMantenimiento(mantenimiento) {
            this.isEditing = true;
            this.editId = mantenimiento.Id;
            // Cargar los datos en el formulario
            this.formMantenimiento = {
                Equipo: mantenimiento.Equipo,
                Descripcion: mantenimiento.Descripcion,
                Responsable: mantenimiento.Responsable,
                Costo: mantenimiento.Costo,
            };
            this.showForm = true;  // Muestra el formulario en modo edición
        },

        updateMantenimiento() {
            if (!this.editId) {
                console.error("Edit ID is missing.");
                return;
            }

            const mantenimientosInformacion = {
                Equipo: this.formMantenimiento.Equipo,
                Descripcion: this.formMantenimiento.Descripcion,
                Responsable: this.formMantenimiento.Responsable,
                Costo: parseFloat(this.formMantenimiento.Costo),
                Estatus: true,
                Fecha_mantenimiento: new Date().toISOString(),
                Fecha_Actualizacion: new Date().toISOString(),
            };

            const url = `https://gimnasio-deploy.onrender.com/mantenimiento/${this.editId}/`;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            };

            axios
                .put(url, mantenimientosInformacion, { headers })
                .then((response) => {
                    console.log("Datos actualizados", response.data);
                    this.fetchMantenimientos();  // Actualiza la tabla después de actualizar
                    this.resetForm();  // Resetea el formulario y cambia el modo a no edición
                })
                .catch((error) => { console.error(error); });
        },


        deleteMantenimiento(Id) {
            console.log("ID a eliminar:", Id);
            const url = `https://gimnasio-deploy.onrender.com/mantenimiento/${Id}`;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            };
            
            axios
                .delete(url, { headers })
                .then((response) => {
                    this.fetchMantenimientos();  // Actualiza la tabla después de eliminar
                })
                .catch((error) => { console.error(error) });
        },
        closeModal() {
            this.showModal = false;  // Oculta el modal
        },

        resetForm() {
            this.formMantenimiento = {
                Equipo: '',
                Descripcion: '',
                Responsable: '',
                Costo: '',
            };
            this.isEditing = false;
            this.editId = null;
            this.showForm = false;  // Oculta el formulario
        }
    },
    mounted() {
        this.fetchMantenimientos();  // Cargar datos al montar el componente
    }
}
</script>
