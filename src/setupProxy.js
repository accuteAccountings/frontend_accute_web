const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api/*", { target: "https://dev.accute.live", secure: true, changeOrigin:true ,rejectUnauthorized: false })
  );
};
