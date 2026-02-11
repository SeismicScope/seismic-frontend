import { addons } from "storybook/manager-api";
import {
  defaultConfig,
  type TagBadgeParameters,
} from "storybook-addon-tag-badges/manager-helpers";

import Theme from "./theme";

const baseStyles = {
  borderRadius: "4px",
  fontWeight: "600",
  fontSize: "9px",
  padding: "2px 4px",
};

addons.setConfig({
  theme: Theme,
  tagBadges: [
    {
      tags: "stage-0",
      badge: {
        text: "Stage 0",
        style: {
          backgroundColor: "#e9eaeb", // ds-ocean-200
          color: "#414651", // ds-ocean-700
          ...baseStyles,
        },
        tooltip:
          "Component exists in Storybook, but no stories have been created yet",
      },
    },
    {
      tags: "stage-1",
      badge: {
        text: "Stage 1",
        style: {
          backgroundColor: "#fcdbad", // ds-mango-100
          color: "#8d4900", // ds-mango-800
          ...baseStyles,
        },
        tooltip: "Stories have been added, demonstrating usage and props",
      },
    },
    {
      tags: "stage-2",
      badge: {
        text: "Stage 2",
        style: {
          backgroundColor: "#a1f9c7", // ds-pickle-100
          color: "#00843d", // ds-pickle-800
          ...baseStyles,
        },
        tooltip:
          "Component is fully aligned with the Design System, including styles, tokens, and naming conventions",
      },
    },
    {
      tags: "in-progress",
      badge: {
        text: "In Progress",
        style: {
          backgroundColor: "#e9d3ff", // ds-iris-100
          color: "#741fad", // ds-iris-700
          ...baseStyles,
        },
        tooltip:
          "Component has been added or is under redesign; it may not fully comply with the Design System yet",
      },
    },
    {
      tags: "legacy",
      badge: {
        text: "Legacy",
        style: {
          backgroundColor: "#fcb4b6", // ds-tomato-100
          color: "#a30003", // ds-tomato-700
          ...baseStyles,
        },
        tooltip:
          "Deprecated or legacy components that may be replaced or removed in the future",
      },
    },
    ...defaultConfig,
  ] satisfies TagBadgeParameters,
});
