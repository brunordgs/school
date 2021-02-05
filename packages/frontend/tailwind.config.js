const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	theme: {
		fontFamily: {
			body: ['Poppins', ...defaultTheme.fontFamily.sans]
		}
	},
	plugins: [require('tailwindcss'), require('autoprefixer')]
};
