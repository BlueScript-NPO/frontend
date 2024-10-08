export default defineAppConfig({
  ui: {
    primary: "blueScriptBlue",
    gray: "zinc",

    variables: {
      light: {
        background: "255 255 255",
        foreground: "var(--color-gray-700)",
      },
      dark: {
        background: "var(--color-gray-950)",
        foreground: "var(--color-gray-200)",
      },
    },

    card: {
      background: "bg-white dark:bg-zinc-950",
    },

    button: {
      rounded: "rounded-full",
      default: {
        size: "md",
        color: "black",
      },
    },

    kbd: {
      background: "bg-slate-100 dark:bg-slate-800",
      ring: "ring-1 ring-slate-200 dark:ring-slate-800 ring-inset",
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
      color: {
        white: {
          outline: "dark:bg-gray-950",
        },
      },
    },

    select: {
      rounded: "rounded-full",
      default: {
        size: "md",
      },
      color: {
        white: {
          outline: "dark:bg-gray-950",
        },
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
        icon: {
          open: "i-ph-list",
          close: "i-ph-x",
        },
      },
    },
    commandPalette: {
      default: {
        icon: "i-ph-magnifying-glass",
        loadingIcon: "i-svg-spinners-90-ring",
        selectedIcon: "i-ph-check",
        emptyState: {
          icon: "i-ph-magnifying-glass",
        },
      },
    },
    accordion: {
      default: {
        openIcon: "i-ph-caret-down",
      },
    },
    breadcrumb: {
      default: {
        divider: "i-ph-caret-right",
      },
    },
    icons: {
      dark: "i-ph-moon",
      light: "i-ph-sun",
      system: "i-ph-monitor",
      search: "i-ph-magnifying-glass",
      external: "i-ph-arrow-square-out",
      chevron: "i-ph-caret-down",
      hash: "i-ph-hash",
      menu: "i-ph-list",
      close: "i-ph-x",
      check: "i-ph-check",
    },
  },

  content: {
    prose: {
      code: {
        button: {
          icon: {
            copy: "i-ph-copy-duotone",
            copied: "i-ph-check-square-duotone",
          },
        },
      },
    },
  },
});
