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
      base: "focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-75 flex-shrink-0",
      font: "font-medium",
      rounded: "rounded-md",
      truncate: "text-left break-all line-clamp-1",
      block: "w-full flex justify-center items-center",
      inline: "inline-flex items-center",
      size: {
        default: "h-10 px-4 py-2",
        "2xs": "text-xs",
        xs: "text-xs",
        sm: "h-9 rounded-md px-3 text-sm",
        md: "text-sm",
        lg: "h-11 rounded-md px-8 text-sm",
        xl: "text-base",
      },
      gap: {
        "2xs": "gap-x-1",
        xs: "gap-x-1.5",
        sm: "gap-x-1.5",
        md: "gap-x-2",
        lg: "gap-x-2.5",
        xl: "gap-x-2.5",
      },
      padding: {
        "2xs": "px-2 py-1",
        xs: "px-2.5 py-1.5",
        sm: "px-2.5 py-1.5",
        md: "px-3 py-2",
        lg: "px-3.5 py-2.5",
        xl: "px-3.5 py-2.5",
      },
      square: {
        "2xs": "p-1.5",
        xs: "p-2",
        sm: "p-2",
        md: "p-2.5",
        lg: "p-3",
        xl: "p-3",
      },
      color: {
        gray: {
          solid:
            "shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-700 dark:text-gray-200 bg-gray-50 hover:bg-gray-100 disabled:bg-gray-50 aria-disabled:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700/50 dark:disabled:bg-gray-800 dark:aria-disabled:bg-gray-800 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
          ghost:
            "text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
          link: "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline-offset-4 hover:underline focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
        },
        black: {
          solid:
            "shadow-sm text-white dark:text-gray-900 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-900 aria-disabled:bg-gray-900 dark:bg-white dark:hover:bg-gray-100 dark:disabled:bg-white dark:aria-disabled:bg-white focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
          link: "text-gray-900 dark:text-white underline-offset-4 hover:underline focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
        },
      },
      variant: {
        solid:
          "shadow-sm text-white dark:text-white-900 bg-{color}-500 hover:bg-{color}-600 disabled:bg-{color}-500 aria-disabled:bg-{color}-500 dark:bg-{color}-500 dark:hover:bg-{color}-600 dark:disabled:bg-{color}-400 dark:aria-disabled:bg-{color}-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-{color}-500 dark:focus-visible:outline-{color}-400",
        outline:
          "ring-1 ring-inset ring-current text-{color}-500 dark:text-{color}-400 hover:bg-{color}-50 disabled:bg-transparent aria-disabled:bg-transparent dark:hover:bg-{color}-950 dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400",
        soft: "text-{color}-500 dark:text-{color}-400 bg-{color}-50 hover:bg-{color}-100 disabled:bg-{color}-50 aria-disabled:bg-{color}-50 dark:bg-{color}-950 dark:hover:bg-{color}-900 dark:disabled:bg-{color}-950 dark:aria-disabled:bg-{color}-950 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400",
        ghost:
          "text-{color}-500 dark:text-{color}-400 hover:bg-{color}-50 disabled:bg-transparent aria-disabled:bg-transparent dark:hover:bg-{color}-950 dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400",
        link: "text-{color}-500 hover:text-{color}-600 disabled:text-{color}-500 aria-disabled:text-{color}-500 dark:text-{color}-400 dark:hover:text-{color}-500 dark:disabled:text-{color}-400 dark:aria-disabled:text-{color}-400 underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400",
      },
      icon: {
        base: "flex-shrink-0",
        loading: "animate-spin",
        size: {
          "2xs": "h-4 w-4",
          xs: "h-4 w-4",
          sm: "h-5 w-5",
          md: "h-5 w-5",
          lg: "h-5 w-5",
          xl: "h-6 w-6",
        },
      },
      default: {
        size: "sm",
        variant: "solid",
        color: "black",
        loadingIcon: "i-heroicons-arrow-path-20-solid",
      },
    },

    color: {
      white: {
        solid:
          "shadow ring-1 ring-inset ring-gray-400 dark:ring-gray-700 text-gray-900 dark:text-white bg-white hover:bg-gray-50 disabled:bg-white aria-disabled:bg-white dark:bg-gray-900 dark:hover:bg-gray-800/50 dark:disabled:bg-gray-900 dark:aria-disabled:bg-gray-900 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
        ghost:
          "text-gray-900 dark:text-white hover:bg-white dark:hover:bg-gray-900 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
      },
    },

    kbd: {
      background: "bg-slate-100 dark:bg-slate-800",
      ring: "ring-1 ring-slate-200 dark:ring-slate-800 ring-inset",
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
      wrapper: "relative",
      base: "relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0",
      form: "form-input",
      rounded: "rounded-md",
      placeholder:
        "placeholder:text-muted-foreground dark:placeholder-gray-500",
      file: {
        base: "file:mr-1.5 file:font-medium file:text-gray-500 dark:file:text-gray-400 file:bg-transparent file:border-0 file:p-0 file:outline-none",
      },
      size: {
        default: "h-10 px-3 py-2 text-sm",
        "2xs": "text-xs",
        xs: "text-xs",
        sm: "text-sm",
        md: "text-sm",
        lg: "text-sm",
        xl: "text-base",
      },
      gap: {
        "2xs": "gap-x-1",
        xs: "gap-x-1.5",
        sm: "gap-x-1.5",
        md: "gap-x-2",
        lg: "gap-x-2.5",
        xl: "gap-x-2.5",
      },
      padding: {
        "2xs": "px-2 py-1",
        xs: "px-2.5 py-1.5",
        sm: "px-2.5 py-1.5",
        md: "px-3 py-2",
        lg: "px-3.5 py-2.5",
        xl: "px-3.5 py-2.5",
      },
      leading: {
        padding: {
          "2xs": "ps-7",
          xs: "ps-8",
          sm: "ps-9",
          md: "ps-10",
          lg: "ps-11",
          xl: "ps-12",
        },
      },
      trailing: {
        padding: {
          "2xs": "pe-7",
          xs: "pe-8",
          sm: "pe-9",
          md: "pe-10",
          lg: "pe-11",
          xl: "pe-12",
        },
      },
      color: {
        white: {
          outline:
            "shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400",
        },
        gray: {
          outline:
            "shadow-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400",
        },
      },
      variant: {
        outline:
          "shadow-sm bg-transparent text-gray-900 dark:text-white ring-1 ring-inset ring-{color}-500 dark:ring-{color}-400 focus:ring-2 focus:ring-{color}-500 dark:focus:ring-{color}-400",
        none: "bg-transparent focus:ring-0 focus:shadow-none",
      },
      icon: {
        base: "flex-shrink-0 text-gray-400 dark:text-gray-500",
        color: "text-{color}-500 dark:text-{color}-400",
        loading: "animate-spin",
        size: {
          "2xs": "h-4 w-4",
          xs: "h-4 w-4",
          sm: "h-5 w-5",
          md: "h-5 w-5",
          lg: "h-5 w-5",
          xl: "h-6 w-6",
        },
        leading: {
          wrapper: "absolute inset-y-0 start-0 flex items-center",
          pointer: "pointer-events-none",
          padding: {
            "2xs": "px-2",
            xs: "px-2.5",
            sm: "px-2.5",
            md: "px-3",
            lg: "px-3.5",
            xl: "px-3.5",
          },
        },
        trailing: {
          wrapper: "absolute inset-y-0 end-0 flex items-center",
          pointer: "pointer-events-none",
          padding: {
            "2xs": "px-2",
            xs: "px-2.5",
            sm: "px-2.5",
            md: "px-3",
            lg: "px-3.5",
            xl: "px-3.5",
          },
        },
      },
      default: {
        size: "sm",
        color: "white",
        variant: "outline",
        loadingIcon: "i-heroicons-arrow-path-20-solid",
      },
    },

    select: {
      rounded: "rounded-md",
    },

    selectMenu: {
      container: "z-20 group",
      trigger: "flex items-center w-full",
      width: "w-full",
      height: "max-h-60",
      base: "relative focus:outline-none overflow-y-auto scroll-py-1",
      background: "bg-white dark:bg-gray-800",
      shadow: "shadow-lg",
      rounded: "rounded-md",
      padding: "p-1",
      ring: "ring-1 ring-gray-200 dark:ring-gray-700",
      empty: "text-sm text-gray-400 dark:text-gray-500 px-2 py-1.5",
      option: {
        base: "cursor-default select-none relative flex items-center justify-between gap-1",
        rounded: "rounded-md",
        padding: "px-1.5 py-1.5",
        size: "text-sm",
        color: "text-gray-900 dark:text-white",
        container: "flex items-center gap-1.5 min-w-0",
        active: "bg-gray-100 dark:bg-gray-900",
        inactive: "",
        selected: "pe-7",
        disabled: "cursor-not-allowed opacity-50",
        empty: "text-sm text-gray-400 dark:text-gray-500 px-2 py-1.5",
        icon: {
          base: "flex-shrink-0 h-5 w-5",
          active: "text-gray-900 dark:text-white",
          inactive: "text-gray-400 dark:text-gray-500",
        },
        selectedIcon: {
          wrapper: "absolute inset-y-0 end-0 flex items-center",
          padding: "pe-2",
          base: "h-5 w-5 text-gray-900 dark:text-white flex-shrink-0",
        },
        avatar: {
          base: "flex-shrink-0",
          size: "2xs",
        },
        chip: {
          base: "flex-shrink-0 w-2 h-2 mx-1 rounded-full",
        },
        create: "block truncate",
      },
      transition: {
        leaveActiveClass: "transition ease-in duration-100",
        leaveFromClass: "opacity-100",
        leaveToClass: "opacity-0",
      },
      popper: {
        placement: "bottom-end",
      },
      default: {
        selectedIcon: "i-heroicons-check-20-solid",
        clearSearchOnClose: false,
        showCreateOptionWhen: "empty",
      },
      arrow: {
        base: "invisible before:visible before:block before:rotate-45 before:z-[-1] before:w-2 before:h-2",
        ring: "before:ring-1 before:ring-gray-200 dark:before:ring-gray-700",
        rounded: "before:rounded-sm",
        background: "before:bg-white dark:before:bg-gray-700",
        shadow: "before:shadow",
        placement:
          "group-data-[popper-placement*='right']:-left-1 group-data-[popper-placement*='left']:-right-1 group-data-[popper-placement*='top']:-bottom-1 group-data-[popper-placement*='bottom']:-top-1",
      },
      select: "inline-flex items-center text-left cursor-default",
      input:
        "block w-[calc(100%+0.5rem)] focus:ring-transparent text-sm px-3 py-1.5 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border-0 border-b border-gray-200 dark:border-gray-700 sticky -top-1 -mt-1 mb-1 -mx-1 z-10 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none",
      required: "absolute inset-0 w-px opacity-0 cursor-default",
      label: "block truncate",
    },

    textarea: {
      color: {
        gray: {
          outline: "ring-1 ring-gray-200 dark:ring-gray-800",
        },
      },
    },

    header: {
      wrapper: "backdrop-blur-lg border-b dark:border-gray-800",
      container: "h-14",
      links: {
        wrapper: "px-3 gap-x-0",
        base: "font-medium py-2 px-4 transition-colors relative after:absolute",
        active: "text-primary-500 dark:text-primary-400 after:opacity-100",
        inactive:
          "text-gray-500 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100",
      },

      left: "sm:flex-1",
      right: "sm:flex-1",

      panel: {
        wrapper: "lg:hidden hover:block",
      },

      button: {
        base: "lg:hidden",
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
    tabs: {
      wrapper: "relative space-y-2",
      container: "relative w-full",
      base: "focus:outline-none",
      list: {
        base: "relative",
        background: "bg-gray-100 dark:bg-gray-800",
        rounded: "rounded-lg",
        shadow: "",
        padding: "p-1",
        height: "h-10",
        width: "w-full",
        marker: {
          wrapper:
            "absolute top-[4px] left-[4px] duration-200 ease-out focus:outline-none",
          base: "w-full h-full",
          background: "bg-white dark:bg-gray-950",
          rounded: "rounded-md",
          shadow: "shadow-sm",
        },
        tab: {
          base: "relative inline-flex items-center justify-center flex-shrink-0 w-full ui-focus-visible:outline-0 ui-focus-visible:ring-2 ui-focus-visible:ring-primary-500 dark:ui-focus-visible:ring-primary-400 ui-not-focus-visible:outline-none focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 transition-colors duration-200 ease-out",
          background: "",
          active: "text-gray-900 dark:text-white",
          inactive: "text-gray-500 dark:text-gray-400",
          height: "h-8",
          padding: "px-3",
          size: "text-sm",
          font: "font-medium",
          rounded: "rounded-md",
          shadow: "",
          icon: "w-4 h-4 flex-shrink-0 me-2",
        },
      },
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
