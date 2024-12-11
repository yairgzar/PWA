<template>
    <div>
      <h1 class="text-2xl xl:text-3xl font-extrabold mb-6">Promociones de Productos de Gimnasio</h1>
  
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div v-for="promocion in promociones" :key="promocion.nombre" class="border p-4 rounded-lg shadow-md">
          <h2 class="text-xl font-bold">{{ promocion.nombre }}</h2>
          <p class="text-gray-700">Marca: {{ promocion.marca }}</p>
          <p class="text-gray-700">Precio: ${{ promocion.precio }}</p>
          <p class="text-gray-700">Tipo: {{ promocion.tipo }}</p>
          <p class="text-gray-500 text-sm">Fecha de Creación: {{ promocion.fechaCreacion }}</p>
          <button
            class="mt-4 tracking-wide font-semibold bg-blue-700 text-gray-100 w-full py-2 rounded-lg hover:bg-blue-900 transition-all duration-300 ease-in-out flex items-center justify-center"
            @click="comprarPromocion(promocion.nombre)"
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        promociones: [
          { nombre: "Mancuernas Ajustables", marca: "Bowflex", precio: 249.99, tipo: "Equipo", fechaCreacion: "2024-05-01" },
          { nombre: "Bicicleta Estática", marca: "Schwinn", precio: 799.99, tipo: "Equipo", fechaCreacion: "2024-06-15" },
          { nombre: "Banco de Pesas", marca: "Rogue", precio: 399.99, tipo: "Equipo", fechaCreacion: "2024-07-10" },
          { nombre: "Cuerda para Saltar", marca: "Crossrope", precio: 49.99, tipo: "Accesorio", fechaCreacion: "2024-03-20" },
          { nombre: "Rodillo de Espuma", marca: "TriggerPoint", precio: 34.99, tipo: "Accesorio", fechaCreacion: "2024-02-28" },
          { nombre: "Balón Medicinal", marca: "Dynamax", precio: 89.99, tipo: "Accesorio", fechaCreacion: "2024-04-18" },
          { nombre: "Colchoneta de Yoga", marca: "Manduka", precio: 79.99, tipo: "Accesorio", fechaCreacion: "2024-01-25" },
          { nombre: "Guantes de Entrenamiento", marca: "Nike", precio: 29.99, tipo: "Accesorio", fechaCreacion: "2024-06-01" },
          { nombre: "Barra Olímpica", marca: "Rogue", precio: 299.99, tipo: "Equipo", fechaCreacion: "2024-03-05" },
          { nombre: "Chaleco con Pesas", marca: "Hyperwear", precio: 159.99, tipo: "Accesorio", fechaCreacion: "2024-07-22" }
        ]
      };
    },
    methods: {
      comprarPromocion(nombre) {
        alert(`Has seleccionado comprar: ${nombre}`);
      }
    }
  };
  </script>
  