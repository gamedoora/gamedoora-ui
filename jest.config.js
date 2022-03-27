module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  transform: {
    "^.+\\.vue$": "vue-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!(bootstrap-vue)/)"],
  testPathIgnorePatterns: [
    "/build/",
    "/config/",
    "/data/",
    "/dist/",
    "/node_modules/",
    "/test/",
    "/vendor/",
  ],
};
