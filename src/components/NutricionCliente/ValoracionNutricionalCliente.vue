<template>
    <main class="min-h-[90%]">
        <div class="mx-auto p-5 bg-white shadow-lg rounded-lg w-full">
        <h2 class="text-2xl font-bold mb-5">Cuestionario de Nutrición</h2>
        <form @submit.prevent="submitForm">
            <!-- Pregunta 1: Nombre -->
            <div class="mb-4">
                <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
                <input type="text" v-model="form.name" id="name" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
            </div>

            <!-- Pregunta 2: Edad -->
            <div class="mb-4">
                <label for="age" class="block text-sm font-medium text-gray-700">Edad</label>
                <input type="number" v-model="form.age" id="age" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
            </div>

            <!-- Pregunta 3: Género -->
            <div class="mb-4">
                <label for="gender" class="block text-sm font-medium text-gray-700">Género</label>
                <select v-model="form.gender" id="gender" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option value="" disabled>Seleccione su género</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                </select>
            </div>

            <!-- Pregunta 4: Frecuencia de comidas al día -->
            <div class="mb-4">
                <label for="mealsPerDay" class="block text-sm font-medium text-gray-700">¿Cuántas comidas realiza al día?</label>
                <input type="number" v-model="form.mealsPerDay" id="mealsPerDay" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
            </div>

            <!-- Pregunta 5: Tipo de alimentación -->
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">Tipo de alimentación</label>
                <div class="mt-2 space-y-2">
                    <div class="flex items-center">
                        <input type="radio" id="omnivoro" value="Omnívoro" v-model="form.dietType" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label for="omnivoro" class="ml-3 block text-sm text-gray-700">Omnívoro</label>
                    </div>
                    <div class="flex items-center">
                        <input type="radio" id="vegetariano" value="Vegetariano" v-model="form.dietType" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label for="vegetariano" class="ml-3 block text-sm text-gray-700">Vegetariano</label>
                    </div>
                    <div class="flex items-center">
                        <input type="radio" id="vegano" value="Vegano" v-model="form.dietType" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label for="vegano" class="ml-3 block text-sm text-gray-700">Vegano</label>
                    </div>
                </div>
            </div>

            <!-- Pregunta 6: Consumo de agua diario -->
            <div class="mb-4">
                <label for="waterIntake" class="block text-sm font-medium text-gray-700">¿Cuántos litros de agua consume al día?</label>
                <input type="number" step="0.1" v-model="form.waterIntake" id="waterIntake" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
            </div>

            <!-- Pregunta 7: Alergias o restricciones alimentarias -->
            <div class="mb-4">
                <label for="allergies" class="block text-sm font-medium text-gray-700">¿Tiene alguna alergia o restricción alimentaria?</label>
                <textarea v-model="form.allergies" id="allergies" rows="3" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Especifique si tiene alguna alergia o restricción"></textarea>
            </div>

            <!-- Botón de enviar -->
            <div class="mb-4">
                <button type="submit" class="w-full bg-red-600 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Enviar</button>
            </div>
        </form>
    </div>
    </main>
    
</template>

<script>
export default {
    data() {
        return {
            form: {
                name: '',
                age: null,
                gender: '',
                mealsPerDay: null,
                dietType: '',
                waterIntake: null,
                allergies: ''
            }
        };
    },
    methods: {
        submitForm() {
            // Aquí puedes manejar la lógica para enviar el formulario
            console.log('Formulario enviado:', this.form);
            // Puedes resetear el formulario si lo deseas
            this.resetForm();
        },
        resetForm() {
            this.form = {
                name: '',
                age: null,
                gender: '',
                mealsPerDay: null,
                dietType: '',
                waterIntake: null,
                allergies: ''
            };
        }
    }
};
</script>
