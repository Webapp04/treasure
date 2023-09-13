module.exports = {
  stories: ["../src/**/*.stories.jsx"],
  addons: [
    "@storybook/addon-controls",
    "@storybook/preset-create-react-app",
    "@storybook/addon-backgrounds",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  parameters: {
    backgrounds: {
      default: "dark",
      values: [
        {
          name: "dark",
          value: "rgba(8, 15, 32, 1) !important",
        },
        // Add more backgrounds as needed
      ],
    },
  },
};
