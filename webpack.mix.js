const mix = require("laravel-mix");

mix.copyDirectory("resources/images", "public/images");
mix.sass("resources/sass/app.scss", "public/css");
mix.ts("resources/js/index.tsx", "public/js");
mix.ts("resources/js/app.tsx", "public/js");
mix.ts("resources/js/verify-email.tsx", "public/js");
mix.ts("resources/js/admin.tsx", "public/js");
mix.ts("resources/js/reset-password.tsx", "public/js");
mix.webpackConfig({
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	output: { chunkFilename: "js/[name].js?id=[chunkhash]" },
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx"],
	},
});
