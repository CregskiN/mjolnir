const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  stories: ['../src/welcome.stories.tsx','../src/**/*.stories.tsx'],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });
    config.plugins.push(new MiniCssExtractPlugin({ filename: '[name].css' }));

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [require.resolve('babel-preset-react-app')]
          }
        },
        // Optional
        {
          loader: require.resolve('react-docgen-typescript-loader'),
          options: {
            shouldExtractLiteralValuesFromEnum: true,
            propFilter: (prop, component) => {
              if (prop.parent) {
                return !prop.parent.fileName.includes("node_modules");
              }

              return true;
            },
          }
        },
      ],
    });
    config.resolve.extensions.push('.ts', '.tsx', '.scss', '.css');
    return config;
  },

  addons: [
    // '@storybook/preset-create-react-app', // 对ts+CRA支持，包含在这里
    '@storybook/addon-actions',
    '@storybook/addon-links',
    // '@storybook/preset-scss', // 因style-loader的问题，在这里不推荐使用官方的scss方法 https://github.com/storybookjs/storybook/issues/11052
  ],
};
