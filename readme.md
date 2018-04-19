# Red-Lang.org

This is the site source.

## Building the site

0. Install Node
1. Install [Hugo](https://gohugo.io/)
2. Install [Yarn](https://yarnpkg.com/en/)
3. Run `yarn install` in the repo root to install dependencies
4. Run `yarn start`
5. Visit http://localhost:1313

To build for production, run `yarn build`. The rendered site will be in the public/ dir.

See other scripts in package.json.

## Recommended dev environment

VS Code with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), and [stylelint](https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint) extensions installed. Linting and formatting will automatically run with a git hook, but these give you faster feedback.

Turn off automatic CSS validation in your VS Code user settings, since it doesn't understand Tailwind's values:

```
{
    ...
    "css.validate": false, // Disable css built-in lint
    "stylelint.enable": true, // Enable stylelint
    ...
}
```