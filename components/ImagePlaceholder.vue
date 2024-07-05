<template>
  <div class="relative">
    <div class="bg-background border-gradient rounded-xl p-2 sm:p-4">
      <div
        class="aspect-w-16 aspect-h-9 rounded-lg relative overflow-hidden border border-dashed border-gray-950/10 dark:border-white/10"
      >
        <img src="~/assets/hero.png" alt="BlueScript demo hero image" />
      </div>
    </div>
  </div>
</template>

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
    animation: 10s rotate linear infinite;
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
</style>
