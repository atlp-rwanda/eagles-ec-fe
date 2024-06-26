module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.eslint.json",
    tsconfigRootDir: __dirname
  },
  plugins: ["react-refresh"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "off",
    "react/require-default-props": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "react/button-has-type": "off",
    "no-param-reassign": "off",
    "react/prop-types": "off",
    "import/no-extraneous-dependencies": "off",
    "no-nested-ternary": "off",
    "import/prefer-default-export": "off",
    "no-return-assign": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "react/function-component-definition": [
      "warn",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "no-console": "off",
    "no-undef": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "react/no-unescaped-entities": "off",
    '@typescript-eslint/no-explicit-any': 0,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/quotes": ["off"],
    "arrow-body-style": ["warn", "as-needed"],
    "import/order": [
      "warn",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always",
      },
    ],
    "@typescript-eslint/comma-dangle": ["warn", "always-multiline"],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "vite.config.ts",
          "postcss.config.js",
          "tailwind.config.js",
        ],
      },
    ],
    "import/extensions": ["off"],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};