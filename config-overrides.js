const { override, fixBabelImports } = require('customize-cra');

module.exports = function (config, env) {
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  });

  //   config.module.rules.push({
  //     // add your rule object - see the full config object at https://github.com/facebook/create-react-app/blob/c20ccecfa1cf130a47d37908dc54959c618ce8ea/packages/react-scripts/config/webpack.config.js#L199
  //   })

  // customize more as needed...

  return config;
};
