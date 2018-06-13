const path = require("path");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

const config = {
    target: "web",
    entry: {
        bundle: "./src/main.es6"
    },
    output: {
        path: path.resolve(__dirname, "./public/assets/js"),
        filename: "./[name].js"
    },
    plugins: [
        // new UglifyJSPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.es6/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    devtool: "eval-source-map"
};

module.exports = config;