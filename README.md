# eslint-plugin-require

> ESLint rules for require

## Usage

1. Install `eslint-plugin-require` as a dev-dependency:

    ```shell
    npm install --save-dev eslint-plugin-require
    ```

2. Enable the plugin by adding it to your `.eslintrc`:

    ```yaml
    plugins:
      - require
    ```

## Configuration

This plugin exports a `recommended` configuration that enforces good practices.

To enable this configuration, use the `extends` property in your `.eslintrc`
config file:

```yaml
plugins:
  - require
extends: 'plugin:require/recommended'
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
  - require
rules:
  require/conditional-async-require-forbidden: 0
```

See [configuring rules][] for more information.

[configuring rules]: http://eslint.org/docs/user-guide/configuring#configuring-rules

## Author

© 2017 Silesia Corporation and [contributors][].

[contributors]: https://github.com/silesia-corporation/eslint-plugin-require/graphs/contributors
