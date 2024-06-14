<template>
  <div class="fixed inset-0 bg-black h-screen w-screen overflow-hidden">
    <div
      v-for="char in chars"
      :key="char.id"
      class="bouncing-char text-red-500 text-8xl font-mono"
      :style="char.style"
    >
      {{ char.value }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, defineProps } from "vue";

const props = defineProps({
  charCount: {
    type: Number,
    required: true,
  },
});

const chars = ref(
  Array.from({ length: props.charCount }, () => ({
    id: Math.random().toString(36).substr(2, 9),
    value: String.fromCharCode(65 + Math.floor(Math.random() * 26)), // Random uppercase letter
    style: {
      top: `${Math.random() * 80}%`,
      left: `${Math.random() * 80}%`,
      animationDuration: `${2 + Math.random() * 3}s`,
    },
  }))
);

const updatePosition = (charId: string) => {
  chars.value = chars.value.map((char) =>
    char.id === charId
      ? {
          ...char,
          style: {
            ...char.style,
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 80}%`,
          },
        }
      : char
  );
};

onMounted(() => {
  chars.value.forEach((char) => {
    setInterval(() => updatePosition(char.id), 500 + Math.random() * 1500);
  });
});

watch(
  () => props.charCount,
  (newCount) => {
    chars.value = Array.from({ length: newCount }, () => ({
      id: Math.random().toString(36).substr(2, 9),
      value: String.fromCharCode(65 + Math.floor(Math.random() * 26)), // Random uppercase letter
      style: {
        top: `${Math.random() * 80}%`,
        left: `${Math.random() * 80}%`,
        animationDuration: `${2 + Math.random() * 3}s`,
      },
    }));
  }
);
</script>

<style scoped>
.bouncing-char {
  position: absolute;
  animation: rotate 2s infinite linear;
  transition: top 1.5s, left 1.5s;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
