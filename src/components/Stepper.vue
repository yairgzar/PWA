<template>
  <div>
    <!-- Indicadores de Paso -->
    <div class="flex justify-between mb-6">
      <div v-for="(step, index) in steps" :key="index" class="flex items-center">
        <div :class="{'bg-blue-500': currentStep === index, 'bg-gray-300': currentStep !== index}"
             class="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold">
          {{ index + 1 }}
        </div>
        <span :class="{'text-blue-500': currentStep === index, 'text-gray-500': currentStep !== index}"
              class="ml-2">{{ step }}</span>
      </div>
    </div>

    <!-- Contenido del Paso Actual -->
    <slot :currentStep="currentStep" ></slot>

    <!-- Botones de Navegación -->
    <div class="flex justify-between mt-2">
      <button @click="prevStep" :disabled="currentStep === 0" class="bg-gray-500 text-white px-4 py-2 rounded">
        Anterior
      </button>
      <button @click="nextStep" :disabled="currentStep === steps.length - 1" class="bg-blue-500 text-white px-4 py-2 rounded">
        Siguiente
      </button>
      <button @click="submitForm" v-if="currentStep === steps.length - 1" class="bg-green-500 text-white px-4 py-2 rounded">
        Enviar
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    steps: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentStep: 0
    };
  },
  methods: {
    prevStep() {
      if (this.currentStep > 0) {
        this.currentStep--;
      }
    },
    nextStep() {
      if (this.currentStep < this.steps.length - 1) {
        this.currentStep++;
      }
    },
    submitForm() {
      this.$emit('submit');
    }
  }
};
</script>

<style scoped>
/* Aquí puedes añadir estilos personalizados */
</style>
