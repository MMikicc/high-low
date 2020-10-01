module.exports = {
    parser: 'babel-eslint',
    extends: ['airbnb'],
    env: {
      browser: true,
      node: true
    },
    rules: {
      'linebreak-style': 0,
      "import/no-named-as-default": "off",
      "import/no-named-as-default-member": "off",
      'react/prop-types': false,
      "react/jsx-filename-extension": [
        1,
        {
          "extensions": [
            ".js",
            ".jsx"
          ]
        }
      ]
    },
    plugins: ['babel', 'prettier'],
  };
  