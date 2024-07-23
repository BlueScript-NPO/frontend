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

    buttonGroup: {
      rounded: "rounded-full",
    },

    table: {
      tr: {
        base: "",
        selected: "bg-gray-50 dark:bg-gray-800/50",
        active: "hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer",
      },
      th: {
        base: "text-left rtl:text-right",
        padding: "px-4 py-2",
        color: "text-gray-900 dark:text-white",
        font: "font-normal",
        size: "text-sm",
      },
      td: {
        base: "whitespace-nowrap",
        padding: "px-4 py-2",
        color: "text-gray-600 dark:text-gray-300",
        font: "font-normal",
        size: "text-sm",
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

    textarea: {
      color: {
        gray: {
          outline: "ring-1 ring-gray-200 dark:ring-gray-800",
        },
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
