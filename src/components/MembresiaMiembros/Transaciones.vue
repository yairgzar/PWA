<template>
    <h1 class="title-gym">BULL'S GYM</h1>
    <main class="w-[100%] h-auto ml-2">
        <section>
            <div class="mx-auto p-4">
                <div class="bg-white-900 white:bg-white-700 shadow rounded-lg p-6">
                    <h1 class="text-xl font-semibold mb-4 text-dark-100 dark:text-dark-100">Crear nueva transacción</h1>
                    <p class="text-dark-100 dark:text-dark-100 mb-6">Ingresa la información correspondiente para crear
                        una nueva transacción.</p>
                    <form>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <input type="number" v-model="this.transaccionData.Usuario_ID" placeholder="Usuario ID"
                                class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                            <select v-model="this.transaccionData.Metodo_Pago"
                                class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                                <option value="">Método de Pago</option>
                                <option value="TarjetaCredito">Tarjeta de Crédito</option>
                                <option value="TarjetaDebito">Tarjeta de Débito</option>
                            </select>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <input type="number" v-model="this.transaccionData.Monto" placeholder="Monto"
                                class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                            <select v-model="this.transaccionData.Estatus"
                                class="rounded-lg w-full font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                                <option value="">Estatus</option>
                                <option value="true">Activo</option>
                                <option value="false">Inactivo</option>
                            </select>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <input type="datetime-local" v-model="this.transaccionData.Fecha_Registro"
                                placeholder="Fecha de Registro"
                                class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                        </div>
                        <button type="button" @click="submitForm" id="transaccion"
                            class="px-4 py-2 w-[20%] rounded bg-red-600 text-white hover:bg-gray-600 focus:outline-none transition-colors">
                            Crear transacción
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
                        placeholder="Buscar por usuario ID">
                </div>
            </div>
            <hr class="border-2 mt-4">
        </section>
        <section class="m-4">
            <table class="w-full bg-white text-left text-sm text-gray-900 rounded ">
                <thead class="bg-gray-50 text-center">
                    <tr>
                        <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100 rounded-l-md">Usuario ID
                        </th>
                        <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">Método de Pago</th>
                        <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">Monto</th>
                        <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">Estatus</th>
                        <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">Fecha de Registro</th>
                        <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">Fecha de
                            Actualización</th>
                        <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100 rounded-r-md">Acciones
                        </th>
                    </tr>
                </thead>
                <tbody
                    class="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    v-for="transaccion in this.transaccionesTable" :key="transaccion.ID">
                    <!-- Filas de datos aquí -->
                    <tr>
                        <td class="px-6 py-4">{{ transaccion.Usuario_ID }}</td>
                        <td class="px-6 py-4">{{ transaccion.Metodo_Pago }}</td>
                        <td class="px-6 py-4">{{ transaccion.Monto }}</td>
                        <td class="px-6 py-4">{{ transaccion.Estatus ? 'Activo' : 'Inactivo' }}</td>
                        <td class="px-6 py-4">{{ transaccion.Fecha_Registro }}</td>
                        <td class="px-6 py-4">{{ transaccion.Fecha_Actualizacion }}</td>
                        <td class="flex justify-center">
                            <button type="button" @click="openModalUpdate(transaccion)" id="transaccion"
                                class="px-4 mt-1 py-2 rounded-md bg-blue-600 text-white hover:bg-gray-600">
                                Editar
                            </button>
                            <button type="button" @click="deleteTransaccion(transaccion.ID)" id="transaccion"
                                class="px-4 ml-2 mt-1 py-2 rounded-md bg-red-600 text-white hover:bg-gray-600">
                                Eliminar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    </main>
</template>
<script>
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            token: localStorage.getItem("token"),
            transaccionData: {
                Usuario_ID: null,
                Metodo_Pago: null,
                Monto: null,
                Estatus: null,
                Fecha_Registro: null,
                Fecha_Actualizacion: (new Date(Date.now())).toISOString()
            },
            transaccionesTable: []
        }
    },
    methods: {
        clearData() {
            this.transaccionData = {
                Usuario_ID: null,
                Metodo_Pago: null,
                Monto: null,
                Estatus: null,
                Fecha_Registro: null,
                Fecha_Actualizacion: (new Date(Date.now())).toISOString()
            }
        },
        async submitForm() {
            this.transaccionData.Estatus = this.transaccionData.Estatus === 'true' ? true : false;
            console.log(JSON.stringify(this.transaccionData))
            const url = "https://gimnasio-deploy.onrender.com/transaccion/"

            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify(this.transaccionData)
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
        async deleteTransaccion(transaccion_id) {
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
                    const url = `https://gimnasio-deploy.onrender.com/${transaccion_id}`

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
        async openModalUpdate(transaccion) {
            this.transaccionData = { ...transaccion };

            const { value: formValues } = await Swal.fire({
                title: 'Actualizar Transaccion',
                html: this.createFormHtml(),
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Actualizar',
                cancelButtonText: 'Cancelar',
                preConfirm: () => {
                    return {
                        Usuario_ID: document.getElementById('swal-input1').value,
                        Metodo_Pago: document.getElementById('swal-input2').value,
                        Monto: document.getElementById('swal-input3').value,
                        Estatus: document.getElementById('swal-input4').value,
                        Fecha_Registro: document.getElementById('swal-input5').value,
                        Fecha_Actualizacion: (new Date(Date.now())).toISOString()
                    }
                }
            });

            if (formValues) {
                // Lógica para actualizar el miembro con los nuevos valores
                this.updateTransaccion(transaccion.ID, formValues);
            }
        },
        async updateTransaccion(id, transaccionData) {
            transaccionData.Estatus = transaccionData.Estatus === 'true' ? true : false;
            console.log(JSON.stringify(transaccionData))
            const url = `https://gimnasio-deploy.onrender.com/${id}`

            await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify(transaccionData)
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
        async updateTable() {
            const url = "https://gimnasio-deploy.onrender.com/transacciones/"

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

            this.transaccionesTable = data.map(item => ({ ...item }));
            console.log('Table:', this.transaccionesTable);
        },
        createFormHtml() {
            return `
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <input id="swal-input1" type="number" value="${this.transaccionData.Usuario_ID}" placeholder="Usuario ID"
                                class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                            <select id="swal-input2" 
                                class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                                <option value=""  ${this.transaccionData.Metodo_Pago === '' ? 'selected' : ''}>Método de Pago</option>
                                <option value="TarjetaCredito" ${this.transaccionData.Metodo_Pago === 'TarjetaCredito' ? 'selected' : ''}>Tarjeta de Crédito</option>
                                <option value="TarjetaDebito" ${this.transaccionData.Metodo_Pago === 'TarjetaDebito' ? 'selected' : ''}>Tarjeta de Débito</option>
                            </select>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <input id="swal-input3" type="number" value="${this.transaccionData.Monto}" placeholder="Monto"
                                class="p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                            <select id="swal-input4"
                                class="rounded-lg w-full font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                                <option value="" ${this.transaccionData.Estatus} === '' ? 'selected' : ''}>Estatus</option>
                                <option value="true" ${this.transaccionData.Estatus === 'true' ? 'selected' : ''}>Activo</option>
                                <option value="false" ${this.transaccionData.Estatus === 'false' ? 'selected' : ''}>Inactivo</option>
                            </select>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <input id="swal-input5" type="datetime-local" value="${this.transaccionData.Fecha_Registro}"
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
