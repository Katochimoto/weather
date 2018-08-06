module.exports = {
  "rules": {
    "react/react-in-jsx-scope": 0,

        "indent": [
            2,
            2
        ],
        "quotes": [
            2,
            "single"
        ],
        "linebreak-style": [
            0
        ],
        "semi": [
            2,
            "never"
        ],
        "array-bracket-spacing": [
            2,
            "always"
        ],
        "object-curly-spacing": [
            2,
            "always"
        ],
        "max-len": [
            2,
            200,
            4
        ],
        "vars-on-top": [
            0
        ],
        "no-inner-declarations": [
            0
        ],
        "key-spacing": [
            0
        ],
        "valid-jsdoc": [
            2,
            {
                "prefer": {
                    "return": "returns"
                },
                "requireReturn": false,
                "requireParamDescription": false,
                "requireReturnDescription": false
            }
        ]
    },
    "env": {
        "es6": true,
        "node": true,
        "browser": true
    },
    "parser": "babel-eslint",
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended"
    ],
    "plugins": [
        "react"
    ],
    "globals": {
        "module": false,
        "exports": false,
        "require": false,
        "describe": false,
        "it": false,
        "expect": false,
        "beforeEach": false,
        "afterEach": false,
        "sinon": false
    }
}
