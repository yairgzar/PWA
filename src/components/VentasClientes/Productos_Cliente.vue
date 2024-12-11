<template>
    <div>
      <h1 class="title-gym">BULL'S GYM</h1>
      <main class="w-[100%] h-auto ml-2">
        <section class="m-4">
          <table class="w-full bg-white text-left text-sm text-gray-900 rounded">
            <thead class="bg-gray-50 text-center">
              <tr>
                <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100 rounded-l-md">Nombre de Producto</th>
                <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">Marca</th>
                <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">Precio</th>
                <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">Fecha de Creación</th>
                <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100">Fecha de Actualización</th>
                <th scope="col" class="px-6 py-4 bg-gray-900 font-medium text-gray-100 rounded-r-md"></th>
              </tr>
            </thead>
            <tbody class="bg-gray-200">
              <tr v-for="producto in productos" :key="producto.nombre" class="hover:bg-gray-500">
                <td class="h-[50px] text-center"><span>{{ producto.nombre }}</span></td>
                <td class="h-[50px] text-center"><span>{{ producto.marca }}</span></td>
                <td class="text-center"><span>{{ producto.precio }}</span></td>
                <td class="text-center"><span>{{ producto.fechaCreacion }}</span></td>
                <td class="text-center"><span>{{ producto.fechaActualizacion }}</span></td>
                <td class="text-center">
                  <button @click="comprarProducto(producto)" class="px-4 mt-1 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-800">
                    Comprar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        productos: [
          {
            nombre: 'Proteína Whey',
            marca: 'FoodFort',
            precio: '589.20',
            fechaCreacion: '03-Agosto-2024',
            fechaActualizacion: '08-Agosto-2024'
          },
          {
            nombre: 'Creatina Monohidratada',
            marca: 'Flash',
            precio: '600.00',
            fechaCreacion: '04-Agosto-2024',
            fechaActualizacion: '08-Agosto-2024'
          },
          {
            nombre: 'BCAA',
            marca: 'Sport',
            precio: '520.00',
            fechaCreacion: '05-Agosto-2024',
            fechaActualizacion: '08-Agosto-2024'
          },
          {
            nombre: 'Pre-entrenador',
            marca: 'Train',
            precio: '400.00',
            fechaCreacion: '06-Agosto-2024',
            fechaActualizacion: '08-Agosto-2024'
          },
          {
            nombre: 'Multivitamínico',
            marca: 'BodyCrunch',
            precio: '200.00',
            fechaCreacion: '03-Agosto-2024',
            fechaActualizacion: '08-Agosto-2024'
          },
          {
            nombre: 'Proteína Vegana',
            marca: 'GreenProtein',
            precio: '620.00',
            fechaCreacion: '03-Agosto-2024',
            fechaActualizacion: '08-Agosto-2024'
          }
        ]
      };
    },
    methods: {
      comprarProducto(producto) {
        // Lógica para comprar el producto
        alert(`Producto comprado: ${producto.nombre}`);
      }
    }
  }
  </script>
  
  <style scoped>
  /* Estilos personalizados */
  </style>
  