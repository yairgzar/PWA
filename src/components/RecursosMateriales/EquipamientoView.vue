<template>
    <div class="mb-8 p-4 bg-white rounded shadow">
    <button @click="showForm = true"
            class="mb-4 bg-green-600 hover:bg-green-700 text-white font-extrabold py-2 px-4 rounded-xl text-center">
            Crear Nueva Equipamiento
        </button>
    
    <div v-if="showForm">
    <label for="" class="block mt-3 text-xl text-gray-700 text-center font-extrabold">
        Equipamiento
    </label>


    <form ref="formEquipamiento">

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            
                <!-- <label class="px-1 block text-sm uppercase text-gray-500 mb-2 font-extrabold">Area</label> -->
                <input type="text" v-model="formEquipamiento.Area" name="Area" id="Area"
                class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    placeholder="Area">
          
                <!-- <label class="px-1 block text-sm uppercase text-gray-500 mb-2 font-extrabold">Nombre</label> -->
                <input type="text" v-model="formEquipamiento.Nombre" name="Nombre" id="Nombre"
                class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    placeholder="Nombre">

           
                <!-- <label class="px-1 block text-sm uppercase text-gray-500 mb-2 font-extrabold">Marca
                </label> -->
                <input type="text" v-model="formEquipamiento.Marca" name="Marca" id="Marca"
                class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    placeholder="Marca">
           
                <!-- <label class="px-1 block text-sm uppercase text-gray-500 mb-2 font-extrabold">Modelo
                </label> -->
                <input type="text" v-model="formEquipamiento.Modelo" name="Modelo" id="Modelo"
                class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    placeholder="Modelo">
            
                <!-- <label class="px-1 block text-sm uppercase text-gray-500 mb-2 font-extrabold">Fotografia</label> -->
                <input  type="text" v-model="formEquipamiento.Fotografia" name="Fotrografia" id="Fotografia"
                class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                placeholder="Fotografia link" >

            
                <!-- <label class="px-1 block text-sm uppercase text-gray-500 mb-2 font-extrabold">Total exixtencias
                </label> -->
                <input type="text" v-model="formEquipamiento.Total_Existencias" name="Total_exixtencias"
                    id="Total_exixtencias"
                    class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    placeholder="Total existencia">
            
                    <a type="submit"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3 cursor-pointer transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105 rounded-xl text-center"
                @click="isEditing ? updateEquipamiento() : extractFormEquipamiento()">
                {{ isEditing ? 'Actualizar' : 'Enviar' }}
            </a>
            <button @click="resetForm()"
                    class="w-full bg-red-600 hover:bg-red-700 text-white font-extrabold py-2 px-4 rounded-xl text-center mt-4">
                    Cancelar
                </button>
        </div>
    </form>
    </div>

    <div class="mt-8">
            <table class="w-full bg-white text-left text-sm text-gray-900 rounded">
                <thead class="bg-gray-50 text-center">
                    <tr>
                        <th scope="col" class="px-4 py-2 bg-gray-900 font-medium text-gray-100 rounded-l-md w-1/15">Id</th>
                        <th class="px-4 py-2 bg-gray-900 font-medium text-gray-100 w-1/6">Area</th>
                        <th class="px-4 py-2 bg-gray-900 font-medium text-gray-100 w-1/5">Nombre</th>
                        <th class="px-4 py-2 bg-gray-900 font-medium text-gray-100 w-1/10">Marca</th>
                        <th class="px-4 py-2 bg-gray-900 font-medium text-gray-100 w-1/10">Modelo</th>
                        <th class="px-4 py-2 bg-gray-900 font-medium text-gray-100 w-1/10">Fotografia</th>
                        <th class="px-4 py-2 bg-gray-900 font-medium text-gray-100 w-1/10">Estatus</th>
                        <th class="px-4 py-2 bg-gray-900 font-medium text-gray-100 w-1/10">Total existencias</th>

                        <th class="px-4 py-2 bg-gray-900 font-medium text-gray-100 rounded-r-md w-1/5">Acciones</th>
                    </tr>
                </thead>

                <tbody class="bg-gray-200">
                    <tr v-for="equipamiento in equipamientos" :key="equipamiento.Id">
                        <td class="h-[50px] text-center">{{ equipamiento.Id }}</td>
                        <td class="text-center">{{ equipamiento.Area }}</td>
                        <td class="text-center">{{ equipamiento.Nombre }}</td>
                        <td class="text-center">{{ equipamiento.Marca }}</td>
                        <td class="text-center">{{ equipamiento.Modelo }}</td>
                        <td class="text-center">{{ equipamiento.Fotografia }}</td>
                        <td class="px-6 py-4 whitespace-nowrap rounded-lg text-sm">
                            {{ equipamiento.Estatus ? 'Activo' : 'Inactivo' }}
                        </td>
                        <td class="text-center">{{ equipamiento.Total_Existencias }}</td>
                        <td class="text-center">
                            <div class="flex justify-center space-x-2">
                                <button @click="editEquipamiento(equipamiento)"
                                    class="px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition-colors flex items-center text-xs">Editar</button>
                                <button @click="deleteEquipamiento(equipamiento.Id)"
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
import axios from 'axios'

