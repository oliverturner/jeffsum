const config = {
  mq: {
    s: 496,
    m: 768,
    l: 960,
    xl: 1200
  }
};

/**
 * Turns config.mq above into a customMedia rules:
 * {
 *   "--mq-s": "496px", 
 *   "--mq-m": "768px, 
 *   ...
 * }
 */
const customMedia = Object.entries(config.mq).reduce((acc, [k, v]) => {
  return { ...acc, [`--mq-${k}`]: `(min-width: ${v}px)` };
}, {});

module.exports = {
  plugins: {
    "postcss-preset-env": {
      browsers: "last 2 versions",
      features: {
        "nesting-rules": true,
        "custom-media-queries": {
          importFrom: { customMedia }
        }
      }
    }
  }
};
