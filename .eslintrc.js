module.exports = {
    parser: 'babel-eslint',
    extends: ['airbnb'],
    env: {
      browser: true,
      node: true
    },
    rules: {
      'linebreak-style': 0,
      "import/no-named-as-default": 0,
      "import/no-named-as-default-member": 0,
      'react/prop-types': 0,
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
  