const path = require("path");

module.exports = {
  sourceAppPath: path.resolve(__dirname, "..", "src", "app"),
  publicFolderPath: path.resolve(__dirname, "..", "public"),
  distFolderPath: path.resolve(__dirname, "..", "dist")
}