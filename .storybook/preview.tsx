import "../src/app/globals.css";

import type { Preview } from "@storybook/nextjs-vite";

const preview: Preview = {
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
