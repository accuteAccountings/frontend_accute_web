const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api/*", {
      target: "http://localhost:5001",
      secure: true,
      changeOrigin: true,
      rejectUnauthorized: false,
    })
  );
};
