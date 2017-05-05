# eslint-plugin-requirejs

> ESLint rules for requirejs

## Usage

1. Install `eslint-plugin-requirejs` as a dev-dependency:

    ```shell
    npm install --save-dev @silesia-corporation/eslint-plugin-requirejs
    ```

2. Enable the plugin by adding it to your `.eslintrc`:

    ```yaml
    plugins:
      - requirejs
    ```

## Configuration

This plugin exports a `recommended` configuration that enforces good practices.

To enable this configuration, use the `extends` property in your `.eslintrc`
config file:

```yaml
plugins:
  - requirejs
extends: 'plugin:requirejs/recommended'
```

See the [ESLint config docs][] for more information about extending
configuration files.

[eslint config docs]: http://eslint.org/docs/user-guide/configuring#extending-configuration-files

### Rules

Rule                                  | Recommended      | Options
----                                  | -----------      | -------
conditional-async-require-forbidden   | 1                |

For example, using the recommended configuration, the `conditional-async-require-forbidden` rule
is enabled and will cause ESLint to throw an error (with an exit code of `1`)
when triggered.

You may customise each rule by adding a value in your `.eslintrc` `rules`
property:

```yaml
plugins:
  - requirejs
rules:
  requirejs/conditional-async-require-forbidden: 0
```

See [configuring rules][] for more information.

[configuring rules]: http://eslint.org/docs/user-guide/configuring#configuring-rules

## Author

© 2017 Silesia Corporation and [contributors][].

[contributors]: https://github.com/silesia-corporation/eslint-plugin-requirejs/graphs/contributors
