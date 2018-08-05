const path = require('path')
const PostcssImport = require('postcss-import')
const PostcssMixins = require('postcss-mixins')
const PostcssNestedAncestors = require('postcss-nested-ancestors')
const PostcssNested = require('postcss-nested')
const PostcssPresetEnv = require('postcss-preset-env')
const PostcssGlobalImport = require('postcss-global-import')
const Lost = require('lost')
const CssMqpacker = require('css-mqpacker')
const PostcssMqKeyframes = require('postcss-mq-keyframes')
const PostcssRoot = require('postcss-root')

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  sourceMap: false,
  plugins: [
    PostcssGlobalImport(),
    PostcssImport({
      root: path.join(process.cwd(), 'src'),
    }),
    PostcssMixins(),
    PostcssNestedAncestors(),
    PostcssNested(),
    Lost(),
    PostcssPresetEnv({
      stage: 0,
      features: {
        'custom-properties': {
          preserve: isDev ? true : false
        }
      }
    }),
    isDev ? PostcssMqKeyframes() : null,
    isDev ? CssMqpacker({ sort: true }) : null,
    isDev ? PostcssRoot() : null,
  ].filter(function (item) {
    return item !== null
  })
}