export default {
    data() {
        return {
            formEquipamiento: {
                Area: '',
                Nombre: '',
                Marca: '',
                Modelo: '',
                Fotografia: '',
                Total_Existencias: '',
            },
            equipamientos: [], // Para almacenar los datos obtenidos
            isEditing: false,    // Estado de edición
            editId: null,         // ID del ítem en edición
            showForm: false // Variable para controlar la visibilidad del formulario
        }
    },


    methods: {
        extractFormEquipamiento() {
            const EquipamientoInformacion = {
                Area: this.formEquipamiento.Area,
                Nombre: this.formEquipamiento.Nombre,
                Marca: this.formEquipamiento.Marca,
                Modelo: this.formEquipamiento.Modelo,
                Fotografia: this.formEquipamiento.Fotografia,
                Total_Existencias: parseInt(this.formEquipamiento.Total_Existencias),
                Estatus: true,
                Fecha_Registro: new Date().toISOString(),
                Fecha_Actualizacion: new Date().toISOString(),
            };

            const url = "https://gimnasio-deploy.onrender.com/equipamiento/";
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            };

            axios
                .post(url, EquipamientoInformacion, { headers })
                .then((response) => {
                    console.log("Datos enviados a la base", response.data);
                    this.fetchEquimamientos(); // Actualizar la tabla después de enviar
                    this.resetForm();
                    this.isEditing = false; // Opcional: establece el modo de edición en falso
                })
                .catch((error) => { console.error(error) });
        },

        fetchEquimamientos() {
            const url = "https://gimnasio-deploy.onrender.com/equipamiento/";
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            };

            axios
                .get(url, { headers })
                .then((response) => {
                    this.equipamientos = response.data; // Actualizar la lista de instalaciones
                })
                .catch((error) => { console.error(error) });
        },

        editEquipamiento(equipamiento) {
            this.isEditing = true;
            this.editId = equipamiento.Id;
            // Cargar los datos en el formulario
            this.formEquipamiento = {
                Area: equipamiento.Area,
                Nombre: equipamiento.Nombre,
                Marca: equipamiento.Marca,
                Modelo: equipamiento.Modelo,
                Fotografia: equipamiento.Fotografia,
                Total_Existencias: equipamiento.Total_Existencias,
            };
            this.showForm = true;  // Muestra el formulario en modo edición
        },

        updateEquipamiento() {
            if (!this.editId) {
                console.error("Edit ID is missing.");
                return;
            }

            const EquipamientoInformacion = {
                Area: this.formEquipamiento.Area,
                Nombre: this.formEquipamiento.Nombre,
                Marca: this.formEquipamiento.Marca,
                Modelo: this.formEquipamiento.Modelo,
                Fotografia: this.formEquipamiento.Fotografia,
                Total_Existencias: parseInt(this.formEquipamiento.Total_Existencias),
                Estatus: true,
                Fecha_Registro: new Date().toISOString(),
                Fecha_Actualizacion: new Date().toISOString(),
            };

            const url = `https://gimnasio-deploy.onrender.com/equipamiento/${this.editId}/`;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            };

            axios
                .put(url, EquipamientoInformacion, { headers })
                .then((response) => {
                    console.log("Datos actualizados", response.data);
                    this.fetchEquimamientos();  // Actualiza la tabla después de actualizar
                    this.resetForm();  // Resetea el formulario y cambia el modo a no edición
                })
                .catch((error) => { console.error(error); });
        },


        deleteEquipamiento(Id) {
            console.log("ID a eliminar:", Id);
            const url = `https://gimnasio-deploy.onrender.com/equipamiento/${Id}`;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            };

            axios
                .delete(url, { headers })
                .then((response) => {
                    this.fetchEquimamientos();  // Actualiza la tabla después de eliminar
                })
                .catch((error) => { console.error(error) });
        },
        closeModal() {
            this.showModal = false;  // Oculta el modal
        },

        resetForm() {
            this.formEquipamiento = {
                Area: '',
                Nombre: '',
                Marca: '',
                Modelo: '',
                Fotografia: '',
                Total_exixtencias: '',
            };
            this.isEditing = false;
            this.editId = null;
            this.showForm = false;  // Oculta el formulario
        }
    },
    mounted() {
        this.fetchEquimamientos();  // Cargar datos al montar el componente
    }
}
</script>
