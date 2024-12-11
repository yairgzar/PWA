<template>
    <div class="mb-8 p-4 bg-white rounded shadow">
        <button @click="showForm = true"
            class="mb-4 bg-green-600 hover:bg-green-700 text-white font-extrabold py-2 px-4 rounded-xl text-center">
            Generar Nuevo adeudo
        </button>

        <div v-if="showForm">
            <label for="" class="block mt-3 text-xl text-gray-700 text-center font-extrabold">
                Adeudo
            </label>

            <form ref="formAdeudo">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <!-- <div class="grid gap-12 mb-12 sm:grid-cols-2 mt-8 ">
            <div>
                <label class="px-1 block text-sm uppercase text-gray-500 mb-2 font-extrabold">Area</label> -->
                    <input type="text" v-model="formAdeudo.Area" name="Area" id="Area"
                        class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        placeholder="Nombre">

                    <!-- </div>
            <div>
                <label class="px-1 block text-sm uppercase text-gray-500 mb-2 font-extrabold">Cliente</label> -->
                    <input type="text" v-model="formAdeudo.Cliente" name="Cliente" id="Cliente"
                        class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        placeholder="Direccion ">
                    <!-- </div>
            <div>
                <label class="px-1 block text-sm uppercase text-gray-500 mb-2 font-extrabold">Descripcion
                </label> -->
                    <input type="text" v-model="formAdeudo.Descripcion" name="Descripcion" id="Descripcion"
                        class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        placeholder="Responsable">
                    <!-- </div>
            <div>
                <label class="px-1 block text-sm uppercase text-gray-500 mb-2 font-extrabold">Tipo
                </label> -->
                    <input type="text" v-model="formAdeudo.Tipo" name="Tipo" id="Tipo"
                        class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        placeholder="Total clientes atendidos">

                    <!-- <div>
                <label class="px-1 block text-sm uppercase text-gray-500 mb-2 font-extrabold">Detalle</label> -->
                    <select v-model="formAdeudo.Detalle" name="Detalle" id="Detalle"
                        class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                        <option value="">-- Selecciona detalle --</option>
                        <option value="Producto">Producto</option>
                        <option value="Equipamiento">Equipamiento</option>
                        <option value="Servicio">Servicior</option>
                    </select>

                </div>



                <div class="text-center">
                    <button type="submit"
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3 cursor-pointer transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105 rounded-xl text-center"
                        @click.prevent="isEditing ? updateAdeudo() : extractFormAdeudo()">
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
        <!-- Tabla para mostrar los datos -->
        <div class="mt-8">
            <table class="w-full bg-white text-left text-sm text-gray-900 rounded">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-4 py-2 bg-gray-900 font-medium text-gray-100 rounded-l-md w-1/15">Id</th>
                        <th class="px-4 py-2 bg-gray-900 font-medium text-gray-100 w-1/5">Area</th>
                        <th class="px-4 py-2 bg-gray-900 font-medium text-gray-100 w-1/6">Cliente
                        </th>
                        <th class="px-4 py-2 bg-gray-900 font-medium text-gray-100 w-1/6">
                            Descripcion
                        </th>
                        <th class="px-4 py-2 bg-gray-900 font-medium text-gray-100 w-1/6">Tipo</th>
                        <th class="px-4 py-2 bg-gray-900 font-medium text-gray-100 w-1/6">Detalle
                        </th>
                        <th class="px-4 py-2 bg-gray-900 font-medium text-gray-100 w-1/6">Fecha
                            Registro</th>
                        <th class="px-4 py-2 bg-gray-900 font-medium text-gray-100 rounded-r-md w-1/5">Acciones</th>

                       
                        
                    </tr>
                </thead>
                <tbody class="bg-gray-200">
                    <tr v-for="adeudo in adeudos" :key="adeudo.ID">
                        <td class="h-[50px] text-center">{{ adeudo.ID }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ adeudo.Area }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ adeudo.Cliente }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ adeudo.Descripcion }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ adeudo.Tipo }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ adeudo.Detalle }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ adeudo.Fecha_Registro }}</td>
                        <div class="flex justify-center space-x-2">

                            <button @click="editAdeudo(adeudo)" class="px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition-colors flex items-center text-xs">Editar</button>
                            <button @click="deleteAdeudo(adeudo.ID)"
                            class="px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none transition-colors flex items-center text-xs">Eliminar</button>
                        </div>
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
            formAdeudo: {
                Area: '',
                Cliente: '',
                Descripcion: '',
                Tipo: '',
                Detalle: '',
            },
            adeudos: [],  // Agregado para almacenar los datos de los adeudos
            isEditing: false,    // Estado de edición
            editID: null,         // ID del ítem en edición
            showForm: false
        }
    },

    methods: {
        extractFormAdeudo() {
            const AdeudosInformacion = {
                Area: this.formAdeudo.Area,
                Cliente: this.formAdeudo.Cliente,
                Descripcion: this.formAdeudo.Descripcion,
                Tipo: this.formAdeudo.Tipo,
                Detalle: this.formAdeudo.Detalle,
                Estatus: true,
                Fecha_Registro: new Date().toISOString(),
                Fecha_Actualizacion: new Date().toISOString(),
            };

            console.log(AdeudosInformacion);

            const url = "https://gimnasio-deploy.onrender.com/adeudo"
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            };
            axios
                .post(url, AdeudosInformacion, { headers })
                .then((response) => {
                    console.log("Datos enviados a la base", response.data);
                    this.fetchAdeudos();  // Actualiza la tabla después de enviar
                    this.resetForm();  // Resetea el formulario y cambia el modo a no edición
                })
                .catch((error) => { console.error(error) });
        },

        fetchAdeudos() {
            const url = "https://gimnasio-deploy.onrender.com/adeudo"
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            };

            axios
                .get(url, { headers })
                .then((response) => {
                    this.adeudos = response.data;
                })
                .catch((error) => { console.error(error) });
        },

        editAdeudo(adeudo) {
            this.isEditing = true;
            this.editID = adeudo.ID;
            // Cargar los datos en el formulario
            this.formAdeudo = {
                Area: adeudo.Area,
                Cliente: adeudo.Cliente,
                Descripcion: adeudo.Descripcion,
                Tipo: adeudo.Tipo,
                Detalle: adeudo.Detalle,
            };
            this.showForm = true;
        },

        updateAdeudo() {
            if (!this.editID) {
                console.error("Edit ID is missing.");
                return;
            }

            const AdeudosInformacion = {
                Area: this.formAdeudo.Area,
                Cliente: this.formAdeudo.Cliente,
                Descripcion: this.formAdeudo.Descripcion,
                Tipo: this.formAdeudo.Tipo,
                Detalle: this.formAdeudo.Detalle,
                Estatus: true,
                Fecha_Registro: new Date().toISOString(),
                Fecha_Actualizacion: new Date().toISOString(),
            };
            console.log(AdeudosInformacion);

            const url = `https://gimnasio-deploy.onrender.com/adeudo/${this.editID}`;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            };

            axios
                .put(url, AdeudosInformacion, { headers })
                .then((response) => {
                    console.log("Datos actualizados", response.data);
                    this.fetchAdeudos();  // Actualiza la tabla después de actualizar
                    this.resetForm();  // Resetea el formulario y cambia el modo a no edición
                })
                .catch((error) => { console.error(error); });
        },


        deleteAdeudo(ID) {
            console.log("ID a eliminar:", ID);
            const url = `https://gimnasio-deploy.onrender.com/adeudo/${ID}`;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            };

            axios
                .delete(url, { headers })
                .then((response) => {
                    console.log("Datos eliminados", response.data);
                    this.fetchAdeudos();  // Actualiza la tabla después de eliminar
                })
                .catch((error) => { console.error(error) });
        },
        closeModal() {
            this.showModal = false;  // Oculta el modal
        },

        resetForm() {
            this.formAdeudo = {
                Area: '',
                Cliente: '',
                Descripcion: '',
                Tipo: '',
                Detalle: '',
            };
            this.isEditing = false;
            this.editId = null;
            this.showForm = false;  // Oculta el formulario
        }

    },

    mounted() {
        this.fetchAdeudos();  // Llama a fetchAdeudos cuando el componente se monta para cargar los datos iniciales
    }
}
</script>