module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:node/recommended",
    "plugin:prettier/recommended",
    "eslint-config-node",
  ],
  plugins: ["prettier", "node"],
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    requireConfigFile: false,
  },
  ignorePatterns: ["!.eslintrc.js", "!.prettierrc.json"],
  rules: {
    "prettier/prettier": "error",
  },
};
