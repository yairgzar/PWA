<template>
    <h1 class="title-gym">BULL'S GYM</h1>
    <main class="w-[100%] h-auto ml-2">
        <section>
            <div class="mx-auto p-4">
                <div class="bg-gray-900 dark:bg-gray-700 shadow rounded-lg p-6">
                    <h1 class="text-xl font-semibold mb-4 text-gray-100 dark:text-gray-100">Agragar Productos</h1>
                    <p class="text-gray-100 dark:text-gray-100 mb-6">Ingresa la información Correspondiente para crear un nuevo producto.</p>
                    <form>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <input type="text" placeholder="Nombre de Producto" class=" p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                            <input type="text" placeholder="Marca" class=" p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                            <input type="text" placeholder="Precio Actual" class=" p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">

                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <input type="text" placeholder="Codigo de barras" class=" p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                            <input type="text" placeholder="Descripción" class="border p-2 rounded-lg w-full font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                            <select class=" rounded-lg w-full font-medium bg-gray-100  border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                                <option value="">Presentacion</option>
                                <option value="perdida">Patillas</option>
                                <option value="aumento">Malteadas</option>
                                <option value="mantenimiento">Polvos</option>
                            </select>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <input type="text" placeholder="Estatus" class=" p-2 rounded-lg w-full font-medium bg-gray-100  border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                            <input type="text" placeholder="Fecha registro" class=" p-2 rounded-lg w-full font-medium bg-gray-100  border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                            <input type="text" placeholder="Fecha actualizacion" class=" p-2 rounded-lg w-full font-medium bg-gray-100  border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">

                        </div>
                        <button type="button" id="producto" class="px-1 py-1 w-[30%] rounded bg-red-600 text-white hover:bg-gray-600 focus:outline-none transition-colors">
                            Agregar Producto
                        </button>
                    </form>
                </div>
            </div>
            <hr class="border-2 m-4 mt-1">
        </section>
        <section class="m-4">
            <table class="w-full bg-white text-left text-sm text-gray-900 rounded ">
                <thead class="bg-gray-50 text-center">
                    <tr>
                        <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100 rounded-l-md">Nombre de Producto</th>
                        <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">Precio</th>
                        <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">Fecha de creacion</th>
                        <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">Fecha de Actualización</th>
                        <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100 rounded-r-md"></th>
                    </tr>
                </thead>
                <tbody class="bg-gray-200">
                    <tr class="hover:bg-gray-500 ">
                        <th class="h-[50px] text-center">
                            <span>Proteína Whey</span>
                        </th>
                        <th class="text-center">
                            <span>$589.20</span>
                        </th>
                        <th class="text-center">
                            <span>03-Agosto-2024</span>
                        </th>
                        <th class="text-center">
                            <span>08-Agosto-2024</span>
                        </th>
                        <th class="flex justify-center">
                            <button type="button" id="producto" class="px-4 mt-1 py-2 rounded-md bg-red-600 text-white hover:bg-gray-600">
                                Editar Producto
                            </button>
                        </th>
                    </tr>

                    <tr class="hover:bg-gray-500">
                        <th class="h-[50px] text-center">
                            <span>Creatina Monohidratada</span>
                        </th>
                        <th class="text-center">
                            <span>$600.00</span>
                        </th>
                        <th class="text-center">
                            <span>04-Agosto-2024</span>
                        </th>
                        <th class="text-center">
                            <span>08-Agosto-2024</span>
                        </th>
                        <th class="flex justify-center">
                            <button type="button" id="producto" class="px-4 mt-1 py-2 rounded-md bg-red-600 text-white hover:bg-gray-600">
                                Editar Producto
                            </button>
                        </th>
                    </tr>

                    <tr class="hover:bg-gray-500">
                        <th class="h-[50px] text-center">
                            <span>BCAA</span>
                        </th>
                        <th class="text-center">
                            <span>$520.00</span>
                        </th>
                        <th class="text-center">
                            <span>05-Agosto-2024</span>
                        </th>
                        <th class="text-center">
                            <span>08-Agosto-2024</span>
                        </th>
                        <th class="flex justify-center">
                            <button type="button" id="producto" class="px-4 mt-1 py-2 rounded-md bg-red-600 text-white hover:bg-gray-600">
                                Editar Producto
                            </button>
                        </th>
                    </tr>

                    <tr class="hover:bg-gray-500">
                        <th class="h-[50px] text-center">
                            <span>Pre-entrenador</span>
                        </th>
                        <th class="text-center">
                            <span>$400.00</span>
                        </th>
                        <th class="text-center">
                            <span>06-Agosto-2024</span>
                        </th>
                        <th class="text-center">
                            <span>08-Agosto-2024</span>
                        </th>
                        <th class="flex justify-center">
                            <button type="button" id="producto" class="px-4 mt-1 py-2 rounded-md bg-red-600 text-white hover:bg-gray-600">
                                Editar Producto
                            </button>
                        </th>
                    </tr>

                    <tr class="hover:bg-gray-500">
                        <th class="h-[50px] text-center">
                            <span>Multivitamínico</span>
                        </th>
                        <th class="text-center">
                            <span>$200.00</span>
                        </th>
                        <th class="text-center">
                            <span>03-Agosto-2024</span>
                        </th>
                        <th class="text-center">
                            <span>08-Agosto-2024</span>
                        </th>
                        <th class="flex justify-center">
                            <button type="button" id="producto" class="px-4 mt-1 py-2 rounded-md bg-red-600 text-white hover:bg-gray-600">
                                Editar Producto
                            </button>
                        </th>
                    </tr>

                    <tr class="hover:bg-gray-500">
                        <th class="h-[50px] text-center">
                            <span>Proteína Vegana</span>
                        </th>
                        <th class="text-center">
                            <span>$500.00</span>
                        </th>
                        <th class="text-center">
                            <span>04-Agosto-2024</span>
                        </th>
                        <th class="text-center">
                            <span>08-Agosto-2024</span>
                        </th>
                        <th class="flex justify-center">
                            <button type="button" id="producto" class="px-4 mt-1 py-2 rounded-md bg-red-600 text-white hover:bg-gray-600">
                                Editar Producto
                            </button>
                        </th>
                    </tr>

             
                </tbody>
            </table>
            <hr class="border-2 mt-4">
        </section>
    </main>
</template>