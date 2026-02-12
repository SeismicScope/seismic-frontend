import "../src/app/globals.css";
import "./preview.css";

import type { Preview } from "@storybook/nextjs-vite";

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Dark / Light mode",
      toolbar: {
        title: "Mode",
        icon: "moon",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
    colorTheme: {
      description: "Color accent theme",
      toolbar: {
        title: "Color",
        icon: "paintbrush",
        items: [
          { value: "teal", title: "Teal" },
          { value: "mango", title: "Mango" },
          { value: "tomato", title: "Tomato" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
    colorTheme: "teal",
  },
  decorators: [
    (Story, context) => {
      const mode = context.globals.theme || "light";
      const color = context.globals.colorTheme || "teal";

      document.documentElement.classList.toggle("dark", mode === "dark");
      document.documentElement.setAttribute("data-theme", color);

      return <Story />;
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        method: "alphabetical",
        order: [
          "Introduction",
          "Design System",
          [
            "Color System Overview",
            "1. Core Colors",
            "2. Theme Tokens",
            "3. Mode Tokens",
            "Typography - Inter",
            "Other Styles",
            "*",
          ],
          "Components",
          ["*"],
          "Features",
          ["*"],
        ],
        locales: "en-US",
      },
    },
  },
  tags: ["autodocs"],
};

export default preview;
