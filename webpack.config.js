module.exports = () => {
  switch (process.env.npm_lifecycle_event) {
    case "start":
      return require("./config/webpack.config.server");
    case "build":
      return require("./config/webpack.config.publish");
    default:
      console.warn(
        `Invalid npm lifecycle event '${process.env.npm_lifecycle_event}'`
      );
  }
};
