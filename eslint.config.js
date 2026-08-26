import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import fileProgress from 'eslint-plugin-file-progress'
import packageJsonDependencies from 'eslint-plugin-package-json-dependencies'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfigFlat from 'eslint-config-prettier/flat'
import importX from 'eslint-plugin-import-x'

export default tseslint.config(
  {
    ignores: ['dist/**', 'dev-dist/**', 'node_modules/**', 'public/**', 'tmp/**', 'eslint.config.js'],
  },
  { ...js.configs.recommended, files: ['**/*.{ts,vue}'] },
  ...tseslint.configs.recommendedTypeChecked.map((cfg) => ({ ...cfg, files: ['**/*.{ts,vue}'] })),
  ...tseslint.configs.stylisticTypeChecked.map((cfg) => ({ ...cfg, files: ['**/*.{ts,vue}'] })),
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.{ts,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        extraFileExtensions: ['.vue'],
      },
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: pluginVue.parser,
      parserOptions: {
        parser: tseslint.parser,
        projectService: true,
        extraFileExtensions: ['.vue'],
      },
    },
  },
  {
    files: ['vite.config.ts', 'cli/**/*.ts'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    name: 'progress',
    plugins: {
      progress: fileProgress,
    },
    rules: {
      'progress/activate': 1,
    },
    settings: {
      progress: {
        hide: false,
        hideFileName: false,
        successMessage: 'Lint done...',
      },
    },
  },
  {
    files: ['package.json'],
    languageOptions: {
      parser: packageJsonDependencies,
    },
    plugins: {
      'package-json-dependencies': packageJsonDependencies,
    },
    rules: {
      'package-json-dependencies/controlled-versions': ['error', { granularity: 'fixed' }],
    },
  },
  prettierConfigFlat,
  {
    files: ['**/*.{ts,vue}'],
    plugins: {
      prettier: prettierPlugin,
      'import-x': importX,
    },
    rules: {
      'prettier/prettier': 'error',
      'import-x/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'never',
        },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/prefer-regexp-exec': 'off',
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        { allowNumber: true },
      ],
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: false, variables: true }],

      // Portable subset of @soybeanjs/eslint-config's core JS rules (no eslint:all base).
      // no-mixed-operators skipped - too noisy for this codebase's chart/physics math (a+b*c is not
      // actually ambiguous, and the CLI wizard's linear prompt sequence isn't "bad" complexity).
      complexity: ['error', 35],
      'max-params': ['error', 6],
      'no-nested-ternary': 'off',
      'no-console': 'warn',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-restricted-syntax': ['error', 'DebuggerStatement', 'LabeledStatement', 'WithStatement'],
      'no-self-assign': ['error', { props: true }],
      'no-unneeded-ternary': ['error', { defaultAssignment: false }],
      'object-shorthand': ['error', 'always', { ignoreConstructors: false, avoidQuotes: true }],
      'one-var': ['error', 'never'],
      'prefer-arrow-callback': ['error', { allowNamedFunctions: false, allowUnboundThis: true }],
      'prefer-const': ['error', { destructuring: 'all', ignoreReadBeforeAssign: true }],
      'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],

      // Vue rules from @soybeanjs/eslint-config's Vue block (all native eslint-plugin-vue, no extra deps) -
      // kept as 'warn' as upstream, except two we already run stricter (see below, untouched).
      'vue/attributes-order': 'off',
      'vue/block-lang': ['error', { script: { lang: 'ts' } }],
      'vue/block-order': ['warn', { order: ['script', 'template', 'style'] }],
      'vue/component-api-style': ['warn', ['script-setup', 'composition']],
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/component-options-name-casing': ['warn', 'PascalCase'],
      'vue/custom-event-name-casing': ['warn', 'camelCase'],
      'vue/define-emits-declaration': ['warn', 'type-based'],
      'vue/define-props-declaration': ['warn', 'type-based'],
      'vue/html-comment-content-newline': 'warn',
      'vue/html-indent': 'off',
      'vue/html-self-closing': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/multi-word-component-names': ['warn', { ignores: ['index', 'App', 'Badge'] }],
      'vue/next-tick-style': ['warn', 'promise'],
      'vue/no-duplicate-attr-inheritance': 'warn',
      'vue/no-required-prop-with-default': 'warn',
      'vue/no-static-inline-styles': 'warn',
      'vue/no-template-target-blank': 'error',
      'vue/no-undef-properties': 'warn',
      'vue/no-unused-emit-declarations': 'warn',
      'vue/no-unused-properties': 'warn',
      'vue/no-unused-refs': 'warn',
      'vue/no-use-v-else-with-v-for': 'error',
      'vue/no-useless-mustaches': 'warn',
      'vue/no-useless-v-bind': 'error',
      'vue/no-v-html': 'off',
      'vue/no-v-text': 'warn',
      'vue/padding-line-between-blocks': 'warn',
      'vue/prefer-define-options': 'warn',
      'vue/prefer-separate-static-class': 'warn',
      'vue/prop-name-casing': ['warn', 'camelCase'],
      'vue/require-default-prop': 'off',
      'vue/require-macro-variable-name': [
        'warn',
        { defineProps: 'props', defineEmits: 'emit', defineSlots: 'slots', useSlots: 'slots', useAttrs: 'attrs' },
      ],
      'vue/singleline-html-element-content-newline': 'off',
      'vue/valid-define-options': 'warn',
    },
  },
  {
    files: ['vite.config.ts', 'cli/**/*.ts'],
    rules: {
      'no-console': 'off',
      // Interactive prompt wizards are inherently long/linear, not deeply-nested-bad-complex.
      complexity: 'off',
    },
  },
)
