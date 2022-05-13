<script setup lang="ts">
const emit = defineEmits<{
  (event: "guess", guess: string): void;
}>();
const guess = ref("");
</script>

<template>
  <form @submit.prevent="() => emit('guess', guess)">
    <label
      >Your guess

      <input
        v-model="guess"
        type="text"
        minlength="5"
        maxlength="5"
        class="font-bold uppercase text-black border-2"
      />
      <button type="submit" :disabled="guess.length !== 5">Guess</button>
    </label>
  </form>
</template>
