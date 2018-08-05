const advancedPreset = require('cssnano-preset-advanced')
const PostcssRoot = require('postcss-root')
const PostcssMqKeyframes = require('postcss-mq-keyframes')
const CssMqpacker = require('css-mqpacker')

const options = advancedPreset({
  discardComments: {
    removeAll: true,
  },
  calc: {
    warnWhenCannotResolve: true,
  },
})

options.plugins.unshift(
  [PostcssRoot, {}],
  [PostcssMqKeyframes, {}],
  [CssMqpacker, {sort: true}]
)

module.exports = options
