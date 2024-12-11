<template>
    <h1 class="title-gym">BULL'S GYM</h1>
    <main class="w-[100%] h-auto ml-2">
        <section>
            <div class="mx-auto p-4">
                <div class="bg-white-900 white:bg-white-700 shadow rounded-lg p-6">
                    <h1 class="text-xl font-semibold mb-4 text-dark-100 dark:text-dark-100">Crear nueva membresía</h1>
                    <p class="text-dark-100 dark:text-dark-100 mb-6">Ingresa la información correspondiente para crear
                        una nueva membresía.</p>
                    <form>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <input type="text" v-model="this.membresiaData.Codigo" placeholder="Código"
                                class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                            <select v-model="this.membresiaData.Tipo"
                                class="rounded-lg w-full font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                                <option selected>Tipo</option>
                                <option value="Individual">Individual</option>
                                <option value="Familiar">Familiar</option>
                                <option value="Empresarial">Empresarial</option>
                            </select>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <select v-model="this.membresiaData.Tipo_Servicios"
                                class="rounded-lg w-full font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                                <option value="" selected>Tipo de servicios</option>
                                <option value="Basicos">Básicos</option>
                                <option value="Completa">Completa</option>
                                <option value="Coaching">Coaching</option>
                                <option value="Nutriologo">Nutriólogo</option>
                            </select>
                            <select v-model="this.membresiaData.Tipo_Plan"
                                class="rounded-lg w-full font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                                <option value="" selected>Tipo de plan</option>
                                <option value="Anual">Anual</option>
                                <option value="Semestral">Semestral</option>
                                <option value="Trimestral">Trimestral</option>
                                <option value="Bimestral">Bimestral</option>
                                <option value="Mensual">Mensual</option>
                                <option value="Semanal">Semanal</option>
                                <option value="Diaria">Diaria</option>
                            </select>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <select v-model="this.membresiaData.Nivel"
                                class="rounded-lg w-full font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                                <option value="" selected>Nivel</option>
                                <option value="Nuevo">Nuevo</option>
                                <option value="Plata">Plata</option>
                                <option value="Oro">Oro</option>
                                <option value="Diamante">Diamante</option>
                            </select>
                            <input id="fecha_inicio" type="datetime-local" v-model="this.membresiaData.Fecha_Inicio"
                                placeholder="Fecha de Inicio"
                                class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <input type="datetime-local" v-model="this.membresiaData.Fecha_Fin"
                                placeholder="Fecha de Fin"
                                class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                            <select v-model="this.membresiaData.Estatus"
                                class="rounded-lg w-full font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                                <option value="" selected>Estatus</option>
                                <option value="true">Activo</option>
                                <option value="false">Inactivo</option>
                            </select>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <input type="datetime-local" v-model="this.membresiaData.Fecha_Registro"
                                placeholder="Fecha de Registro"
                                class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                        </div>
                        <button type="button" @click="submitForm" id="membresia"
                            class="px-4 py-2 w-[20%] rounded bg-red-600 text-white hover:bg-gray-600 focus:outline-none transition-colors">
                            Crear membresía
                        </button>
                    </form>
                </div>
            </div>
            <hr class="border-2 m-4 mt-1">
        </section>
        <section class="mx-auto p-4">
            <!-- Botón de acción con menú desplegable -->
            <div
                class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
                <div>
                    <button id="dropdownActionButton" data-dropdown-toggle="dropdownAction"
                        class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button">
                        <span class="sr-only">Action button</span>
                        Actions
                        <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                    <!-- Dropdown menu -->
                    <div id="dropdownAction"
                        class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                        <ul class="py-1 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownActionButton">
                            <li>
                                <a href="#"
                                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Eliminar</a>
                            </li>
                            <li>
                                <a href="#"
                                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Ordenar
                                    A-Z</a>
                            </li>
                            <li>
                                <a href="#"
                                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Ordenar
                                    Z-A</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- Campo de búsqueda -->
                <label for="table-search" class="sr-only">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="text" id="table-search-users"
                        class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Buscar por código">
                </div>
            </div>
            <hr class="border-2 mt-4">
        </section>
        <section class="m-4">
            <table class="w-full bg-white text-left text-sm text-gray-900 rounded">
                <thead class="bg-gray-50 text-center">
                    <tr>
                        <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100 rounded-l-md">ID</th>
                        <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">Código</th>
                        <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">Tipo</th>
                        <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">Tipo de Servicios</th>
                        <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">Tipo de Plan</th>
                        <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">Nivel</th>
                        <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">Fecha de Inicio</th>
                        <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">Fecha de Fin</th>
                        <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">Estatus</th>
                        <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100 rounded-r-md">Acciones
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200" v-for="membresia in this.membresiasTable"
                    :key="membresia.ID">
                    <tr>
                        <td class="px-6 py-4 text-center font-medium text-gray-900">{{ membresia.ID }}</td>
                        <td class="px-6 py-4 text-center text-gray-700">{{ membresia.Codigo }}</td>
                        <td class="px-6 py-4 text-center text-gray-700">{{ membresia.Tipo }}</td>
                        <td class="px-6 py-4 text-center text-gray-700">{{ membresia.Tipo_Servicios }}</td>
                        <td class="px-6 py-4 text-center text-gray-700">{{ membresia.Tipo_Plan }}</td>
                        <td class="px-6 py-4 text-center text-gray-700">{{ membresia.Nivel }}</td>
                        <td class="px-6 py-4 text-center text-gray-700">{{ membresia.Fecha_Inicio }}</td>
                        <td class="px-6 py-4 text-center text-gray-700">{{ membresia.Fecha_Fin }}</td>
                        <td class="px-6 py-4 text-center text-gray-700">{{ membresia.Estatus ? 'Activo' : 'Inactivo' }}
                        </td>
                        <td class="flex justify-center">
                            <button type="button" @click="openModalUpdate(membresia)" id="membresia"
                                class="px-4 mt-1 py-2 rounded-md bg-blue-600 text-white hover:bg-gray-600">
                                Editar
                            </button>
                            <button type="button" @click="deleteMembresia(membresia.ID)" id="membresia"
                                class="px-4 ml-2 mt-1 py-2 rounded-md bg-red-600 text-white hover:bg-gray-600">
                                Eliminar
                            </button>
                        </td>
                    </tr>
                    <!-- Más filas aquí -->
                </tbody>
            </table>
        </section>
        <section class="m-4">
            <table class="w-full bg-white text-left text-sm text-gray-900 rounded">
                <!-- Encabezado de la tabla -->
                <thead class="bg-gray-50 text-center">
                    <!-- Tu contenido existente de la tabla aquí -->
                </thead>
                <!-- Cuerpo de la tabla -->
                <tbody class="bg-white divide-y divide-gray-200">
                    <!-- Tu contenido existente de filas aquí -->
                </tbody>
            </table>

            <!-- Paginación -->
            <!-- <div class="flex justify-between items-center mt-4">
                <div class="pagination" id="pagination">
                    <a @click="updateTable(0, 10)" class="first-page"><<</a>
                    <a href="#prev" class="prev-page"><</a>
            
                    <a @click="updateTable(0, 10)" class="page-number">1</a>
                    <a @click="updateTable(10, 20)" class="page-number">2</a>
                    <a @click="updateTable(10, 20)" class="page-number">3</a>
                    <a @click="updateTable(10, 20)" class="page-number">4</a>
                    <a @click="updateTable(10, 20)" class="page-number">5</a>
                    <span class="dots">...</span>
                    <a href="#page10" class="page-number">10</a>
                    
                    <a @click="updateTable(this.skip + 10, this.limit + 10)" class="next-page">></a>
                    <a @click="updateTable(this.totalMembresias - 10, this.totalMembresias)" class="last-page">>></a>
                </div>
            </div> -->
        </section>

    </main>
