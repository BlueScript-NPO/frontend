<template>
  <div class="relative">
    <div class="bg-background border-gradient rounded-xl p-2 sm:p-4 h-full">
      <div
        class="rounded-lg relative overflow-hidden border border-dashed border-gray-950/10 dark:border-white/10 h-full flex justify-center items-center"
      >
        <div ref="scalingContainer" class="scaling-container">
          <div ref="demoWrapper" class="demo-wrapper">
            <CharacterSequencingDemo />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from "vue";

const scalingContainer = ref(null);
const demoWrapper = ref(null);

const maxWidth = 862;
const maxHeight = 470;

const calculateScale = () => {
  if (scalingContainer.value && demoWrapper.value) {
    const parentWidth = scalingContainer.value.clientWidth;
    const parentHeight = scalingContainer.value.clientHeight;

    const widthScale = parentWidth / maxWidth;
    const heightScale = parentHeight / maxHeight;

    const scale = Math.min(widthScale, heightScale, 1); // Ensure scale doesn't exceed 1

    demoWrapper.value.style.transform = `scale(${scale})`;
    demoWrapper.value.style.transformOrigin = "top left";
  }
};

onMounted(() => {
  calculateScale();
  window.addEventListener("resize", calculateScale);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", calculateScale);
});
</script>

<style scoped>
.border-gradient:after {
  --angle: 0deg;
  --border-color: rgb(var(--color-gray-300));
  --highlight-color: rgb(var(--color-primary-500));

  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: -1px;
  opacity: 0.5;
  border-radius: 0.8rem;
  z-index: -1;
  background: var(--border-color);

  @supports (background: paint(houdini)) {
    background: linear-gradient(
      var(--angle),
      var(--border-color),
      var(--border-color),
      var(--border-color),
      var(--border-color),
      var(--highlight-color)
    );
    animation: rotate 10s linear infinite;
  }
}

.dark .border-gradient:after {
  --border-color: rgb(var(--color-gray-700));
  --highlight-color: rgb(var(--color-gray-400));
}

@keyframes rotate {
  to {
    --angle: 360deg;
  }
}

@property --angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

/* Scaling Styles */
.scaling-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.demo-wrapper {
  width: 862px;
  height: 470px;
  /* Optional: To center the scaled content */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
