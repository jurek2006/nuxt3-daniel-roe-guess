<script setup lang="ts">
const { state, submitGuess } = useGameState();
</script>

<template>
  <section>
    <h2>Playing game now</h2>
    <game-board :state="state" />
    <guess-form @guess="submitGuess" />
  </section>
</template>
