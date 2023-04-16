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
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  ignorePatterns: ["!.eslintrc.js", "!.prettierrc.json"],
  rules: {
    "prettier/prettier": "error",
  },
};
