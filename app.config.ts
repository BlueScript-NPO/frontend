export default defineAppConfig({
  ui: {
    primary: "blueScriptBlue",
    gray: "zinc",

    button: {
      rounded: "rounded-full",
      default: {
        size: "md",
        color: "black",
      },
    },

    input: {
      rounded: "rounded-full",
      default: {
        size: "md",
      },
    },

    select: {
      rounded: "rounded-full",
      default: {
        size: "md",
      },
    },

    header: {
      wrapper: "border-none backdrop-blur-lg",

      links: {
        wrapper:
          "ring-1 ring-gray-300 dark:ring-gray-700 px-3 gap-x-0 rounded-full",
        base: "py-2 px-4 font-medium transition-colors relative after:absolute after:-bottom-px after:inset-x-2 after:h-px after:rounded-full after:opacity-0 after:bg-gray-900 dark:after:bg-white after:transition-opacity",
        active: "text-gray-900 dark:text-white after:opacity-100",
        inactive:
          "text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100",
      },

      left: "sm:flex-1",
      right: "sm:flex-1",
      panel: {
        wrapper: "sm:hidden",
      },

      button: {
        base: "sm:hidden",
      },
    },
  },
});