</template>
<script>
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js'
import Swal from 'sweetalert2';
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale)

export default {
    data() {
        return {
            // skip: 0,
            // limit: 10,
            // totalMembresias: 0,
            token: localStorage.getItem("token"),
            membresiaData: {
                Codigo: null,
                Tipo: null,
                Tipo_Servicios: null,
                Tipo_Plan: null,
                Nivel: null,
                Fecha_Inicio: null,
                Estatus: null,
                Fecha_Registro: null,
                Fecha_Actualizacion: (new Date(Date.now())).toISOString()
            },
            membresiasTable: []
        }
    },
    methods: {
        clearData() {
            this.membresiaData = {
                Codigo: null,
                Tipo: null,
                Tipo_Servicios: null,
                Tipo_Plan: null,
                Nivel: null,
                Fecha_Inicio: null,
                Fecha_Fin: null,
                Estatus: null,
                Fecha_Registro: null,
                Fecha_Actualizacion: (new Date(Date.now())).toISOString()
            }
        },
        async submitForm() {
            this.membresiaData.Estatus = this.membresiaData.Estatus === 'true' ? true : false;
            console.log(JSON.stringify(this.membresiaData))
            const url = "https://gimnasio-deploy.onrender.com/membresia/"

            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify(this.membresiaData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error en la solicitud: ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    this.clearData()
                    this.updateTable()
                    console.log('Respuesta de la API:', data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },
        async deleteMembresia(membresia_id) {
            Swal.fire({
                title: '¿Estás seguro?',
                text: "¡No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminarlo!',
                cancelButtonText: 'Cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Eliminado!',
                        'El registro ha sido eliminado.',
                        'success'
                    )
                    const url = `https://gimnasio-deploy.onrender.com/${membresia_id}`

                    await fetch(url, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${this.token}`
                        }
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Error en la solicitud: ' + response.statusText);
                            }
                            return response.json();
                        })
                        .then(data => {
                            this.updateTable()
                            console.log('Respuesta de la API:', data);
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                }
            })
        },
        async openModalUpdate(membresia) {
            this.membresiaData = { ...membresia };

            const { value: formValues } = await Swal.fire({
                title: 'Actualizar Membresia',
                html: this.createFormHtml(),
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Actualizar',
                cancelButtonText: 'Cancelar',
                preConfirm: () => {
                    return {
                        Codigo: document.getElementById('swal-input1').value,
                        Tipo: document.getElementById('swal-input2').value,
                        Tipo_Servicios: document.getElementById('swal-input3').value,
                        Tipo_Plan: document.getElementById('swal-input4').value,
                        Nivel: document.getElementById('swal-input5').value,
                        Fecha_Inicio: document.getElementById('swal-input6').value,
                        Estatus: document.getElementById('swal-input7').value,
                        Fecha_Registro: document.getElementById('swal-input8').value,
                        Fecha_Actualizacion: (new Date(Date.now())).toISOString()
                    }
                }
            });

            if (formValues) {
                // Lógica para actualizar el miembro con los nuevos valores
                this.updateMembresia(membresia.ID, formValues);
            }
        },
        async updateMembresia(id, membresiaData) {
            membresiaData.Estatus = membresiaData.Estatus === 'true' ? true : false;
            console.log(JSON.stringify(membresiaData))
            const url = `https://gimnasio-deploy.onrender.com/${id}`

            await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify(membresiaData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error en la solicitud: ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    this.updateTable()
                    console.log('Respuesta de la API:', data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },
        async updateTable(skip = 0, limit = 20) {
            const url = `https://gimnasio-deploy.onrender.com/?skip=${skip}&limit=${limit}`
            // this.skip = skip
            // this.limit = limit

            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }

            const data = await response.json();
            console.log('Respuesta de la API:', data);

            // this.totalMembresias = data.total_membresias
            // console.log(this.totalMembresias)
            this.membresiasTable = data.membresias.map(item => ({ ...item }));
            console.log('Table:', this.membresiasTable);
        },
        createFormHtml() {
            return `
               <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <input id="swal-input1" type="text" value="${this.membresiaData.Codigo}" placeholder="Código"
                                class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                            <select id="swal-input2"
                                class="rounded-lg w-full font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                                <option value="" ${this.membresiaData.Tipo === '' ? 'selected' : ''}>Tipo</option>
                                <option value="Individual"${this.membresiaData.Tipo === 'Individual' ? 'selected' : ''}>Individual</option>
                                <option value="Familiar" ${this.membresiaData.Tipo === 'Familiar' ? 'selected' : ''}>Familiar</option>
                                <option value="Empresarial" ${this.membresiaData.Tipo === 'Empresarial' ? 'selected' : ''}>Empresarial</option>
                            </select>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <select id="swal-input3"
                                class="rounded-lg w-full font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                                <option value=""  ${this.membresiaData.Tipo_Servicios === '' ? 'selected' : ''}> Tipo de servicios</option>
                                <option value="Basicos" ${this.membresiaData.Tipo_Servicios === 'Basicos' ? 'selected' : ''}> Básicos</option>
                                <option value="Completa" ${this.membresiaData.Tipo_Servicios === 'Completa' ? 'selected' : ''}> Completa</option>
                                <option value="Coaching" ${this.membresiaData.Tipo_Servicios === 'Coaching' ? 'selected' : ''}> Coaching</option>
                                <option value="Nutriologo" ${this.membresiaData.Tipo_Servicios === 'Nutriologo' ? 'selected' : ''}> Nutriólogo</option>
                            </select>
                            <select id="swal-input4" 
                                class="rounded-lg w-full font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                                <option value="" ${this.membresiaData.Tipo_Plan === '' ? 'selected' : ''}>Tipo de plan</option>
                                <option value="Anual" ${this.membresiaData.Tipo_Plan === 'Anual' ? 'selected' : ''}>Anual</option>
                                <option value="Semestral" ${this.membresiaData.Tipo_Plan === 'Semestral' ? 'selected' : ''}>Semestral</option>
                                <option value="Trimestral"${this.membresiaData.Tipo_Plan === 'Trimestral' ? 'selected' : ''}>Trimestral</option>
                                <option value="Bimestral" ${this.membresiaData.Tipo_Plan === 'Bimestral' ? 'selected' : ''}>Bimestral</option>
                                <option value="Mensual" ${this.membresiaData.Tipo_Plan === 'Mensual' ? 'selected' : ''}>Mensual</option>
                                <option value="Semanal"${this.membresiaData.Tipo_Plan === 'Semanal' ? 'selected' : ''}>Semanal</option>
                                <option value="Diaria" ${this.membresiaData.Tipo_Plan === 'Diaria' ? 'selected' : ''}>Diaria</option>
                            </select>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <select id="swal-input5"
                                class="rounded-lg w-full font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                                <option value="" ${this.membresiaData.Nivel === '' ? 'selected' : ''}>Nivel</option>
                                <option value="Nuevo" ${this.membresiaData.Nivel === 'Nuevo' ? 'selected' : ''}>Nuevo</option>
                                <option value="Plata" ${this.membresiaData.Nivel === 'Plata' ? 'selected' : ''}>Plata</option>
                                <option value="Oro" ${this.membresiaData.Nivel === 'Oro' ? 'selected' : ''}>Oro</option>
                                <option value="Diamante" ${this.membresiaData.Nivel === 'Diamante' ? 'selected' : ''}>Diamante</option>
                            </select>
                            <input id="swal-input6" type="datetime-local" value="${this.membresiaData.Fecha_Inicio}"
                                placeholder="Fecha de Inicio"
                                class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <select id="swal-input7"
                                class="rounded-lg w-full font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                                <option value="" ${this.membresiaData.Estatus === '' ? 'selected' : ''}>Estatus</option>
                                <option value="true" ${this.membresiaData.Estatus === 'true' ? 'selected' : ''}>Activo</option>
                                <option value="false" ${this.membresiaData.Estatus === 'false' ? 'selected' : ''}>Inactivo</option>
                            </select>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <input id="swal-input8" type="datetime-local" value="${this.membresiaData.Fecha_Registro}"
                                placeholder="Fecha de Registro"
                                class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                        </div>
            `;
        },
    },
    created() {
        this.updateTable()
    }
}
</script>
<style>
.pagination {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.pagination a,
.pagination span {
    margin: 0 5px;
    padding: 8px 16px;
    text-decoration: none;
    color: #007bff;
    border: 1px solid #ddd;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.pagination a:hover {
    background-color: #f0f0f0;
}

.pagination .page-number {
    color: #007bff;
}

.pagination .active {
    font-weight: bold;
    background-color: #007bff;
    color: white;
    border-color: #007bff;
}

.pagination .dots {
    padding: 8px 0;
    border: none;
    color: #555;
}

.pagination a.first-page,
.pagination a.last-page,
.pagination a.prev-page,
.pagination a.next-page {
    font-weight: bold;
}

</style>