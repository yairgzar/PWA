<template>
    <table class="w-full mt-8 bg-white shadow-md rounded-lg overflow-hidden ">
        <thead class="bg-gray-800 text-white ">
            <tr>
                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Fotografía</th>
                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Persona_id</th>
                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Años de Experiencia</th>
                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Especialidad</th>
                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Clientes Atendidos</th>
                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Estatus</th>
                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Calificación</th>
                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Acciones</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
            <tr v-for="instructor in instructores" :key="instructor.id">
                <td class="px-6 py-4 whitespace-nowrap">
                    <img :src="instructor.fotografia" alt="Foto del instructor" class="w-12 h-12 rounded-full object-cover">
                </td>
                <td class="px-6 py-4 whitespace-nowrap">{{ instructor.Persona_id }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ instructor.total_anios_experiencia }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ instructor.especialidad }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ instructor.total_clientes_atendidos }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="instructor.estatus === 'Activo' ? 'text-green-600' : 'text-red-600'">
                        {{ instructor.estatus }}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">{{ instructor.calificacion.toFixed(1) }}</td>
                <td class="px-6 py-4 whitespace-nowrap flex space-x-2">
                    <button class="px-4 py-2 text-white bg-green-800 rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out">Editar</button>
                    <button class="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150 ease-in-out">Eliminar</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    data() {
        return {
            instructores: [
                {
                    id: '1',
                    fotografia: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                    total_anios_experiencia: 5,
                    especialidad: 'Yoga',
                    total_clientes_atendidos: 120,
                    estatus: 'Activo',
                    calificacion: 4.8
                },
                {
                id: '2',
                fotografia: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                total_anios_experiencia: 8,
                especialidad: 'CrossFit',
                total_clientes_atendidos: 200,
                estatus: 'Inactivo',
                calificacion: 4.6
            },
            {
                id: '3',
                fotografia: 'https://images.unsplash.com/photo-1600218325161-64f9e6ed0d1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyNTgwNjR8MHwxfGFsbHwxfHx8fHx8fHwyNTUyMzEzOTk&ixlib=rb-1.2.1&q=80&w=400',
                total_anios_experiencia: 6,
                especialidad: 'Pilates',
                total_clientes_atendidos: 150,
                estatus: 'Activo',
                calificacion: 4.7
            },
            {
                id: '4',
                fotografia: 'https://images.unsplash.com/photo-1516958540082-bbbf134e07e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyNTgwNjR8MHwxfGFsbHwxfHx8fHx8fHwyNTUyMzEzOTk&ixlib=rb-1.2.1&q=80&w=400',
                total_anios_experiencia: 10,
                especialidad: 'Boxeo',
                total_clientes_atendidos: 300,
                estatus: 'Activo',
                calificacion: 4.9
            },
            {
                id: '5',
                fotografia: 'https://images.unsplash.com/photo-1555404825-eac6a22b2a91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyNTgwNjR8MHwxfGFsbHwxfHx8fHx8fHwyNTUyMzEzOTk&ixlib=rb-1.2.1&q=80&w=400',
                total_anios_experiencia: 7,
                especialidad: 'Entrenamiento Funcional',
                total_clientes_atendidos: 180,
                estatus: 'Inactivo',
                calificacion: 4.5
            }
            ]
        };
    }
};
</script>
