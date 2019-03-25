const CompressionPlugin = require('compression-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

module.exports = env => {
	// Select .env file
	const currentPath = path.join(__dirname);
	const basePath = `${currentPath}/.env`;
	const envPath = `${basePath}.${env.ENVIRONMENT}`;
	const finalPath = fs.existsSync(envPath) ? envPath : basePath;
	const fileEnv = dotenv.config({ path: finalPath }).parsed;

	// Map environment variables
	const keys = Object.keys(fileEnv).reduce((acc, next) => {
		acc[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
		return acc;
	}, {});

	// Assign public URL
	keys['process.env.PUBLIC_URL'] = JSON.stringify(env.PUBLIC_URL || '');

	// Configure webpack
	return {
		entry: './src/index.js',
		mode: 'development',
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /(node_modules|bower_components)/,
					loader: 'babel-loader',
					options: { presets: ['@babel/env'] }
				},
				{
					test: /\.jsx?$/,
					include: /node_modules/,
					use: ['react-hot-loader/webpack']
				},
				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader']
				},
				{
					test: /\.scss$/,
					use: ['style-loader', 'css-loader', 'sass-loader']
				},
				{
					test: /.svg$/,
					use: ['@svgr/webpack']
				}
			]
		},
		plugins: [
			new webpack.DefinePlugin(keys),
			new webpack.HotModuleReplacementPlugin(),
			new CompressionPlugin(),
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: env.GH ? 'index.gh.html' : './index.html'
			}),
			new CopyPlugin([
				{ from: 'public', to: './' },
				{
					from: '404.html',
					to: './',
					toType: 'dir'
				}
			])
		],
		optimization: {
			splitChunks: {
				chunks: 'all'
			}
		},
		resolve: { extensions: ['*', '.js', '.jsx'] },
		output: {
			path: path.resolve(__dirname, 'build/'),
			publicPath: '/',
			filename: 'bundle.js'
		}
	};
};
