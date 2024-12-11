<template>
    <div class="mb-8 p-4 bg-white rounded shadow">
        <button @click="showForm = true"
            class="mb-4 bg-green-600 hover:bg-green-700 text-white font-extrabold py-2 px-4 rounded-xl text-center">
            Crear Nueva Sucursal
        </button>

        <div v-if="showForm">
        <label for="" class="block mt-3 text-xl text-gray-700 text-center font-extrabold">
            Sucursales
        </label>
        <form ref="formSucursales">

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <!-- <label class="px-1 block text-sm uppercase text-gray-500 mb-2 font-extrabold">Nombre</label> -->
                <input type="text" v-model="formSucursales.Nombre" name="Nombre" id="Nombre"
                    class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    required placeholder="Nombre">


                <!-- <label class="px-1 block text-sm uppercase text-gray-500 mb-2 font-extrabold">Dirección</label> -->
                <input type="text" v-model="formSucursales.Direccion" name="Direccion" id="Direccion"
                    class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    required placeholder="Dirección">


                <!-- <label class="px-1 block text-sm uppercase text-gray-500 mb-2 font-extrabold">Responsable</label> -->
                <input type="text" v-model="formSucursales.Responsable_Id" name="Responsable_Id" id="Responsable_Id"
                    class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    required placeholder="Responsable">


                <!-- <label class="px-1 block text-sm uppercase text-gray-500 mb-2 font-extrabold">Total Clientes
                    Atendidos</label> -->
                <input type="text" v-model="formSucursales.Total_Clientes_Atendidos" name="Total_Clientes_Atendidos"
                    id="Total_Clientes_Atendidos"
                    class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    required placeholder="Total Clientes Atendidos">


                <!-- <label class="px-1 block text-sm uppercase text-gray-500 mb-2 font-extrabold">Promedio Clientes/Día</label> -->
                <input type="text" v-model="formSucursales.Promedio_Clientes_X_Dia" name="Promedio_Clientes_X_Dia"
                    id="Promedio_Clientes_X_Dia"
                    class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    required placeholder="Promedio Clientes/Día">


                <!-- <label class="px-1 block text-sm uppercase text-gray-500 mb-2 font-extrabold">Capacidad Máxima</label> -->
                <input type="text" v-model="formSucursales.Capacidad_Maxima" name="Capacidad_Maxima" id="Capacidad_Maxima"
                    class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    required placeholder="Capacidad Máxima">


                <!-- <label class="px-1 block text-sm uppercase text-gray-500 mb-2 font-extrabold">Total Empleados</label> -->
                <input type="text" v-model="formSucursales.Total_Empleados" name="Total_Empleados" id="Total_Empleados"
                    class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    required placeholder="Total Empleados">


                <!-- <label class="px-1 block text-sm uppercase text-gray-500 mb-2 font-extrabold">Horario Disponible</label> -->
                <input type="text" v-model="formSucursales.Horario_Disponibilidad" name="Horario_Disponibilidad"
                    id="Horario_Disponibilidad"
                    class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    required placeholder="Horario Disponible">
            </div>

            <a type="submit"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3 cursor-pointer transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105 rounded-xl text-center"
                @click="isEditing ? updateSucursal() : extractFormSucursales()">
                {{ isEditing ? 'Actualizar' : 'Enviar' }}
            </a>
 <!-- Botón para cerrar el formulario -->
 <button @click="resetForm()"
                    class="w-full bg-red-600 hover:bg-red-700 text-white font-extrabold py-2 px-4 rounded-xl text-center mt-4">
                    Cancelar
                </button>
        </form>
    </div>

    <div class="mt-8">
        <table class="w-full bg-white text-left text-sm text-gray-900 rounded">
    <thead class="bg-gray-50 text-center">
        <tr>
            <th scope="col" class="px-4 py-2 bg-gray-900 font-medium text-gray-100 rounded-l-md w-1/15">Id</th>
            <th class="px-4 py-2 bg-gray-900 font-medium text-gray-100 w-1/5">Nombre</th>
            <th class="px-4 py-2 bg-gray-900 font-medium text-gray-100 w-1/6">Dirección</th>
            <th class="px-4 py-2 bg-gray-900 font-medium text-gray-100 w-1/10">Responsable</th>
            <th class="px-4 py-2 bg-gray-900 font-medium text-gray-100 w-1/10">Total Clientes Atendidos</th>
            <th class="px-4 py-2 bg-gray-900 font-medium text-gray-100 w-1/10">Promedio Clientes/Día</th>
            <th class="px-4 py-2 bg-gray-900 font-medium text-gray-100 w-1/10">Capacidad Máxima</th>
            <th class="px-4 py-2 bg-gray-900 font-medium text-gray-100 w-1/10">Total Empleados</th>
            <th class="px-4 py-2 bg-gray-900 font-medium text-gray-100 w-1/6">Horario Disponible</th>
            <th class="px-4 py-2 bg-gray-900 font-medium text-gray-100 rounded-r-md w-1/5">Acciones</th>
        </tr>
    </thead>

    <tbody class="bg-gray-200">
        <tr v-for="sucursal in sucursales" :key="sucursal.id">
            <td class="h-[50px] text-center">{{ sucursal.Id }}</td>
            <td class="text-center">{{ sucursal.Nombre }}</td>
            <td class="text-center">{{ sucursal.Direccion }}</td>
            <td class="text-center">{{ sucursal.Responsable_Id }}</td>
            <td class="text-center">{{ sucursal.Total_Clientes_Atendidos }}</td>
            <td class="text-center">{{ sucursal.Promedio_Clientes_X_Dia }}</td>
            <td class="text-center">{{ sucursal.Capacidad_Maxima }}</td>
            <td class="text-center">{{ sucursal.Total_Empleados }}</td>
            <td class="text-center">{{ sucursal.Horario_Disponibilidad }}</td>
            <td class="text-center">
                <div class="flex justify-center space-x-2">
                    <button @click="editSucursal(sucursal)"
                        class="px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition-colors flex items-center text-xs">Editar</button>
                    <button @click="deleteSucursal(sucursal.Id)"
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
            formSucursales: {
                Nombre: '',
                Direccion: '',
                Responsable_Id: '',
                Total_Clientes_Atendidos: '',
                Promedio_Clientes_X_Dia: '',
                Capacidad_Maxima: '',
                Total_Empleados: '',
                Horario_Disponibilidad: '',
            },
            sucursales: [],  // Almacenar los datos de las sucursales
            isEditing: false,
            editId: null,
            showForm: false  // Controla la visibilidad del formulario
        }
    },

    methods: {
        extractFormSucursales() {
            const sucursalesInformacion = {
                Nombre: this.formSucursales.Nombre,
                Direccion: this.formSucursales.Direccion,
                Responsable_Id: parseInt(this.formSucursales.Responsable_Id),
                Total_Clientes_Atendidos: parseInt(this.formSucursales.Total_Clientes_Atendidos),
                Promedio_Clientes_X_Dia: parseInt(this.formSucursales.Promedio_Clientes_X_Dia),
                Capacidad_Maxima: parseInt(this.formSucursales.Capacidad_Maxima),
                Total_Empleados: parseInt(this.formSucursales.Total_Empleados),
                Horario_Disponibilidad: this.formSucursales.Horario_Disponibilidad,
                Estatus: true,
                Fecha_Registro: new Date().toISOString(),
                Fecha_Actualizacion: new Date().toISOString(),
            };
            console.log(sucursalesInformacion);

            const url = "https://gimnasio-deploy.onrender.com/sucursales/";
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            };
            axios
                .post(url, sucursalesInformacion, { headers })
                .then((response) => {
                    console.log("Datos enviados a la base", response.data);
                    this.fetchSucursales();  // Actualiza la tabla después de enviar
                    this.resetForm();  // Resetea el formulario
                    this.showModal = true;  // Muestra el modal de éxito
                })
                .catch((error) => { console.error(error) });
        },

        fetchSucursales() {
            const url = "https://gimnasio-deploy.onrender.com/sucursales/";
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            };
            axios
                .get(url, { headers })
                .then((response) => {
                    this.sucursales = response.data;
                })
                .catch((error) => { console.error(error) });
        },

        editSucursal(sucursal) {
            this.isEditing = true;
            this.editId = sucursal.Id;

            // Cargar los datos en el formulario
            this.formSucursales = {
                Nombre: sucursal.Nombre,
                Direccion: sucursal.Direccion,
                Responsable_Id: sucursal.Responsable_Id,
                Total_Clientes_Atendidos: sucursal.Total_Clientes_Atendidos,
                Promedio_Clientes_X_Dia: sucursal.Promedio_Clientes_X_Dia,
                Capacidad_Maxima: sucursal.Capacidad_Maxima,
                Total_Empleados: sucursal.Total_Empleados,
                Horario_Disponibilidad: sucursal.Horario_Disponibilidad,
                
            };
            this.showForm = true;
        },

        updateSucursal() {
            if (!this.editId) {
                console.error("Edit ID is missing.");
                return;
            }

            const sucursalesInformacion = {
                Nombre: this.formSucursales.Nombre,
                Direccion: this.formSucursales.Direccion,
                Responsable_Id: parseInt(this.formSucursales.Responsable_Id),
                Total_Clientes_Atendidos: parseInt(this.formSucursales.Total_Clientes_Atendidos),
                Promedio_Clientes_X_Dia: parseInt(this.formSucursales.Promedio_Clientes_X_Dia),
                Capacidad_Maxima: parseInt(this.formSucursales.Capacidad_Maxima),
                Total_Empleados: parseInt(this.formSucursales.Total_Empleados),
                Horario_Disponibilidad: this.formSucursales.Horario_Disponibilidad,
                Estatus: true,
                Fecha_Registro: new Date().toISOString(),
                Fecha_Actualizacion: new Date().toISOString(),
            };

            const url = `https://gimnasio-deploy.onrender.com/sucursales/${this.editId}`;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            };
            axios
                .put(url, sucursalesInformacion, { headers })
                .then((response) => {
                    this.fetchSucursales();  // Actualiza la tabla después de enviar
                    this.resetForm();  // Resetea el formulario y cambia el modo a no edición
                    
                })
                .catch((error) => { console.error(error) });
        },

        deleteSucursal(Id) {
            console.log("ID a eliminar:", Id);
            const url = `https://gimnasio-deploy.onrender.com/sucursal/${Id}`;
            
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            };

            axios
                .delete(url, { headers })
                .then((response) => {
                    this.fetchSucursales();  // Actualiza la tabla después de eliminar
                })
                .catch((error) => { console.error(error) });
        },
        closeModal() {
            this.showModal = false;  // Oculta el modal
        },


        resetForm() {
            this.formSucursales = {
                Nombre: '',
                Direccion: '',
                Responsable_Id: '',
                Total_Clientes_Atendidos: '',
                Promedio_Clientes_X_Dia: '',
                Capacidad_Maxima: '',
                Total_Empleados: '',
                Horario_Disponibilidad: '',
            };
            this.isEditing = false;
            this.editId = null;
            this.showForm = false;  // Oculta el formulario
        }
    },

    mounted() {
        this.fetchSucursales();
    }
}
</script>